import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${BRAND.domain}`;
  const routes = ["", "/how-it-works", "/sample-report", "/pricing", "/order", "/faq", "/demo", "/contact", "/guides/google-review-link", "/legal/privacy", "/legal/terms", "/legal/review-policy"];
  return routes.map((r) => ({ url: `${base}${r}`, lastModified: new Date("2026-09-04"), changeFrequency: "monthly", priority: r === "" ? 1 : 0.7 }));
}
