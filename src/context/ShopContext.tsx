"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useIsHydrated } from "@/hooks/useIsHydrated";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { MAX_QUANTITY_PER_ITEM } from "@/lib/constants";
import { getProductById } from "@/lib/products";
import type { CartItem, CartLine } from "@/types/cart";
import type { Product } from "@/types/product";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type AddToCartOptions = {
  size?: string;
  color?: string;
  quantity?: number;
};

type ShopContextValue = {
  // Cart
  cartItems: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  addToCart: (product: Product, options?: AddToCartOptions) => void;
  removeFromCart: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  // Wishlist
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  /** false until the saved cart has been read from the browser. */
  isReady: boolean;
};

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const CART_STORAGE_KEY = "noir-and-co:cart";
const WISHLIST_STORAGE_KEY = "noir-and-co:wishlist";

// Defined outside the component so the reference never changes (see useLocalStorage).
const EMPTY_CART: CartLine[] = [];
const EMPTY_WISHLIST: string[] = [];

/** The same product in a different size or color is a separate cart line. */
function createLineId(productId: string, size: string, color: string): string {
  return `${productId}-${size}-${color}`;
}

function clampQuantity(quantity: number): number {
  return Math.min(Math.max(quantity, 1), MAX_QUANTITY_PER_ITEM);
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
const ShopContext = createContext<ShopContextValue | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const isReady = useIsHydrated();
  const [cartLines, setCartLines] = useLocalStorage<CartLine[]>(CART_STORAGE_KEY, EMPTY_CART);
  const [wishlistIds, setWishlistIds] = useLocalStorage<string[]>(
    WISHLIST_STORAGE_KEY,
    EMPTY_WISHLIST,
  );
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Join each saved line with its full product so components can display it.
  // A line whose product no longer exists in the catalog is silently skipped.
  const cartItems = useMemo<CartItem[]>(
    () =>
      cartLines.flatMap((line) => {
        const product = getProductById(line.productId);
        return product ? [{ ...line, product }] : [];
      }),
    [cartLines],
  );

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  // -------------------------------------------------------------------------
  // Cart actions
  // -------------------------------------------------------------------------
  const addToCart = useCallback(
    (product: Product, options: AddToCartOptions = {}) => {
      const size = options.size ?? product.sizes[0];
      const color = options.color ?? product.colors[0].name;
      const quantity = options.quantity ?? 1;
      const lineId = createLineId(product.id, size, color);

      setCartLines((currentLines) => {
        const existingLine = currentLines.find((line) => line.lineId === lineId);

        if (existingLine) {
          // Same product, size and color: increase its quantity.
          // We build a NEW array with map() instead of changing the old one,
          // because React state must never be modified directly.
          return currentLines.map((line) =>
            line.lineId === lineId
              ? { ...line, quantity: clampQuantity(line.quantity + quantity) }
              : line,
          );
        }

        const newLine: CartLine = {
          lineId,
          productId: product.id,
          size,
          color,
          quantity: clampQuantity(quantity),
        };
        return [...currentLines, newLine];
      });

      setIsCartOpen(true);
    },
    [setCartLines],
  );

  const removeFromCart = useCallback(
    (lineId: string) => {
      setCartLines((currentLines) => currentLines.filter((line) => line.lineId !== lineId));
    },
    [setCartLines],
  );

  const updateQuantity = useCallback(
    (lineId: string, quantity: number) => {
      setCartLines((currentLines) =>
        currentLines.map((line) =>
          line.lineId === lineId ? { ...line, quantity: clampQuantity(quantity) } : line,
        ),
      );
    },
    [setCartLines],
  );

  const clearCart = useCallback(() => setCartLines([]), [setCartLines]);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  // -------------------------------------------------------------------------
  // Wishlist actions
  // -------------------------------------------------------------------------
  const toggleWishlist = useCallback(
    (productId: string) => {
      setWishlistIds((currentIds) =>
        currentIds.includes(productId)
          ? currentIds.filter((id) => id !== productId)
          : [...currentIds, productId],
      );
    },
    [setWishlistIds],
  );

  const isInWishlist = useCallback(
    (productId: string) => wishlistIds.includes(productId),
    [wishlistIds],
  );

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        cartCount,
        cartSubtotal,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        wishlistIds,
        toggleWishlist,
        isInWishlist,
        isReady,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

/** Use this in any client component that needs the cart or wishlist. */
export function useShop(): ShopContextValue {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShop must be used inside <ShopProvider>.");
  }

  return context;
}