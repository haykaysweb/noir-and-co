import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductGrid from "@/components/product/ProductGrid";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Product } from "@/types/product";

type ProductShowcaseProps = {
  eyebrow: string;
  title: string;
  products: Product[];
};

/** A heading, a "View All" link and a row of products. Used for Featured and New Arrivals. */
export default function ProductShowcase({ eyebrow, title, products }: ProductShowcaseProps) {
  return (
    <section>
      <Container className="py-8 lg:py-12">
        <div className="mb-8 flex items-end justify-between">
          <SectionHeading eyebrow={eyebrow} title={title} />
          <Link
            href="/shop"
            className="hidden items-center gap-1 text-sm font-medium text-ink-700 transition-colors hover:text-sand-700 sm:flex"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <ProductGrid products={products} columns="four" />

        {/* On phones the link sits below the grid instead */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-sm font-medium text-ink-700 hover:text-sand-700"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
}