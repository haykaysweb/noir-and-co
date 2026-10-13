"use server";

import { randomUUID } from "node:crypto";
import { z } from "zod";
import { getStringValues, type FormState } from "@/lib/form-state";
import { calculateShipping } from "@/lib/pricing";
import { prisma } from "@/lib/prisma";
import { getProductById } from "@/lib/products";
import { cartLinesSchema, checkoutSchema } from "@/lib/validation";

type OrderItemData = {
  productId: string;
  productName: string;
  size: string;
  color: string;
  unitPrice: number;
  quantity: number;
};

export async function placeOrderAction(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const values = getStringValues(formData);

  // Validate the form fields.
  const formResult = checkoutSchema.safeParse(values);
  if (!formResult.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: z.flattenError(formResult.error).fieldErrors,
      values,
    };
  }

  // Read the cart. It travels as hidden JSON, so it must be treated as untrusted input.
  let rawCart: unknown;
  try {
    rawCart = JSON.parse(String(formData.get("cart") ?? "[]"));
  } catch {
    return {
      status: "error",
      message: "We couldn't read your cart. Please refresh and try again.",
      values,
    };
  }

  const cartResult = cartLinesSchema.safeParse(rawCart);
  if (!cartResult.success) {
    return {
      status: "error",
      message: "Your cart is empty or invalid.",
      values,
    };
  }

  // Rebuild every line from the catalog. Names and prices come from the server,
  //    never from the browser, so they cannot be tampered with.
  const orderItems: OrderItemData[] = [];

  for (const line of cartResult.data) {
    const product = getProductById(line.productId);

    if (
      !product ||
      !product.sizes.includes(line.size) ||
      !product.colors.some((color) => color.name === line.color)
    ) {
      return {
        status: "error",
        message: "An item in your cart is no longer available.",
        values,
      };
    }

    orderItems.push({
      productId: product.id,
      productName: product.name,
      size: line.size,
      color: line.color,
      unitPrice: product.price,
      quantity: line.quantity,
    });
  }

  const subtotal = orderItems.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  );
  const shipping = calculateShipping(subtotal);
  const orderNumber = `NC-${randomUUID().slice(0, 8).toUpperCase()}`;

  //  Save the order and its items together. The nested "items.create" runs in one
  //    transaction: either everything is saved, or nothing is.
  try {
    await prisma.order.create({
      data: {
        orderNumber,
        ...formResult.data,
        subtotal,
        shipping,
        total: subtotal + shipping,
        items: { create: orderItems },
      },
    });
  } catch (error) {
    console.error("Could not save order:", error);
    return {
      status: "error",
      message: "We couldn't place your order. Please try again.",
      values,
    };
  }

  return { status: "success", orderNumber, message: "Order placed." };
}
