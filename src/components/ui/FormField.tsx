import type { ReactNode } from "react";

// Shared look for every text input, select and textarea in the store.
// aria-invalid:border-red-500 turns the border red when a field has an error.
export const inputClassName =
  "w-full rounded-lg border border-ink-200 bg-sand-50 px-4 py-3 text-sm text-ink-900 outline-none transition-colors focus:border-sand-500 aria-invalid:border-red-500";

type FormFieldProps = {
  label: string;
  /** Must match the id of the input inside, so clicking the label focuses it. */
  htmlFor: string;
  /** The validation message to show under the field. */
  error?: string;
  children: ReactNode;
  className?: string;
};

/** A label above a form control, with an error message below it. */
export default function FormField({ label, htmlFor, error, children, className }: FormFieldProps) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-xs font-medium uppercase tracking-wider text-ink-700"
      >
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}