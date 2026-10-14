/**
 * Store-wide constants.
 * Anything the store owner might want to change (name, shipping rules,
 * navigation) lives here instead of being scattered through components.
 */

// Brand
export const STORE_NAME = "NOIR & CO";
export const STORE_TAGLINE =
  "Modern luxury essentials. Crafted with intention, designed to last.";

// Currency
export const CURRENCY_CODE = "NGN";
export const CURRENCY_LOCALE = "en-NG";

// Set NEXT_PUBLIC_SITE_URL in .env.local. Used for SEO tags and the sitemap.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Cart and shipping
export const FREE_SHIPPING_THRESHOLD = 1_000_000; // free shipping above ₦1,000,000
export const FLAT_SHIPPING_RATE = 5_000; // otherwise ₦5,000
export const MAX_QUANTITY_PER_ITEM = 10;

// Navigation
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;


export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

export const PRICE_RANGES = [
  { id: "all", label: "Any price", min: 0, max: Infinity },
  { id: "under-400k", label: "Under ₦400,000", min: 0, max: 399_999 },
  { id: "400k-800k", label: "₦400,000 – ₦800,000", min: 400_000, max: 800_000 },
  { id: "over-800k", label: "Over ₦800,000", min: 800_001, max: Infinity },
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


// Checkout

export const SHIPPING_COUNTRIES = [
  { code: "NG", name: "Nigeria" },
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "UK", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "JP", name: "Japan" },
] as const;