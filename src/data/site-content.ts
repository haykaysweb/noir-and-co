import { pexelsImage } from "@/lib/images";
import type { ProductCategory } from "@/types/product";

/**
 * Written content and images for the marketing pages (home, about, footer).
 * Keeping it here means you can change copy without touching component code.
 */

// ---------------------------------------------------------------------------
// Large page images
// ---------------------------------------------------------------------------
export const HERO_IMAGE = pexelsImage(33401555, 1600);
export const PROMO_IMAGE = pexelsImage(9968539, 1600);
export const ABOUT_IMAGE = pexelsImage(11911863, 1600);

// ---------------------------------------------------------------------------
// Home page: category tiles
// ---------------------------------------------------------------------------
export const CATEGORY_TILES: {
  name: ProductCategory;
  image: string;
  description: string;
}[] = [
  {
    name: "Clothing",
    image: pexelsImage(8346226),
    description: "Tailored essentials in premium fabrics",
  },
  {
    name: "Bags",
    image: pexelsImage(8502484),
    description: "Crafted leather goods for every day",
  },
  {
    name: "Watches",
    image: pexelsImage(8364556),
    description: "Timepieces built to last generations",
  },
];

// ---------------------------------------------------------------------------
// About page
// ---------------------------------------------------------------------------
export const ABOUT_STATS = [
  { value: "2014", label: "Founded" },
  { value: "40+", label: "Artisan Partners" },
  { value: "12k+", label: "Happy Customers" },
  { value: "100%", label: "Traceable Materials" },
];

export const ABOUT_VALUES = [
  {
    title: "Crafted to Last",
    description:
      "We partner with ateliers that have honed their craft over generations. Every stitch, every cut, every detail is intentional.",
  },
  {
    title: "Responsible Sourcing",
    description:
      "Our materials are traceable. We work with certified tanneries, ethical wool farms, and recycled metals wherever possible.",
  },
  {
    title: "Timeless Design",
    description:
      "We design pieces that outlast trends. Our collections are small, considered, and built to be worn for years.",
  },
];

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
// Some links point to /about for now because those pages do not exist yet
// (Careers, Shipping & Returns, Privacy Policy...). Replace as you build them.
export const FOOTER_LINK_GROUPS = [
  {
    title: "Shop",
    links: [
      { label: "Clothing", href: "/shop?category=Clothing" },
      { label: "Bags", href: "/shop?category=Bags" },
      { label: "Watches", href: "/shop?category=Watches" },
      { label: "New Arrivals", href: "/shop" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/about" },
      { label: "Sustainability", href: "/about" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Shipping & Returns", href: "/about" },
      { label: "Size Guide", href: "/about" },
      { label: "FAQ", href: "/contact" },
      { label: "Privacy Policy", href: "/about" },
    ],
  },
];

// Replace "#" with your real profile URLs.
export const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "YouTube", href: "#" },
];