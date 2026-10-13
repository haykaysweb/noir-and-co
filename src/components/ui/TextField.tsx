import FormField, { inputClassName } from "@/components/ui/FormField";
import { cn } from "@/lib/cn";
import type { FormState } from "@/lib/form-state";

type TextFieldProps = {
  /** Used as the input's id AND name, and as the key into the form state. */
  name: string;
  label: string;
  /** The current form state, which holds the error message and the typed value. */
  state: FormState;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  className?: string;
  /** Pass a number of rows to render a textarea instead of an input. */
  rows?: number;
};

/** A label, an input (or textarea) and its error message, wired to the form state. */
export default function TextField({
  name,
  label,
  state,
  type = "text",
  autoComplete,
  placeholder,
  className,
  rows,
}: TextFieldProps) {
  const error = state.fieldErrors?.[name]?.[0];

  // These inputs are uncontrolled: the browser holds what you type.
  // defaultValue refills them with what you typed if the server found an error.
  const sharedProps = {
    id: name,
    name,
    placeholder,
    defaultValue: state.values?.[name] ?? "",
    "aria-invalid": Boolean(error),
  };

  return (
    <FormField label={label} htmlFor={name} error={error} className={className}>
      {rows ? (
        <textarea {...sharedProps} rows={rows} className={cn(inputClassName, "resize-none")} />
      ) : (
        <input {...sharedProps} type={type} autoComplete={autoComplete} className={inputClassName} />
      )}
    </FormField>
  );
}