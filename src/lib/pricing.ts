import { FLAT_SHIPPING_RATE, FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

/**
 * The one place that decides what shipping costs.
 * The cart drawer, cart page and checkout all call this function,
 * so the rule can never get out of sync between them.
 */
export function calculateShipping(subtotal: number): number {
  if (subtotal === 0) return 0; // Nothing in the cart, nothing to ship.
  return subtotal > FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_RATE;
}

export function calculateOrderTotal(subtotal: number): number {
  return subtotal + calculateShipping(subtotal);
}