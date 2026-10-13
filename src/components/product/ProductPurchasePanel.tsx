"use client";

import { useEffect, useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import WishlistButton from "@/components/product/WishlistButton";
import { Button } from "@/components/ui/Button";
import QuantitySelector from "@/components/ui/QuantitySelector";
import { useShop } from "@/context/ShopContext";
import { cn } from "@/lib/cn";
import type { Product } from "@/types/product";

/**
 * Everything on the product page that needs state:
 * color, size, quantity, add to cart and the wishlist heart.
 * The product page itself stays a server component.
 */
export default function ProductPurchasePanel({ product }: { product: Product }) {
  const { addToCart } = useShop();

  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // After adding, show "Added to Cart" for two seconds, then go back to normal.
  useEffect(() => {
    if (!justAdded) return;

    const timerId = setTimeout(() => setJustAdded(false), 2000);
    return () => clearTimeout(timerId); // Cancel if the person leaves the page first.
  }, [justAdded]);

  function handleAddToCart() {
    addToCart(product, { size: selectedSize, color: selectedColor, quantity });
    setJustAdded(true);
  }

  return (
    <div>
      {/* Color */}
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-900">Color</h2>
          <span className="text-sm text-ink-500">{selectedColor}</span>
        </div>
        <div className="flex gap-2">
          {product.colors.map((color) => {
            const isSelected = color.name === selectedColor;

            return (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColor(color.name)}
                aria-label={color.name}
                aria-pressed={isSelected}
                style={{ backgroundColor: color.hex }}
                className={cn(
                  "relative h-9 w-9 rounded-full border-2 transition-all",
                  isSelected
                    ? "border-sand-600 ring-2 ring-sand-200"
                    : "border-ink-200 hover:border-ink-400",
                )}
              >
                {isSelected && (
                  <Check
                    size={14}
                    className="absolute inset-0 m-auto text-white mix-blend-difference"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Size */}
      <div className="mb-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-900">Size</h2>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              aria-pressed={size === selectedSize}
              className={cn(
                "rounded-lg border px-4 py-2.5 text-sm font-medium transition-all",
                size === selectedSize
                  ? "border-ink-900 bg-ink-900 text-white"
                  : "border-ink-200 text-ink-700 hover:border-ink-400",
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity, add to cart, wishlist */}
      <div className="mb-6 flex items-center gap-4">
        <QuantitySelector value={quantity} onChange={setQuantity} />

        <Button
          onClick={handleAddToCart}
          size="md"
          className={cn("flex-1", justAdded && "bg-success hover:bg-success")}
        >
          {justAdded ? (
            <>
              <Check size={18} /> Added to Cart
            </>
          ) : (
            <>
              <ShoppingBag size={18} /> Add to Cart
            </>
          )}
        </Button>

        <WishlistButton
          productId={product.id}
          productName={product.name}
          iconSize={20}
          className="rounded-lg border border-ink-200 p-3.5 transition-colors hover:border-sand-400"
        />
      </div>
    </div>
  );
}