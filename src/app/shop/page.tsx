import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import ProductGrid from "@/components/product/ProductGrid";
import CategoryTabs from "@/components/shop/CategoryTabs";
import FilterPanel from "@/components/shop/FilterPanel";
import MobileFilterDrawer from "@/components/shop/MobileFilterDrawer";
import SortSelect from "@/components/shop/SortSelect";
import Container from "@/components/ui/Container";
import EmptyState from "@/components/ui/EmptyState";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  filterAndSortProducts,
  getAvailableColors,
  getAvailableSizes,
} from "@/lib/products";
import { parseShopQuery, type RawSearchParams } from "@/lib/shop-query";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse clothing, bags and watches.",
};

// In Next.js 15 and newer, searchParams is a Promise, so we await it.
type ShopPageProps = {
  searchParams: Promise<RawSearchParams>;
};

/**
 * A server component: it reads the filters from the URL and finds the matching
 * products on the server. The browser receives finished HTML, which is
 * fast and good for SEO.
 */
export default async function ShopPage({ searchParams }: ShopPageProps) {
  const query = parseShopQuery(await searchParams);
  const visibleProducts = filterAndSortProducts(query);

  const availableSizes = getAvailableSizes();
  const availableColors = getAvailableColors();

  // "Reset filters" keeps the chosen category but drops everything else.
  const resetFiltersHref = query.category ? `/shop?category=${query.category}` : "/shop";

  return (
    <>
      <Container className="pb-6 pt-8">
        <SectionHeading level="h1" eyebrow="Collection" title={query.category ?? "All Products"} />
        <p className="mt-2 text-sm text-ink-500">
          {visibleProducts.length} item{visibleProducts.length !== 1 && "s"}
        </p>
      </Container>

      {/* Category tabs, mobile filter button and sort dropdown */}
      <Container className="pb-6">
        <div className="flex items-center justify-between gap-4 border-b border-ink-100 pb-4">
          <CategoryTabs activeCategory={query.category} />

          <div className="flex items-center gap-3">
            <MobileFilterDrawer
              availableSizes={availableSizes}
              availableColors={availableColors}
              resultCount={visibleProducts.length}
            />
            <SortSelect currentSort={query.sort} />
          </div>
        </div>
      </Container>

      <Container className="pb-16">
        <div className="flex gap-8">
          {/* Filters sidebar (large screens only) */}
          <aside className="hidden w-60 shrink-0 lg:block">
            <div className="sticky top-24">
              <FilterPanel availableSizes={availableSizes} availableColors={availableColors} />
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {visibleProducts.length === 0 ? (
              <EmptyState
                icon={Search}
                title="No products found"
                description="Nothing matches those filters. Try removing one."
                action={
                  <Link href={resetFiltersHref} className="text-sm font-medium text-sand-700 underline">
                    Reset filters
                  </Link>
                }
              />
            ) : (
              <ProductGrid products={visibleProducts} columns="three" />
            )}
          </div>
        </div>
      </Container>
    </>
  );
}