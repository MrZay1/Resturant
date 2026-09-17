import { NextResponse, after } from "next/server";
import { z } from "zod";
import { getStripe } from "@/lib/stripe";
import { BRAND, PRICING } from "@/lib/brand";
import { guard } from "@/lib/apiGuard";
import { sendEmail, parseDataUrl, extensionFor } from "@/lib/email";
import { renderDesignEmail, type DesignRecord } from "@/lib/designEmail";

/** 2 MB of file, base64-encoded, plus the data: prefix. Matches the cap in the configurator. */
const MAX_LOGO_CHARS = 2 * 1024 * 1024 * 1.4;

const Body = z.object({
  cards: z.number().int().min(PRICING.minCards).max(PRICING.maxCards),
  report: z.boolean(),
  design: z.object({
    template: z.enum(["classic", "noir", "logo", "brand"]),
    restaurantName: z.string().min(1).max(40),
    headline: z.string().min(1).max(40),
    subline: z.string().max(40),
    brandColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
    showStars: z.boolean(),
    hasLogo: z.boolean(),
  }),
  /** The uploaded logo itself. Too big for Stripe metadata, so it is emailed from here. */
  logoDataUrl: z.string().max(MAX_LOGO_CHARS).optional().default(""),
  logoName: z.string().max(120).optional().default(""),
  googleReviewLink: z.string().max(500).optional().default(""),
  address: z.string().max(200).optional().default(""),
  linkMode: z.enum(["find", "have"]).optional().default("find"),
  contact: z.object({
    name: z.string().min(1).max(80),
    email: z.string().email(),
    phone: z.string().max(40).optional().default(""),
  }),
  notes: z.string().max(500).optional().default(""),
});

/** Server-controlled base for Stripe redirects; never derived from the request. */
function siteBase(): string {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.NODE_ENV === "development") return "http://localhost:3000";
  return `https://${BRAND.domain}`;
}

export async function POST(req: Request) {
  const blocked = guard(req, { key: "checkout", limit: 10, windowMs: 10 * 60 * 1000 });
  if (blocked) return blocked;
  const stripe = getStripe();
  if (!stripe) {
    console.warn("[checkout] STRIPE_SECRET_KEY is not set; returning 503");
    return NextResponse.json({ error: "Online checkout is not available right now." }, { status: 503 });
  }
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid order", issues: parsed.error.issues }, { status: 400 });
  }
  const { cards, report, design, googleReviewLink, address, linkMode, contact, notes, logoDataUrl, logoName } = parsed.data;
  const origin = siteBase();

  const line_items: Array<Record<string, unknown>> = [
    {
      quantity: cards,
      price_data: {
        currency: "usd",
        unit_amount: PRICING.cardPrice * 100,
        product_data: {
          name: `${BRAND.name} tap-to-review card`,
          description: `Custom printed NFC card, "${design.template}" design for ${design.restaurantName}`,
        },
      },
    },
  ];
  if (report) {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: PRICING.monthlyReport * 100,
        recurring: { interval: "month" },
        product_data: {
          name: `${BRAND.name} monthly review report`,
          description: `AI review report every month, plus ${PRICING.freeReplacementCardsPerMonth} free replacement cards/month`,
        },
      },
    });
  }

  const metadata: Record<string, string> = {
    restaurant: design.restaurantName,
    template: design.template,
    headline: design.headline,
    subline: design.subline,
    brand_color: design.brandColor,
    show_stars: String(design.showStars),
    has_logo: String(design.hasLogo),
    logo_file: logoName.slice(0, 120),
    google_review_link: googleReviewLink.slice(0, 480),
    restaurant_address: address.slice(0, 200),
    link_mode: linkMode,
    cards: String(cards),
    report: String(report),
    contact_name: contact.name,
    contact_phone: contact.phone,
    notes: notes.slice(0, 480),
  };

  const failMsg = `Could not start checkout. Please try again or email ${BRAND.email}.`;
  let session;
  try {
    session = await stripe.checkout.sessions.create({
      mode: report ? "subscription" : "payment",
      customer_email: contact.email,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      line_items: line_items as any,
      success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/order?canceled=1`,
      shipping_address_collection: { allowed_countries: ["US"] },
      // Stripe Tax must be activated in the dashboard before this is switched on
      ...(process.env.STRIPE_AUTOMATIC_TAX === "1" ? { automatic_tax: { enabled: true } } : {}),
      phone_number_collection: { enabled: true },
      allow_promotion_codes: true,
      metadata,
      ...(report ? { subscription_data: { metadata } } : { payment_intent_data: { metadata } }),
    });
  } catch (err) {
    console.error("[checkout] Stripe session create failed", err);
    return NextResponse.json({ error: failMsg }, { status: 502 });
  }
  if (!session.url) {
    return NextResponse.json({ error: failMsg }, { status: 502 });
  }

  // The logo only exists in the customer's browser and cannot fit in Stripe metadata,
  // so send it now, while we are holding the bytes. after() runs once the redirect is
  // already on its way, so a slow mailbox never delays the payment page.
  const artworkTo = process.env.ORDER_EMAIL_TO;
  if (artworkTo) {
    const logo = logoDataUrl ? parseDataUrl(logoDataUrl) : null;
    const filename = logo
      ? (logoName.replace(/[^\w.\- ]/g, "").slice(0, 80) || `logo.${extensionFor(logo.contentType)}`)
      : null;
    const record: DesignRecord = {
      restaurant: design.restaurantName,
      template: design.template,
      headline: design.headline,
      subline: design.subline,
      brandColor: design.brandColor,
      showStars: design.showStars,
      logoFilename: filename,
      cards,
      report,
      contactName: contact.name,
      contactEmail: contact.email,
      contactPhone: contact.phone,
      address,
      linkMode,
      googleReviewLink,
      notes,
      sessionId: session.id,
    };
    const mail = renderDesignEmail(record);
    after(async () => {
      const sent = await sendEmail({
        to: artworkTo,
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
        replyTo: contact.email,
        attachments:
          logo && filename
            ? [{ filename, content: logo.base64, contentType: logo.contentType, contentId: "logo" }]
            : undefined,
      });
      if (!sent.ok) console.error("[artwork] email failed:", sent.detail);
    });
  }

  return NextResponse.json({ url: session.url });
}
