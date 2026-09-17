import { renderOrderEmail, type OrderRecord } from "@/lib/orderEmail";
import { renderDesignEmail, type DesignRecord } from "@/lib/designEmail";

/** Dev-only preview of the two emails an order sends. Not linked anywhere, not indexed. */
export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

const SAMPLE: OrderRecord = {
  ts: "2026-09-17T14:05:00.000Z",
  session_id: "cs_test_b1W9kW09i5ausjKzJ4SM9O8LnFmkGnkVcULgdjlrP20equS6wIzeB7Fbjs",
  amount_total: 200,
  email: "owner@dominiquesatstonecrest.com",
  phone: "(470) 837-7617",
  name: "Cheryl",
  restaurant: "Dominique's",
  restaurant_address: "2940 Stonecrest Cir, Stonecrest, GA 30038",
  cards: 10,
  report: true,
  template: "noir",
  headline: "Tap to review us on Google",
  subline: "Hold your phone here",
  brand_color: "#B08A4A",
  has_logo: true,
  logo_file: "dominiques-gold.png",
  link_mode: "find",
  google_review_link: "",
  notes: "Match the gold on our sign if you can.",
  shipping: { line1: "2940 Stonecrest Cir", city: "Stonecrest", state: "GA", postal_code: "30038", country: "US" },
  subscription: "sub_1Test",
  customer: "cus_1Test",
};

const SAMPLE_DESIGN: DesignRecord = {
  restaurant: SAMPLE.restaurant,
  template: SAMPLE.template,
  headline: SAMPLE.headline,
  subline: SAMPLE.subline,
  brandColor: SAMPLE.brand_color,
  showStars: false,
  logoFilename: SAMPLE.logo_file,
  cards: SAMPLE.cards,
  report: SAMPLE.report,
  contactName: SAMPLE.name,
  contactEmail: SAMPLE.email,
  contactPhone: SAMPLE.phone,
  address: SAMPLE.restaurant_address,
  linkMode: SAMPLE.link_mode,
  googleReviewLink: SAMPLE.google_review_link,
  notes: SAMPLE.notes,
  sessionId: SAMPLE.session_id,
};

function Bar({ label, subject }: { label: string; subject: string }) {
  return (
    <div style={{ padding: "12px 16px", background: "#15130f", color: "#f7f4ee", fontFamily: "system-ui", fontSize: 13 }}>
      {label} — subject: <strong>{subject}</strong>
    </div>
  );
}

export default function OrderEmailPreview() {
  const order = renderOrderEmail(SAMPLE);
  const artwork = renderDesignEmail(SAMPLE_DESIGN);
  // cid: only resolves inside a real mail client; stand in with a placeholder here.
  const artworkHtml = artwork.html.replace(
    /src="cid:logo"/g,
    `src="data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="80"><rect width="300" height="80" fill="#B08A4A"/><text x="150" y="48" font-family="Georgia,serif" font-size="30" fill="#fff" text-anchor="middle">DOMINIQUE'S</text></svg>`
    )}"`
  );
  return (
    <>
      <Bar label="Email 1 of 2, sent at checkout" subject={artwork.subject} />
      <div dangerouslySetInnerHTML={{ __html: artworkHtml }} />
      <Bar label="Email 2 of 2, sent when payment clears" subject={order.subject} />
      <div dangerouslySetInnerHTML={{ __html: order.html }} />
    </>
  );
}
