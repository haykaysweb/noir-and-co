"use client";

import Image from "next/image";
import { useActionState, useEffect } from "react";
import { Check, Lock, ShoppingBag } from "lucide-react";
import { placeOrderAction } from "@/actions/checkout";
import PriceBreakdown from "@/components/cart/PriceBreakdown";
import { ButtonLink } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import EmptyState from "@/components/ui/EmptyState";
import FormField, { inputClassName } from "@/components/ui/FormField";
import SectionHeading from "@/components/ui/SectionHeading";
import SubmitButton from "@/components/ui/SubmitButton";
import TextField from "@/components/ui/TextField";
import { useShop } from "@/context/ShopContext";
import { SHIPPING_COUNTRIES } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { initialFormState } from "@/lib/form-state";
import { formatPrice } from "@/lib/format";

/** The content of the /checkout page. */
export default function CheckoutView() {
  const { cartItems, cartSubtotal, clearCart, isReady } = useShop();
  const [state, formAction] = useActionState(placeOrderAction, initialFormState);

  // Once the server has saved the order, empty the cart.
  useEffect(() => {
    if (state.status === "success") clearCart();
  }, [state.status, clearCart]);

  // The cart lives in the browser, so it travels to the server as hidden JSON.
  // Only references are sent. The server looks up the real prices itself.
  const cartPayload = JSON.stringify(
    cartItems.map((item) => ({
      productId: item.product.id,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
    })),
  );

  if (!isReady) {
    return (
      <Container className="py-24">
        <p className="text-center text-sm text-ink-500">Loading checkout…</p>
      </Container>
    );
  }

  // Checked BEFORE the empty-cart case, because a successful order empties the cart.
  if (state.status === "success") {
    return (
      <Container className="max-w-2xl py-24 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success">
          <Check size={32} className="text-white" />
        </div>
        <h1 className="mb-3 font-serif text-3xl font-semibold text-ink-900">Order Confirmed</h1>
        <p className="mb-2 text-sm text-ink-500">Thank you for your purchase.</p>
        <p className="mb-8 text-sm font-medium text-ink-900">Order number: {state.orderNumber}</p>
        <ButtonLink href="/shop">Continue Shopping</ButtonLink>
      </Container>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Container className="max-w-2xl py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Add some items before checking out."
          action={<ButtonLink href="/shop">Browse Products</ButtonLink>}
        />
      </Container>
    );
  }

  return (
    <>
      <Container className="pb-6 pt-8">
        <SectionHeading level="h1" eyebrow="Checkout" title="Complete Your Order" />
      </Container>

      <Container className="pb-16">
        <form
          action={formAction}
          noValidate
          className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12"
        >
          <input type="hidden" name="cart" value={cartPayload} />

          {/* Left column: the form */}
          <div className="space-y-8 lg:col-span-2">
            {state.status === "error" && state.message && (
              <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                {state.message}
              </p>
            )}

            <section>
              <h2 className="mb-4 font-serif text-xl font-semibold text-ink-900">
                Contact Information
              </h2>
              <TextField
                name="email"
                label="Email Address"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                state={state}
              />
            </section>

            <section>
              <h2 className="mb-4 font-serif text-xl font-semibold text-ink-900">
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextField name="firstName" label="First Name" autoComplete="given-name" state={state} />
                <TextField name="lastName" label="Last Name" autoComplete="family-name" state={state} />
                <TextField
                  name="address"
                  label="Street Address"
                  autoComplete="street-address"
                  className="sm:col-span-2"
                  state={state}
                />
                <TextField name="city" label="City" autoComplete="address-level2" state={state} />
                <TextField name="postalCode" label="Postal Code" autoComplete="postal-code" state={state} />

                <FormField
                  label="Country"
                  htmlFor="country"
                  error={state.fieldErrors?.country?.[0]}
                  className="sm:col-span-2"
                >
                  <select
                    id="country"
                    name="country"
                    autoComplete="country"
                    defaultValue={state.values?.country ?? ""}
                    aria-invalid={Boolean(state.fieldErrors?.country)}
                    className={cn(inputClassName, "cursor-pointer")}
                  >
                    <option value="">Select a country</option>
                    {SHIPPING_COUNTRIES.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>
            </section>

            {/*
              Payment: intentionally NOT a card form.
              A website must never collect raw card numbers itself. A payment
              provider (Stripe, Paystack, Flutterwave...) shows its own secure
              card fields, and your server only ever receives a token.
            */}
            <section>
              <h2 className="mb-4 font-serif text-xl font-semibold text-ink-900">Payment</h2>
              <div className="flex items-start gap-3 rounded-lg border border-dashed border-ink-300 bg-sand-100 p-5">
                <Lock size={18} className="mt-0.5 shrink-0 text-ink-500" />
                <p className="text-sm leading-relaxed text-ink-600">
                  Payments are not connected in this demo. In a live store, your payment
                  provider&apos;s secure card form appears here.
                </p>
              </div>
            </section>
          </div>

          {/* Right column: order summary */}
          <aside className="lg:col-span-1">
            <div className="rounded-2xl bg-sand-100 p-6 lg:sticky lg:top-24">
              <h2 className="mb-4 font-serif text-xl font-semibold text-ink-900">Order Summary</h2>

              <ul className="mb-4 max-h-48 space-y-3 overflow-y-auto border-b border-sand-200 pb-4">
                {cartItems.map((item) => (
                  <li key={item.lineId} className="flex gap-3">
                    <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-ink-100">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-ink-900">{item.product.name}</p>
                      <p className="text-xs text-ink-400">
                        {item.size} · {item.color} · Qty {item.quantity}
                      </p>
                      <p className="mt-0.5 text-xs font-semibold text-ink-800">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <PriceBreakdown subtotal={cartSubtotal} />

              <SubmitButton fullWidth size="md" pendingLabel="Placing order…" className="mt-6">
                <Lock size={16} /> Place Order
              </SubmitButton>
              <p className="mt-4 text-center text-xs text-ink-400">
                This is a demo. No payment will be processed.
              </p>
            </div>
          </aside>
        </form>
      </Container>
    </>
  );
}