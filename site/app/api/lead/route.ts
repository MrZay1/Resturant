import { NextResponse } from "next/server";
import { z } from "zod";
import { BRAND } from "@/lib/brand";
import { guard } from "@/lib/apiGuard";

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
    if (process.env.NODE_ENV !== "production") {
      console.warn("[lead] LEAD_WEBHOOK_URL not set; logging only", JSON.stringify(lead));
      return NextResponse.json({ ok: true });
    }
    console.error("[lead] LEAD_WEBHOOK_URL not set; lead dropped");
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
