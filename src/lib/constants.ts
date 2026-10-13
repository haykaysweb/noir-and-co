/**
 * Store-wide constants.
 * Anything the store owner might want to change (name, shipping rules,
 * navigation) lives here instead of being scattered through components.
 */

// ---------------------------------------------------------------------------
// Brand
// ---------------------------------------------------------------------------
export const STORE_NAME = "NOIR & CO";
export const STORE_TAGLINE =
  "Modern luxury essentials. Crafted with intention, designed to last.";

// Set PUBLIC_SITE_URL in .env.local. Used for SEO tags and the sitemap.
export const SITE_URL = process.env.PUBLIC_SITE_URL ?? "http://localhost:3000";

// ---------------------------------------------------------------------------
// Cart and shipping
// ---------------------------------------------------------------------------
export const FREE_SHIPPING_THRESHOLD = 500;
export const FLAT_SHIPPING_RATE = 25;
export const MAX_QUANTITY_PER_ITEM = 10;

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

// ---------------------------------------------------------------------------
// Shop page options
// ---------------------------------------------------------------------------
export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export const PRICE_RANGES = [
  { id: "all", label: "Any price", min: 0, max: Infinity },
  { id: "under-300", label: "Under $300", min: 0, max: 299 },
  { id: "300-600", label: "$300 – $600", min: 300, max: 600 },
  { id: "over-600", label: "Over $600", min: 601, max: Infinity },
] as const;

export type PriceRangeId = (typeof PRICE_RANGES)[number]["id"];

// Controls the order sizes appear in the filter panel.
export const SIZE_DISPLAY_ORDER: string[] = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "One Size",
  "36mm",
  "38mm",
  "40mm",
  "42mm",
];

// ---------------------------------------------------------------------------
// Checkout
// ---------------------------------------------------------------------------
export const SHIPPING_COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "UK", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "JP", name: "Japan" },
] as const;