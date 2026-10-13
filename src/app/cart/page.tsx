import type { Metadata } from "next";
import CartView from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Your Cart",
  robots: { index: false }, // Cart pages should not appear in Google.
};

// A server component that only sets the page title and renders the client component.
export default function CartPage() {
  return <CartView />;
}