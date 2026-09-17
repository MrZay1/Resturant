import { NextResponse } from "next/server";
import { BRAND } from "@/lib/brand";

/**
 * Small, dependency-free guard for public JSON POST routes: same-site Origin
 * check, body size cap and a per-instance in-memory rate limit. It resets per
 * serverless instance, which is enough to stop cheap loop-in-a-shell abuse.
 */
const buckets = new Map<string, { count: number; reset: number }>();

function ip(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

function originAllowed(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true; // same-origin navigations and curl during dev have none
  let host = "";
  try {
    host = new URL(origin).hostname;
  } catch {
    return false;
  }
  if (process.env.NODE_ENV !== "production" && (host === "localhost" || host === "127.0.0.1")) return true;
  const allowed = [BRAND.domain, `www.${BRAND.domain}`, process.env.VERCEL_URL, process.env.NEXT_PUBLIC_SITE_HOST].filter(Boolean) as string[];
  return allowed.includes(host) || host.endsWith(".vercel.app");
}

/** Returns a NextResponse to send immediately, or null if the request may proceed. */
export function guard(req: Request, opts: { key: string; limit: number; windowMs: number; maxBytes?: number }) {
  if (!originAllowed(req)) {
    return NextResponse.json({ error: "Request not allowed from this site." }, { status: 403 });
  }
  const len = Number(req.headers.get("content-length") ?? 0);
  if (len > (opts.maxBytes ?? 16 * 1024)) {
    return NextResponse.json({ error: "Request too large." }, { status: 413 });
  }
  const k = `${opts.key}:${ip(req)}`;
  const now = Date.now();
  const b = buckets.get(k);
  if (!b || b.reset < now) {
    buckets.set(k, { count: 1, reset: now + opts.windowMs });
  } else if (++b.count > opts.limit) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a few minutes." },
      { status: 429, headers: { "retry-after": String(Math.ceil((b.reset - now) / 1000)) } }
    );
  }
  if (buckets.size > 5000) for (const [key, v] of buckets) if (v.reset < now) buckets.delete(key);
  return null;
}
