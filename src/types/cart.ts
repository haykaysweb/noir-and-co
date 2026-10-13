import type { Product } from "@/types/product";

/**
 * What we actually save in the browser: only references, never prices.
 * Prices always come from the product catalog, so a stale cart can never
 * charge an outdated price.
 */
export type CartLine = {
  /** Unique per product + size + color, e.g. "c1-M-Camel". */
  lineId: string;
  productId: string;
  size: string;
  color: string;
  quantity: number;
};

/** A cart line joined with its full product, ready to display. */
export type CartItem = CartLine & {
  product: Product;
};