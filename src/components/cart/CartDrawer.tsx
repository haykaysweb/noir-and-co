"use client";

import { ShoppingBag, X } from "lucide-react";
import CartItemRow from "@/components/cart/CartItemRow";
import PriceBreakdown from "@/components/cart/PriceBreakdown";
import { Button, ButtonLink } from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import { useShop } from "@/context/ShopContext";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

/** The cart panel that slides in from the right when you add something or click the bag icon. */
export default function CartDrawer() {
  const { isCartOpen, closeCart, cartItems, cartCount, cartSubtotal } = useShop();

  // Hooks first, early return after (hooks must run on every render).
  useEscapeKey(closeCart, isCartOpen);
  useLockBodyScroll(isCartOpen);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-70">
      {/* Dark backdrop: clicking it closes the drawer */}
      <div className="absolute inset-0 animate-fade-in bg-ink-900/40" onClick={closeCart} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="absolute inset-y-0 right-0 flex w-full max-w-md animate-slide-in-right flex-col bg-sand-50 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink-100 px-6 py-5">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-ink-800" />
            <h2 className="font-serif text-lg font-semibold text-ink-900">
              Your Cart ({cartCount})
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="p-2 text-ink-600 transition-colors hover:text-ink-900"
          >
            <X size={22} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            iconSize={48}
            title="Your cart is empty"
            description="Add something you love and it will show up here."
            className="flex-1 justify-center"
            action={
              <ButtonLink href="/shop" onClick={closeCart}>
                Continue Shopping
              </ButtonLink>
            }
          />
        ) : (
          <>
            {/* Items */}
            <ul className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
              {cartItems.map((item) => (
                <CartItemRow key={item.lineId} item={item} variant="drawer" onNavigate={closeCart} />
              ))}
            </ul>

            {/* Totals and actions */}
            <div className="space-y-3 border-t border-ink-100 px-6 py-5">
              <PriceBreakdown subtotal={cartSubtotal} />
              <ButtonLink href="/checkout" onClick={closeCart} fullWidth size="md" className="mt-2">
                Proceed to Checkout
              </ButtonLink>
              <Button
                onClick={closeCart}
                fullWidth
                size="md"
                className="bg-transparent text-ink-500 hover:bg-transparent hover:text-ink-900"
              >
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}