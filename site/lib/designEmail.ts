import { BRAND, PRICING } from "@/lib/brand";
import { TEMPLATE_META, relativeLuminance, type CardTemplate } from "@/components/card/cardSpec";

/**
 * The artwork email. Sent the moment someone starts checkout, because the logo
 * file only exists in their browser at that point: Stripe metadata caps at 500
 * characters per value, so the image cannot ride along with the payment.
 * The logo is attached at full quality (that is the file you send the printer)
 * and embedded with cid: so you can see the card without downloading anything.
 */
export type DesignRecord = {
  restaurant: string;
  template: string;
  headline: string;
  subline: string;
  brandColor: string;
  showStars: boolean;
  logoFilename: string | null;
  cards: number;
  report: boolean;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  linkMode: string;
  googleReviewLink: string;
  notes: string;
  sessionId: string;
};

const PALETTE = { paper: "#f7f4ee", ink: "#15130f", muted: "#6f6a62", gold: "#e6b455", noir: "#141414", noirText: "#f3efe6" };

function esc(v: string) {
  return v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** An email-safe picture of the card front, laid out like CardFace. */
function cardMock(d: DesignRecord, hasLogo: boolean) {
  const isNoir = d.template === "noir";
  const isBrand = d.template === "brand";
  const isLogoFwd = d.template === "logo";
  const brandIsLight = /^#[0-9a-fA-F]{6}$/.test(d.brandColor) ? relativeLuminance(d.brandColor) > 0.5 : false;
  const bg = isNoir ? PALETTE.noir : isBrand ? d.brandColor : PALETTE.paper;
  const fg = isNoir ? PALETTE.noirText : isBrand ? (brandIsLight ? PALETTE.ink : "#ffffff") : PALETTE.ink;
  const sub = isNoir ? "rgba(243,239,230,0.7)" : isBrand ? (brandIsLight ? "rgba(21,19,15,0.7)" : "rgba(255,255,255,0.75)") : PALETTE.muted;
  const accent = isNoir ? PALETTE.gold : isBrand ? fg : d.brandColor;
  const darkBg = isNoir || (isBrand && !brandIsLight);
  // Dark marks vanish on dark card stock, so the print file knocks the logo out to paper white.
  const knockout = darkBg ? "filter:brightness(0) invert(0.93);" : "";
  const serif = "Georgia,'Times New Roman',serif";
  const sans = "-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif";

  const logoImg = (w: number, h: number, align: string) =>
    `<img src="cid:logo" alt="${esc(d.restaurant)} logo" width="${w}" style="display:block;max-width:${w}px;max-height:${h}px;width:auto;height:auto;${knockout}${align === "center" ? "margin:0 auto;" : ""}">`;

  const inner = isLogoFwd
    ? `<div style="text-align:center;padding:26px 24px 20px">
         ${hasLogo ? logoImg(180, 92, "center") : `<div style="font-family:${serif};font-size:30px;color:${fg};line-height:1.15">${esc(d.restaurant)}</div>`}
         <div style="font-family:${sans};font-size:14px;font-weight:600;color:${fg};margin-top:16px">${esc(d.headline)}</div>
         <div style="font-size:26px;color:${accent};line-height:1;margin-top:10px">&#9678;</div>
       </div>`
    : `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
         <td style="padding:20px 0 20px 26px;vertical-align:top">
           ${
             hasLogo
               ? logoImg(150, 40, "left")
               : `<div style="font-family:${sans};font-size:10px;font-weight:600;letter-spacing:1.6px;color:${sub}">${esc(d.restaurant.toUpperCase())}</div>`
           }
           <div style="font-family:${serif};font-size:32px;line-height:1.1;color:${fg};margin-top:26px">${esc(d.headline)}</div>
           <div style="font-family:${sans};font-size:11px;color:${sub};margin-top:22px">${esc(d.subline || "")}</div>
         </td>
         <td width="96" style="text-align:center;vertical-align:middle;font-size:46px;color:${accent};line-height:1">&#9678;</td>
       </tr></table>`;

  return `<table role="presentation" width="440" cellpadding="0" cellspacing="0" border="0" bgcolor="${bg}" style="width:440px;max-width:100%;background:${bg};border-radius:14px;border:1px solid #e2dccf">
    <tr><td style="border-radius:14px">${inner}</td></tr>
  </table>`;
}

export function renderDesignEmail(d: DesignRecord) {
  const hasLogo = Boolean(d.logoFilename);
  const templateName = TEMPLATE_META[d.template as CardTemplate]?.name ?? d.template;
  const subject = `Artwork: ${d.restaurant || d.contactName} — ${templateName}${hasLogo ? " + logo" : ""} (checkout started)`;

  const rows: Array<[string, string]> = [
    ["Restaurant", d.restaurant || "not given"],
    ["Contact", `${d.contactName}${d.contactEmail ? ` · ${d.contactEmail}` : ""}${d.contactPhone ? ` · ${d.contactPhone}` : ""}`],
    ["Design", templateName],
    ["Headline", d.headline || "default"],
    ["Small line", d.subline || "none"],
    ["Brand colour", d.brandColor],
    ["Logo file", hasLogo ? `${d.logoFilename} — attached to this email` : "none uploaded, design a type-only card"],
    ["Stars on card", d.showStars ? "yes" : "no"],
    ["Basket", `${d.cards} cards${d.report ? ` + report at $${PRICING.monthlyReport}/mo` : ", no report"}`],
    ["Where cards point", d.linkMode === "have" && d.googleReviewLink ? d.googleReviewLink : `find the listing — ${d.address || "no address given"}`],
    ["Notes", d.notes || "none"],
  ];

  const html = `<!doctype html><html><body style="margin:0;background:#f7f4ee;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#15130f">
  <div style="max-width:640px;margin:0 auto;padding:28px 20px">
    <div style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#1f4d3a;font-weight:600">${BRAND.name} · artwork</div>
    <h1 style="font-size:26px;line-height:1.2;margin:10px 0 4px">${esc(d.restaurant || d.contactName)}</h1>
    <div style="color:#605b54;font-size:14px;margin-bottom:22px">
      They just went to the payment page. Payment lands in a separate <strong>New order</strong> email.
      Nothing prints until they approve a design preview.
    </div>
    ${cardMock(d, hasLogo)}
    <div style="color:#605b54;font-size:12px;margin:10px 0 ${hasLogo ? "20px" : "24px"}">Front of the card, as they built it. Your print file is drawn from the real template, not this picture.</div>
    ${
      hasLogo
        ? `<table role="presentation" width="440" cellpadding="0" cellspacing="0" border="0" style="width:440px;max-width:100%;background:#ffffff;border:1px solid #e2dccf;border-radius:14px">
             <tr><td style="padding:18px 20px;text-align:center">
               <div style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#605b54;margin-bottom:12px">The logo they uploaded</div>
               <img src="cid:logo" alt="${esc(d.restaurant)} logo as uploaded" width="260" style="display:block;margin:0 auto;max-width:260px;max-height:130px;width:auto;height:auto">
             </td></tr>
           </table>
           <div style="color:#605b54;font-size:12px;margin:10px 0 24px">Shown on white. ${esc(d.logoFilename ?? "")} is attached at full size.</div>`
        : ""
    }
    <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #e2dccf;border-radius:12px;overflow:hidden">
      ${rows
        .map(
          ([k, v], i) =>
            `<tr style="${i % 2 ? "background:#faf8f4" : ""}"><td style="padding:10px 14px;font-size:13px;color:#605b54;width:34%;vertical-align:top">${k}</td><td style="padding:10px 14px;font-size:14px;vertical-align:top">${esc(String(v))}</td></tr>`
        )
        .join("")}
    </table>
    ${
      hasLogo
        ? `<p style="font-size:14px;line-height:1.6;margin:22px 0 0">The logo is attached at the size they uploaded. Save it, drop it into the card template, and export the print file.</p>`
        : `<p style="font-size:14px;line-height:1.6;margin:22px 0 0">No logo came through. Ask for a PNG or SVG when you reply, or set their name in type.</p>`
    }
    <div style="margin-top:24px;padding-top:14px;border-top:1px solid #e2dccf;font-size:12px;color:#605b54">Stripe session ${esc(d.sessionId)}</div>
  </div></body></html>`;

  const text = [
    `${BRAND.name} — artwork (checkout started, not paid yet)`,
    d.restaurant || d.contactName,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    hasLogo ? "The logo file is attached to this email." : "No logo uploaded.",
    `Stripe session ${d.sessionId}`,
  ].join("\n");

  return { subject, html, text };
}
