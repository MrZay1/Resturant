import { NextResponse, after, type NextRequest } from "next/server";
import { resolveLink } from "@/lib/links";
import { recordTap } from "@/lib/taps";

/**
 * Redirect layer for NFC cards and QR codes.
 * Encode cards with https://<domain>/r/<slug>?s=card so the destination can be
 * changed later without re-encoding, and taps can be counted.
 * Optional: ?c=<counter> for NTAG ASCII-mirror tap counters.
 */
export async function GET(req: NextRequest, ctx: RouteContext<"/r/[slug]">) {
  const { slug } = await ctx.params;
  const entry = resolveLink(slug);
  const url = new URL(req.url);
  const source = url.searchParams.get("s") ?? "unknown";
  const counter = url.searchParams.get("c") ?? undefined;

  const dest = entry && typeof entry.to === "string" ? entry.to : "/";
  const target = dest.startsWith("http") ? dest : new URL(dest, url.origin).toString();

  // Runs after the redirect is sent; after() keeps the serverless invocation
  // alive until the webhook call settles without delaying the guest.
  after(() =>
    recordTap({
      slug: (entry ? slug : `unknown:${slug}`).slice(0, 80),
      ts: new Date().toISOString(),
      ua: (req.headers.get("user-agent") ?? "").slice(0, 256),
      referer: (req.headers.get("referer") ?? "").slice(0, 512),
      source: source.slice(0, 16),
      counter: counter?.slice(0, 16),
    }),
  );

  return NextResponse.redirect(target, {
    status: 302,
    headers: { "cache-control": "no-store" },
  });
}
