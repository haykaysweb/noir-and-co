"use client";

import { ShoppingBag } from "lucide-react";
import CartItemRow from "@/components/cart/CartItemRow";
import PriceBreakdown from "@/components/cart/PriceBreakdown";
import { ButtonLink } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import EmptyState from "@/components/ui/EmptyState";
import SectionHeading from "@/components/ui/SectionHeading";
import { useShop } from "@/context/ShopContext";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";
import { formatPrice } from "@/lib/format";

/**
 * The content of the /cart page.
 * app/cart/page.tsx is a server component (it sets the page title) and
 * renders this client component, because the cart lives in the browser.
 */
export default function CartView() {
  const { cartItems, cartSubtotal, isReady } = useShop();

  // Until the saved cart has been read, show a neutral message instead of "empty".
  if (!isReady) {
    return (
      <Container className="py-24">
        <p className="text-center text-sm text-ink-500">Loading your cart…</p>
      </Container>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Container className="max-w-2xl py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Looks like you haven't added anything yet."
          action={<ButtonLink href="/shop">Continue Shopping</ButtonLink>}
        />
      </Container>
    );
  }

  return (
    <>
      <Container className="pb-6 pt-8">
        <SectionHeading level="h1" eyebrow="Shopping Bag" title="Your Cart" />
      </Container>

      <Container className="pb-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          {/* Item list */}
          <div className="lg:col-span-2">
            <ul className="border-t border-ink-100">
              {cartItems.map((item) => (
                <CartItemRow key={item.lineId} item={item} variant="page" />
              ))}
            </ul>

            <ButtonLink
              href="/shop"
              size="md"
              className="mt-6 bg-transparent px-0 text-ink-700 hover:bg-transparent hover:text-sand-700"
            >
              Continue Shopping
            </ButtonLink>
          </div>

          {/* Order summary */}
          <aside className="lg:col-span-1">
            <div className="rounded-2xl bg-sand-100 p-6 lg:sticky lg:top-24">
              <h2 className="mb-4 font-serif text-xl font-semibold text-ink-900">Order Summary</h2>
              <PriceBreakdown subtotal={cartSubtotal} showTaxNote />

              <ButtonLink href="/checkout" fullWidth size="md" className="mt-6">
                Proceed to Checkout
              </ButtonLink>

              <p className="mt-4 text-center text-xs text-ink-400">
                Free shipping on orders over {formatPrice(FREE_SHIPPING_THRESHOLD)}
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}