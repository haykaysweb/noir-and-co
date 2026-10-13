import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { SITE_URL } from "@/lib/constants";

// Next.js turns this into /sitemap.xml, which helps search engines find every page.
export default function sitemap(): MetadataRoute.Sitemap {
  const pagePaths = ["", "/shop", "/about", "/contact"];

  const pageEntries = pagePaths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const productEntries = products.map((product) => ({
    url: `${SITE_URL}/shop/${product.slug}`,
    lastModified: new Date(),
  }));

  return [...pageEntries, ...productEntries];
}