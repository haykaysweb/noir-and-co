"use client";

import { Heart } from "lucide-react";
import ProductGrid from "@/components/product/ProductGrid";
import { ButtonLink } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import EmptyState from "@/components/ui/EmptyState";
import SectionHeading from "@/components/ui/SectionHeading";
import { useShop } from "@/context/ShopContext";
import { getProductById } from "@/lib/products";
import type { Product } from "@/types/product";

/** The content of the /wishlist page. */
export default function WishlistView() {
  const { wishlistIds, isReady } = useShop();

  // Turn the saved ids back into full products (skipping any that no longer exist).
  const savedProducts: Product[] = wishlistIds.flatMap((id) => {
    const product = getProductById(id);
    return product ? [product] : [];
  });

  return (
    <>
      <Container className="pb-6 pt-8">
        <SectionHeading level="h1" eyebrow="Saved" title="Your Wishlist" />
        {isReady && (
          <p className="mt-2 text-sm text-ink-500">
            {savedProducts.length} saved item{savedProducts.length !== 1 && "s"}
          </p>
        )}
      </Container>

      <Container className="pb-16">
        {!isReady ? (
          <p className="py-16 text-center text-sm text-ink-500">Loading your wishlist…</p>
        ) : savedProducts.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="No saved items yet"
            description="Tap the heart on any product to save it here for later."
            action={<ButtonLink href="/shop">Browse Products</ButtonLink>}
          />
        ) : (
          <ProductGrid products={savedProducts} columns="four" />
        )}
      </Container>
    </>
  );
}