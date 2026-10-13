"use client";

import { Heart } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { cn } from "@/lib/cn";

type WishlistButtonProps = {
  productId: string;
  productName: string;
  iconSize?: number;
  /** Positioning and shape come from the parent (card corner vs. product page). */
  className?: string;
};

/** The heart button. Small client component so product cards can stay server components. */
export default function WishlistButton({
  productId,
  productName,
  iconSize = 16,
  className,
}: WishlistButtonProps) {
  const { toggleWishlist, isInWishlist } = useShop();
  const isSaved = isInWishlist(productId);

  return (
    <button
      type="button"
      onClick={() => toggleWishlist(productId)}
      aria-pressed={isSaved}
      aria-label={isSaved ? `Remove ${productName} from wishlist` : `Add ${productName} to wishlist`}
      className={className}
    >
      <Heart
        size={iconSize}
        className={cn("transition-colors", isSaved ? "fill-sand-600 text-sand-600" : "text-ink-700")}
      />
    </button>
  );
}