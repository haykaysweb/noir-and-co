"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useShop } from "@/context/ShopContext";
import type { Product } from "@/types/product";

/** "Add to Cart" on a product card. Uses the product's first size and color. */
export default function QuickAddButton({ product }: { product: Product }) {
  const { addToCart } = useShop();

  return (
    <Button fullWidth size="md" onClick={() => addToCart(product)}>
      <ShoppingBag size={16} />
      Add to Cart
    </Button>
  );
}