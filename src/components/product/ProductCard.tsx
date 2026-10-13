import Image from "next/image";
import Link from "next/link";
import QuickAddButton from "@/components/product/QuickAddButton";
import WishlistButton from "@/components/product/WishlistButton";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/product";

/**
 * A single product in a grid.
 *
 * This is a server component. Only the two small interactive buttons
 * (wishlist and quick add) are client components, so the card itself
 * ships no JavaScript to the browser.
 */
export default function ProductCard({ product }: { product: Product }) {
  const productHref = `/shop/${product.slug}`;

  return (
    <article className="group relative">
      <div className="relative aspect-3/4 overflow-hidden rounded-lg bg-ink-100">
        {/* The link sits behind the buttons and covers the whole image. */}
        <Link href={productHref} aria-label={`View ${product.name}`} className="absolute inset-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {product.badge && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-sand-50 px-3 py-1 text-xs font-medium text-ink-900 shadow-sm">
            {product.badge}
          </span>
        )}

        <WishlistButton
          productId={product.id}
          productName={product.name}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-sand-50/90 shadow-sm backdrop-blur-sm transition-colors hover:bg-white"
        />

        {/* Slides up from the bottom of the image on hover (or keyboard focus). */}
        <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full p-3 transition-transform duration-300 group-focus-within:translate-y-0 group-hover:translate-y-0">
          <QuickAddButton product={product} />
        </div>
      </div>

      <div className="mt-3">
        <p className="mb-1 text-xs uppercase tracking-wider text-ink-400">{product.category}</p>
        <Link href={productHref}>
          <h3 className="text-sm font-medium text-ink-900 transition-colors hover:text-sand-700">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm font-semibold text-ink-800">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}