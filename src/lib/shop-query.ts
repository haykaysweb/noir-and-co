import { PRICE_RANGES, SORT_OPTIONS } from "@/lib/constants";
import type { PriceRangeId, SortValue } from "@/lib/constants";
import { PRODUCT_CATEGORIES } from "@/types/product";
import type { ProductCategory } from "@/types/product";

/**
 * The shop page keeps its filters in the URL, for example:
 *   /shop?category=Bags&price=under-300&size=M&size=L&sort=price-asc
 *
 * Why the URL? Filtered pages can be bookmarked and shared, the back button
 * works, and the server can render the filtered list directly.
 */

// The names of the query parameters, in one place so the server code that
// reads them and the client code that writes them can never disagree.
export const SHOP_QUERY_KEYS = {
  category: "category",
  price: "price",
  size: "size",
  color: "color",
  sort: "sort",
} as const;

/** The shape Next.js gives us for ?a=1&b=2&b=3 */
export type RawSearchParams = Record<string, string | string[] | undefined>;

/** The cleaned-up, validated version of the URL parameters. */
export type ShopQuery = {
  category: ProductCategory | null;
  priceRangeId: PriceRangeId;
  sizes: string[];
  colors: string[];
  sort: SortValue;
};

function getFirstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function getAllValues(value: string | string[] | undefined): string[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

/**
 * Turns raw URL parameters into a safe ShopQuery.
 * Anything unrecognised (a typo, or someone editing the URL by hand)
 * falls back to a sensible default instead of breaking the page.
 */
export function parseShopQuery(params: RawSearchParams): ShopQuery {
  const categoryParam = getFirstValue(params[SHOP_QUERY_KEYS.category]);
  const priceParam = getFirstValue(params[SHOP_QUERY_KEYS.price]);
  const sortParam = getFirstValue(params[SHOP_QUERY_KEYS.sort]);

  return {
    category: PRODUCT_CATEGORIES.find((category) => category === categoryParam) ?? null,
    priceRangeId: PRICE_RANGES.find((range) => range.id === priceParam)?.id ?? "all",
    sizes: getAllValues(params[SHOP_QUERY_KEYS.size]),
    colors: getAllValues(params[SHOP_QUERY_KEYS.color]),
    sort: SORT_OPTIONS.find((option) => option.value === sortParam)?.value ?? "featured",
  };
}