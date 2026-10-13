"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { formatPrice } from "@/lib/format";
import { searchProducts } from "@/lib/products";

type SearchOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

/** Full-width search panel that slides down from the top of the page. */
export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");

  // Only re-run the search when the typed text changes.
  const results = useMemo(() => searchProducts(query), [query]);

  // Clear the search box every time the overlay closes.
  function handleClose() {
    setQuery("");
    onClose();
  }

  useEscapeKey(handleClose, isOpen);
  useLockBodyScroll(isOpen);

  if (!isOpen) return null;

  const hasQuery = query.trim() !== "";

  return (
    <div className="fixed inset-0 z-80">
      <div className="absolute inset-0 animate-fade-in bg-ink-900/40" onClick={handleClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
        className="absolute inset-x-0 top-0 animate-slide-up bg-sand-50 shadow-lg"
      >
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          {/* Search box */}
          <div className="flex items-center gap-3 border-b border-ink-200 pb-3">
            <Search size={24} className="text-ink-400" aria-hidden="true" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search for products..."
              aria-label="Search for products"
              className="flex-1 bg-transparent text-lg text-ink-900 outline-none placeholder:text-ink-300"
              autoFocus // Intentional: the overlay exists only to type in this box.
            />
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close search"
              className="p-2 text-ink-500 transition-colors hover:text-ink-900"
            >
              <X size={22} />
            </button>
          </div>

          {/* Results */}
          {hasQuery && (
            <div className="mt-6">
              {results.length === 0 ? (
                <p className="py-8 text-center text-sm text-ink-400">
                  No products found for &ldquo;{query}&rdquo;
                </p>
              ) : (
                <>
                  <p className="mb-4 text-xs uppercase tracking-wider text-ink-400">
                    {results.length} result{results.length !== 1 && "s"}
                  </p>
                  <ul className="grid max-h-[50vh] grid-cols-2 gap-4 overflow-y-auto sm:grid-cols-3">
                    {results.map((product) => (
                      <li key={product.id}>
                        <Link href={`/shop/${product.slug}`} onClick={handleClose} className="group block">
                          <div className="relative aspect-3/4 overflow-hidden rounded-lg bg-ink-100">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="(min-width: 640px) 220px, 45vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                          <h3 className="mt-2 text-sm font-medium text-ink-900 transition-colors group-hover:text-sand-700">
                            {product.name}
                          </h3>
                          <p className="text-xs text-ink-500">{formatPrice(product.price)}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}