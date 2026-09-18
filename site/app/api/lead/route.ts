import { NextResponse } from "next/server";
import { z } from "zod";
import { BRAND } from "@/lib/brand";
import { guard } from "@/lib/apiGuard";
import { sendEmail } from "@/lib/email";

const KIND_LABEL: Record<string, string> = {
  demo: "Demo request",
  contact: "Contact form",
  logo: "Logo for an order",
  replacement: "Replacement cards",
  dashboard: "Dashboard message",
};

function esc(v: string) {
  return v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderLeadEmail(lead: Record<string, string>) {
  const label = KIND_LABEL[lead.kind] ?? "Website form";
  const rows: Array<[string, string]> = [
    ["Restaurant", lead.restaurant],
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone || "not given"],
    ["City", lead.city || "not given"],
    ["Message", lead.message || "none"],
  ];
  return {
    subject: `${label}: ${lead.restaurant}`,
    html: `<!doctype html><html><body style="margin:0;background:#f7f4ee;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#15130f">
      <div style="max-width:560px;margin:0 auto;padding:28px 20px">
        <div style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#1f4d3a;font-weight:600">${BRAND.name} · ${esc(label.toLowerCase())}</div>
        <h1 style="font-size:24px;line-height:1.2;margin:10px 0 18px">${esc(lead.restaurant)}</h1>
        <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #e2dccf;border-radius:12px;overflow:hidden">
          ${rows
            .map(
              ([k, v], i) =>
                `<tr style="${i % 2 ? "background:#faf8f4" : ""}"><td style="padding:10px 14px;font-size:13px;color:#605b54;width:32%;vertical-align:top">${k}</td><td style="padding:10px 14px;font-size:14px;vertical-align:top">${esc(v)}</td></tr>`
            )
            .join("")}
        </table>
        <p style="font-size:14px;margin:20px 0 0">Hit reply to answer them directly.</p>
      </div></body></html>`,
    text: [`${BRAND.name} — ${label}`, "", ...rows.map(([k, v]) => `${k}: ${v}`)].join("\n"),
  };
}

const Lead = z.object({
  name: z.string().min(1).max(80),
  restaurant: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional().default(""),
  city: z.string().max(80).optional().default(""),
  message: z.string().max(1000).optional().default(""),
  kind: z.enum(["demo", "contact", "logo", "replacement", "dashboard"]).default("demo"),
  website: z.string().max(0).optional(), // honeypot
});

export async function POST(req: Request) {
  const blocked = guard(req, { key: "lead", limit: 5, windowMs: 10 * 60 * 1000 });
  if (blocked) return blocked;
  const parsed = Lead.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }
  const lead = { ...parsed.data, ts: new Date().toISOString() };
  const url = process.env.LEAD_WEBHOOK_URL;
  const failMsg = `We could not send this right now. Please email ${BRAND.email}.`;
  if (!url) {
    // No tracker configured: email it instead, so a real enquiry is never dropped.
    const to = process.env.ORDER_EMAIL_TO;
    if (to) {
      const mail = renderLeadEmail(lead as unknown as Record<string, string>);
      const sent = await sendEmail({ to, subject: mail.subject, html: mail.html, text: mail.text, replyTo: lead.email });
      console[sent.ok ? "log" : "error"]("[lead]", lead.kind, lead.restaurant, "-", sent.detail);
      if (sent.ok) return NextResponse.json({ ok: true });
      return NextResponse.json({ error: failMsg }, { status: 502 });
    }
    if (process.env.NODE_ENV !== "production") {
      console.warn("[lead] no LEAD_WEBHOOK_URL or ORDER_EMAIL_TO; logging only", JSON.stringify(lead));
      return NextResponse.json({ ok: true });
    }
    console.error("[lead] no LEAD_WEBHOOK_URL or ORDER_EMAIL_TO; lead dropped");
    return NextResponse.json({ error: failMsg }, { status: 503 });
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.LEAD_WEBHOOK_SECRET ? { authorization: `Bearer ${process.env.LEAD_WEBHOOK_SECRET}` } : {}),
      },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
  } catch (e) {
    console.error("[lead] webhook failed", (e as Error).message);
    return NextResponse.json({ error: failMsg }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
