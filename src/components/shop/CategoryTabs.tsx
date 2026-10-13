import Link from "next/link";
import { cn } from "@/lib/cn";
import { PRODUCT_CATEGORIES } from "@/types/product";
import type { ProductCategory } from "@/types/product";

const TABS = [
  { label: "All", href: "/shop", category: null },
  ...PRODUCT_CATEGORIES.map((category) => ({
    label: category,
    href: `/shop?category=${category}`,
    category,
  })),
];

/**
 * Plain links, so this can be a server component.
 * Switching category starts a fresh view: price, size and color filters reset.
 */
export default function CategoryTabs({ activeCategory }: { activeCategory: ProductCategory | null }) {
  return (
    <nav aria-label="Product categories" className="no-scrollbar flex items-center gap-1 overflow-x-auto">
      {TABS.map((tab) => {
        const isActive = tab.category === activeCategory;

        return (
          <Link
            key={tab.label}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              isActive ? "bg-sand-100 text-sand-700" : "text-ink-500 hover:text-ink-900",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}