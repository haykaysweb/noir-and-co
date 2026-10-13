import ProductCard from "@/components/product/ProductCard";
import { cn } from "@/lib/cn";
import type { Product } from "@/types/product";

const COLUMN_CLASSES = {
  three: "grid-cols-2 lg:grid-cols-3",
  four: "grid-cols-2 lg:grid-cols-4",
};

type ProductGridProps = {
  products: Product[];
  /** How many columns to show on large screens. Phones always show two. */
  columns?: keyof typeof COLUMN_CLASSES;
};

export default function ProductGrid({ products, columns = "four" }: ProductGridProps) {
  return (
    <ul className={cn("grid gap-4 lg:gap-6", COLUMN_CLASSES[columns])}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}