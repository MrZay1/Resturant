import links from "@/data/links.json";

export type LinkEntry = { name: string; to: string; note?: string };
export const LINK_MAP = links as Record<string, LinkEntry>;

export function resolveLink(slug: string): LinkEntry | null {
  const key = slug.toLowerCase().replace(/[^a-z0-9-_]/g, "");
  // own keys only: "constructor" or "__proto__" must not resolve to Object.prototype members
  if (!Object.hasOwn(LINK_MAP, key)) return null;
  const entry = LINK_MAP[key];
  if (!entry || typeof entry.to !== "string" || !(entry.to.startsWith("/") || entry.to.startsWith("http"))) return null;
  return entry;
}
