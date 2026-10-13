// The single source of truth for the categories the store sells.
// "as const" lets TypeScript turn this list into the ProductCategory type below.
export const PRODUCT_CATEGORIES = ["Clothing", "Bags", "Watches"] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export type ProductColor = {
  name: string;
  hex: string;
};

export type Product = {
  id: string;
  /** URL-friendly name, used in the product page address: /shop/tailored-wool-coat */
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  /** Main image, shown on product cards. */
  image: string;
  /** All images, shown in the product page gallery. */
  images: string[];
  description: string;
  sizes: string[];
  colors: ProductColor[];
  /** Optional label shown on the card, e.g. "New" or "Bestseller". */
  badge?: string;
};