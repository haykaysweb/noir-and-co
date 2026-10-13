"use server";

import { z } from "zod";
import { getStringValues, type FormState } from "@/lib/form-state";
import { prisma } from "@/lib/prisma";
import { newsletterSchema } from "@/lib/validation";

export async function subscribeToNewsletterAction(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const values = getStringValues(formData);

  const result = newsletterSchema.safeParse(values);
  if (!result.success) {
    return {
      status: "error",
      fieldErrors: z.flattenError(result.error).fieldErrors,
      values,
    };
  }

  try {
    // upsert = "create it, or do nothing if it already exists".
    // Subscribing twice with the same email is not an error.
    await prisma.newsletterSubscriber.upsert({
      where: { email: result.data.email },
      update: {},
      create: { email: result.data.email },
    });
  } catch (error) {
    console.error("Could not save subscriber:", error);
    return { status: "error", message: "Something went wrong. Please try again.", values };
  }

  return { status: "success", message: "Thank you for subscribing! Check your inbox for a welcome note." };
}