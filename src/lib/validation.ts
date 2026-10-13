import { z } from "zod";
import { MAX_QUANTITY_PER_ITEM, SHIPPING_COUNTRIES } from "@/lib/constants";

/** A text field that must not be empty or too long. */
function requiredText(label: string, maxLength = 100) {
  return z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .max(maxLength, `${label} is too long`);
}

const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Email is required")
  .max(254, "Email is too long")
  .email("Enter a valid email address");

export const contactSchema = z.object({
  name: requiredText("Name"),
  email: emailField,
  subject: requiredText("Subject", 150),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long"),
});

export const newsletterSchema = z.object({
  email: emailField,
});

export const checkoutSchema = z.object({
  email: emailField,
  firstName: requiredText("First name"),
  lastName: requiredText("Last name"),
  address: requiredText("Street address", 200),
  city: requiredText("City"),
  postalCode: requiredText("Postal code", 20),
  country: z
    .string()
    .refine(
      (code) => SHIPPING_COUNTRIES.some((country) => country.code === code),
      "Select a country",
    ),
});

/** The cart as the browser sends it: only references, never prices. */
export const cartLinesSchema = z
  .array(
    z.object({
      productId: z.string(),
      size: z.string(),
      color: z.string(),
      quantity: z.number().int().min(1).max(MAX_QUANTITY_PER_ITEM),
    }),
  )
  .min(1, "Your cart is empty");