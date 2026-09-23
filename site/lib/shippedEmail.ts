import { BRAND } from "@/lib/brand";
import type { ShipTo } from "@/lib/orders";

function esc(v: string) {
  return v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** The "your cards shipped" email sent to a customer when an admin marks an order shipped. */
export function renderShippedEmail(o: { restaurant: string; cards: number; shipTo: ShipTo }) {
  const plural = o.cards === 1 ? "" : "s";
  const verb = o.cards === 1 ? "is" : "are";
  const deliveryNote =
    o.shipTo === "to_me"
      ? `${BRAND.founderName} will drop ${o.cards === 1 ? "it" : "them"} off at ${o.restaurant} personally.`
      : `${o.cards === 1 ? "It's" : "They're"} shipping straight to ${o.restaurant}.`;

  const subject = `Your ${BRAND.name} cards are on the way`;
  const html = `<!doctype html><html><body style="margin:0;background:#f7f4ee;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#15130f">
    <div style="max-width:560px;margin:0 auto;padding:28px 20px">
      <div style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#1f4d3a;font-weight:600">${esc(BRAND.name)}</div>
      <h1 style="font-size:24px;line-height:1.2;margin:10px 0 18px">Your cards shipped</h1>
      <p style="font-size:15px;line-height:1.6">
        Good news &mdash; your ${o.cards} ${esc(BRAND.name)} card${plural} for <strong>${esc(o.restaurant)}</strong>
        ${verb} on the way. ${esc(deliveryNote)}
      </p>
      <p style="font-size:14px;line-height:1.6;color:#605b54">Questions in the meantime? Just reply to this email.</p>
    </div></body></html>`;
  const text = [
    `${BRAND.name} — Your cards shipped`,
    "",
    `Good news — your ${o.cards} card${plural} for ${o.restaurant} ${verb} on the way. ${deliveryNote}`,
    "",
    "Questions in the meantime? Just reply to this email.",
  ].join("\n");
  return { subject, html, text };
}
