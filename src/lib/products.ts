import { products } from "@/data/products";
import { PRICE_RANGES, SIZE_DISPLAY_ORDER } from "@/lib/constants";
import type { ShopQuery } from "@/lib/shop-query";
import type { Product, ProductColor } from "@/types/product";

/**
 * Every question the UI asks about products goes through this file.
 * Today the answers come from data/products.ts. If you move to a database
 * later, these are the only functions that need to change.
 */

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

/** Other products from the same category, shown under "You May Also Like". */
export function getRelatedProducts(product: Product, count = 4): Product[] {
  return products
    .filter((other) => other.category === product.category && other.id !== product.id)
    .slice(0, count);
}

export function getFeaturedProducts(count = 4): Product[] {
  return products.slice(0, count);
}

export function getNewArrivals(count = 4): Product[] {
  return products.filter((product) => product.badge === "New").slice(0, count);
}

/** Every size that exists in the catalog, in a sensible display order. */
export function getAvailableSizes(): string[] {
  const uniqueSizes = new Set(products.flatMap((product) => product.sizes));

  return [...uniqueSizes].sort(
    (a, b) => SIZE_DISPLAY_ORDER.indexOf(a) - SIZE_DISPLAY_ORDER.indexOf(b),
  );
}

/** Every color that exists in the catalog, without duplicates. */
export function getAvailableColors(): ProductColor[] {
  const colorsByName = new Map<string, ProductColor>();

  for (const product of products) {
    for (const color of product.colors) {
      colorsByName.set(color.name, color);
    }
  }

  return [...colorsByName.values()];
}

/** Applies the shop page filters and sorting to the catalog. */
export function filterAndSortProducts(query: ShopQuery): Product[] {
  const priceRange =
    PRICE_RANGES.find((range) => range.id === query.priceRangeId) ?? PRICE_RANGES[0];

  const matchingProducts = products.filter((product) => {
    const matchesCategory = query.category === null || product.category === query.category;

    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;

    // With no size selected, every product matches. Otherwise the product
    // must come in at least one of the selected sizes.
    const matchesSize =
      query.sizes.length === 0 || product.sizes.some((size) => query.sizes.includes(size));

    const matchesColor =
      query.colors.length === 0 ||
      product.colors.some((color) => query.colors.includes(color.name));

    return matchesCategory && matchesPrice && matchesSize && matchesColor;
  });

  // "featured" keeps the catalog order. filter() already returned a new array,
  // so sorting it in place does not change the original catalog.
  switch (query.sort) {
    case "price-asc":
      matchingProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      matchingProducts.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      matchingProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  return matchingProducts;
}

/** Simple text search across name, category and description. */
export function searchProducts(searchText: string): Product[] {
  const normalizedSearch = searchText.trim().toLowerCase();
  if (normalizedSearch === "") return [];

  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(normalizedSearch) ||
      product.category.toLowerCase().includes(normalizedSearch) ||
      product.description.toLowerCase().includes(normalizedSearch),
  );
}