import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/brand";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/print/", "/api/", "/r/", "/order/success", "/dashboard", "/login"] }],
    sitemap: `https://${BRAND.domain}/sitemap.xml`,
  };
}
