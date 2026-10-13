"use server";

import { z } from "zod";
import { getStringValues, type FormState } from "@/lib/form-state";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validation";

export async function sendContactMessageAction(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const values = getStringValues(formData);

  const result = contactSchema.safeParse(values);
  if (!result.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: z.flattenError(result.error).fieldErrors,
      values,
    };
  }

  try {
    await prisma.contactMessage.create({ data: result.data });
  } catch (error) {
    console.error("Could not save contact message:", error);
    return {
      status: "error",
      message: "We couldn't send your message. Please try again.",
      values,
    };
  }

  return { status: "success", message: "Thank you for reaching out. We'll reply within 24 hours." };
}