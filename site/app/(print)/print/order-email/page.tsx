import { renderOrderEmail, type OrderRecord } from "@/lib/orderEmail";

/** Dev-only preview of the order notification email. Not linked anywhere, not indexed. */
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
  link_mode: "find",
  google_review_link: "",
  notes: "Match the gold on our sign if you can.",
  shipping: { line1: "2940 Stonecrest Cir", city: "Stonecrest", state: "GA", postal_code: "30038", country: "US" },
  subscription: "sub_1Test",
  customer: "cus_1Test",
};

export default function OrderEmailPreview() {
  const mail = renderOrderEmail(SAMPLE);
  return (
    <>
      <div style={{ padding: "12px 16px", background: "#15130f", color: "#f7f4ee", fontFamily: "system-ui", fontSize: 13 }}>
        Preview only. Subject: <strong>{mail.subject}</strong>
      </div>
      <div dangerouslySetInnerHTML={{ __html: mail.html }} />
    </>
  );
}
