import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

// Next.js turns this into /robots.txt.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Private, per-visitor pages: no reason for search engines to list them.
      disallow: ["/cart", "/checkout", "/wishlist"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}