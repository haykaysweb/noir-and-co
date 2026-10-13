/** What every form action returns to its form. */
export type FormState = {
  status: "idle" | "success" | "error";
  /** A message for the whole form (success text or a general error). */
  message?: string;
  /** Set after a successful checkout. */
  orderNumber?: string;
  /** Error messages per field name, e.g. { email: ["Enter a valid email address"] } */
  fieldErrors?: Record<string, string[] | undefined>;
  /** What the person typed, so the fields can be refilled after an error. */
  values?: Record<string, string>;
};

export const initialFormState: FormState = { status: "idle" };

/** Turns FormData into a plain object, skipping Next.js internals and the hidden cart field. */
export function getStringValues(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {};

  for (const [key, value] of formData.entries()) {
    const isInternalField = key.startsWith("$") || key === "cart";
    if (typeof value === "string" && !isInternalField) {
      values[key] = value;
    }
  }

  return values;
}