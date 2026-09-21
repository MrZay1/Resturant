import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { sendEmail } from "@/lib/email";
import { renderOrderEmail, type OrderRecord } from "@/lib/orderEmail";
import { upsertOrderFromStripe } from "@/lib/orders";

/**
 * Stripe webhook: turns a completed Checkout into an order record.
 * Configure in Stripe Dashboard > Developers > Webhooks: event checkout.session.completed,
 * endpoint https://<your domain>/api/stripe/webhook, and put the signing secret in STRIPE_WEBHOOK_SECRET.
 * The order is emailed to ORDER_EMAIL_TO, saved to the orders table (visible in /admin/orders),
 * and if set, POSTed as JSON to ORDER_WEBHOOK_URL (falls back to LEAD_WEBHOOK_URL) so it also
 * lands in a tracker.
 */
export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });

  const sig = req.headers.get("stripe-signature") ?? "";
  const body = await req.text();
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (e) {
    return NextResponse.json({ error: `Invalid signature: ${(e as Error).message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const s = event.data.object;
    const m = s.metadata ?? {};
    const order = {
      kind: "order",
      ts: new Date().toISOString(),
      session_id: s.id,
      mode: s.mode,
      amount_total: (s.amount_total ?? 0) / 100,
      currency: s.currency,
      email: s.customer_details?.email ?? s.customer_email ?? "",
      phone: s.customer_details?.phone ?? "",
      name: m.contact_name ?? s.customer_details?.name ?? "",
      restaurant: m.restaurant ?? "",
      restaurant_address: m.restaurant_address ?? "",
      cards: Number(m.cards ?? 0),
      report: m.report === "true",
      template: m.template ?? "",
      headline: m.headline ?? "",
      subline: m.subline ?? "",
      brand_color: m.brand_color ?? "",
      has_logo: m.has_logo === "true",
      logo_file: m.logo_file ?? "",
      link_mode: m.link_mode ?? "",
      google_review_link: m.google_review_link ?? "",
      notes: m.notes ?? "",
      shipping: s.collected_information?.shipping_details?.address ?? null,
      subscription: typeof s.subscription === "string" ? s.subscription : s.subscription?.id ?? null,
      customer: typeof s.customer === "string" ? s.customer : s.customer?.id ?? null,
    };

    // Save the real record first - this is the thing /admin/orders reads from.
    // A failure here should not silently vanish, so it's logged loudly, but it
    // also should not block the email or Stripe retrying, so it does not throw.
    try {
      await upsertOrderFromStripe({
        stripeSessionId: order.session_id,
        stripeSubscriptionId: order.subscription,
        stripeCustomerId: order.customer,
        restaurantName: order.restaurant,
        restaurantAddress: order.restaurant_address,
        cards: order.cards,
        hasReport: order.report,
        amountTotal: order.amount_total,
        template: order.template,
        headline: order.headline,
        subline: order.subline,
        brandColor: order.brand_color,
        showStars: m.show_stars === "true",
        hasLogo: order.has_logo,
        logoUrl: m.logo_url || null,
        logoFilename: order.logo_file || null,
        linkMode: order.link_mode,
        googleReviewLink: order.google_review_link,
        contactName: order.name,
        contactEmail: order.email,
        contactPhone: order.phone,
        shipping: order.shipping,
        notes: order.notes,
      });
    } catch (e) {
      console.error("[order] failed to save order record:", (e as Error).message);
    }

    // Email next: this is the copy you actually act on.
    const to = process.env.ORDER_EMAIL_TO;
    if (to) {
      const mail = renderOrderEmail(order as OrderRecord);
      const sent = await sendEmail({ to, subject: mail.subject, html: mail.html, text: mail.text, replyTo: order.email || undefined });
      if (!sent.ok) console.error("[order] email failed:", sent.detail);
    }

    const url = process.env.ORDER_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL;
    if (url) {
      try {
        await fetch(url, {
          method: "POST",
          headers: { "content-type": "application/json", ...(process.env.LEAD_WEBHOOK_SECRET ? { authorization: `Bearer ${process.env.LEAD_WEBHOOK_SECRET}` } : {}) },
          body: JSON.stringify(order),
          signal: AbortSignal.timeout(8000),
        });
      } catch (e) {
        console.error("[order] webhook forward failed", (e as Error).message);
        // 500 makes Stripe retry later
        return NextResponse.json({ error: "forward failed" }, { status: 500 });
      }
    } else if (!to) {
      console.log("[order]", JSON.stringify(order));
    }
  }
  return NextResponse.json({ received: true });
}
