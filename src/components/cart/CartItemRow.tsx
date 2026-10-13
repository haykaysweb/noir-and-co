"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import QuantitySelector from "@/components/ui/QuantitySelector";
import { useShop } from "@/context/ShopContext";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import type { CartItem } from "@/types/cart";

type CartItemRowProps = {
  item: CartItem;
  /** "drawer" is the compact version, "page" is the roomy one on the cart page. */
  variant: "drawer" | "page";
  /** Called when the product link is clicked (the drawer uses it to close itself). */
  onNavigate?: () => void;
};

export default function CartItemRow({ item, variant, onNavigate }: CartItemRowProps) {
  const { updateQuantity, removeFromCart } = useShop();
  const { product } = item;

  const isDrawer = variant === "drawer";
  const productHref = `/shop/${product.slug}`;

  // The thumbnail is the same in both layouts, only its size changes.
  const thumbnail = (
    <Link
      href={productHref}
      onClick={onNavigate}
      className={cn(
        "relative shrink-0 overflow-hidden rounded-lg bg-ink-100",
        isDrawer ? "h-24 w-20" : "h-32 w-24 sm:h-36 sm:w-28",
      )}
    >
      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes={isDrawer ? "80px" : "112px"}
        className="object-cover"
      />
    </Link>
  );

  if (isDrawer) {
    return (
      <li className="flex gap-4 border-b border-ink-100 pb-4">
        {thumbnail}

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-medium text-ink-900">{product.name}</h3>
          <p className="mt-0.5 text-xs text-ink-400">
            {item.size} · {item.color}
          </p>
          <p className="mt-1 text-sm font-semibold text-ink-800">{formatPrice(product.price)}</p>

          <div className="mt-2 flex items-center gap-3">
            <QuantitySelector
              size="sm"
              value={item.quantity}
              onChange={(quantity) => updateQuantity(item.lineId, quantity)}
            />
            <button
              type="button"
              onClick={() => removeFromCart(item.lineId)}
              className="text-xs text-ink-400 transition-colors hover:text-ink-900"
            >
              Remove
            </button>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className="flex gap-4 border-b border-ink-100 py-6">
      {thumbnail}

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="mb-1 text-xs uppercase tracking-wider text-ink-400">{product.category}</p>
            <Link href={productHref}>
              <h3 className="text-base font-medium text-ink-900 transition-colors hover:text-sand-700">
                {product.name}
              </h3>
            </Link>
            <p className="mt-1 text-sm text-ink-500">
              {item.size} · {item.color}
            </p>
          </div>

          <button
            type="button"
            onClick={() => removeFromCart(item.lineId)}
            aria-label={`Remove ${product.name} from cart`}
            className="p-1.5 text-ink-400 transition-colors hover:text-ink-900"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <QuantitySelector
            value={item.quantity}
            onChange={(quantity) => updateQuantity(item.lineId, quantity)}
          />
          {/* Line total: unit price multiplied by quantity */}
          <p className="text-base font-semibold text-ink-900">
            {formatPrice(product.price * item.quantity)}
          </p>
        </div>
      </div>
    </li>
  );
}