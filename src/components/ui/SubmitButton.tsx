"use client";

import type { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button";

type SubmitButtonProps = Omit<ComponentProps<typeof Button>, "type" | "disabled"> & {
  /** Text shown while the form is being sent. */
  pendingLabel: string;
};

/** A submit button that disables itself and changes its text while the form is sending. */
export default function SubmitButton({ children, pendingLabel, ...buttonProps }: SubmitButtonProps) {
  // useFormStatus must be used in a component INSIDE the <form>.
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} {...buttonProps}>
      {pending ? pendingLabel : children}
    </Button>
  );
}