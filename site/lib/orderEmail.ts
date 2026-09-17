import { BRAND, PRICING } from "@/lib/brand";
import { TEMPLATE_META, type CardTemplate } from "@/components/card/cardSpec";

export type OrderRecord = {
  ts: string;
  session_id: string;
  amount_total: number;
  email: string;
  phone: string;
  name: string;
  restaurant: string;
  restaurant_address: string;
  cards: number;
  report: boolean;
  template: string;
  headline: string;
  subline: string;
  brand_color: string;
  has_logo: boolean;
  logo_file: string;
  link_mode: string;
  google_review_link: string;
  notes: string;
  shipping: { line1?: string | null; line2?: string | null; city?: string | null; state?: string | null; postal_code?: string | null; country?: string | null } | null;
  subscription: string | null;
  customer: string | null;
};

function esc(v: string) {
  return v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function money(n: number) {
  return `$${n.toFixed(2)}`;
}

function addressLines(a: OrderRecord["shipping"]) {
  if (!a) return ["(not collected)"];
  return [a.line1, a.line2, [a.city, a.state, a.postal_code].filter(Boolean).join(", "), a.country].filter(Boolean) as string[];
}

/** Everything needed to make and ship this order, in the order you will do it. */
export function renderOrderEmail(o: OrderRecord) {
  const templateName = TEMPLATE_META[o.template as CardTemplate]?.name ?? o.template ?? "not set";
  const where =
    o.link_mode === "have" && o.google_review_link
      ? `They gave you a link: ${o.google_review_link}`
      : `They asked you to find the listing. Address: ${o.restaurant_address || "not given"}`;
  const ship = addressLines(o.shipping);
  const subject = `New order: ${o.restaurant || o.name} — ${o.cards} cards${o.report ? " + report" : ""} (${money(o.amount_total)})`;

  const rows: Array<[string, string]> = [
    ["Restaurant", o.restaurant || "not given"],
    ["Contact", `${o.name || "not given"}${o.email ? ` · ${o.email}` : ""}${o.phone ? ` · ${o.phone}` : ""}`],
    ["Paid today", money(o.amount_total)],
    ["Cards", `${o.cards} × ${money(PRICING.cardPrice)}`],
    ["Monthly report", o.report ? `Yes, ${money(PRICING.monthlyReport)}/month` : "No"],
    ["Design", templateName],
    ["Headline", o.headline || "default"],
    ["Small line", o.subline || "none"],
    ["Brand colour", o.brand_color || "default"],
    [
      "Logo",
      o.has_logo
        ? `Yes — ${o.logo_file || "the file"} is attached to the "Artwork" email for this restaurant`
        : "No, design a type-only card",
    ],
    ["Where cards point", where],
    ["Ship to", ship.join(", ")],
    ["Notes", o.notes || "none"],
  ];

  const steps = [
    "Reply today so they know a person saw it.",
    "Build the design preview and email it. Nothing prints before they approve.",
    o.link_mode === "have" ? "Test their Google link on your phone." : "Find their Google listing, grab the Place ID, and test the link on your phone.",
    `Add their slug to data/links.json and deploy, then order the cards encoded with https://${BRAND.shortLinkHost}/r/their-slug?s=card`,
    o.report ? "Note the first report date: the first of next month." : "No subscription on this order.",
  ];

  const html = `<!doctype html><html><body style="margin:0;background:#f7f4ee;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#15130f">
  <div style="max-width:640px;margin:0 auto;padding:28px 20px">
    <div style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#1f4d3a;font-weight:600">${BRAND.name} · new order</div>
    <h1 style="font-size:26px;line-height:1.2;margin:10px 0 4px">${o.restaurant || o.name}</h1>
    <div style="color:#605b54;font-size:14px">${new Date(o.ts).toLocaleString("en-US")} · ${money(o.amount_total)} paid</div>
    <table style="width:100%;border-collapse:collapse;margin-top:22px;background:#fff;border:1px solid #e2dccf;border-radius:12px;overflow:hidden">
      ${rows
        .map(
          ([k, v], i) =>
            `<tr style="${i % 2 ? "background:#faf8f4" : ""}"><td style="padding:10px 14px;font-size:13px;color:#605b54;width:34%;vertical-align:top">${k}</td><td style="padding:10px 14px;font-size:14px;vertical-align:top">${esc(String(v))}</td></tr>`
        )
        .join("")}
    </table>
    <h2 style="font-size:15px;margin:26px 0 8px">What to do next</h2>
    <ol style="margin:0;padding-left:20px;font-size:14px;line-height:1.65">${steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>
    <div style="margin-top:24px;padding-top:14px;border-top:1px solid #e2dccf;font-size:12px;color:#605b54">
      Stripe session ${o.session_id}${o.customer ? ` · customer ${o.customer}` : ""}${o.subscription ? ` · subscription ${o.subscription}` : ""}
    </div>
  </div></body></html>`;

  const text = [
    `${BRAND.name} — new order`,
    `${o.restaurant || o.name} · ${money(o.amount_total)} paid · ${new Date(o.ts).toLocaleString("en-US")}`,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "What to do next:",
    ...steps.map((s, i) => `${i + 1}. ${s}`),
    "",
    `Stripe session ${o.session_id}`,
  ].join("\n");

  return { subject, html, text };
}
