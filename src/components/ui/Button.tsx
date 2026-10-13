import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "light" | "outline";
type ButtonSize = "md" | "lg";

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-ink-900 text-white hover:bg-sand-700", // dark button
  light: "bg-sand-50 text-ink-900 hover:bg-sand-200", // for use on photos / dark areas
  outline: "border border-white/40 text-white hover:bg-white/10", // for use on photos
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  md: "px-6 py-3.5",
  lg: "px-8 py-4",
};

type StyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

function getButtonClasses({
  variant = "primary",
  size = "lg",
  fullWidth = false,
  className,
}: Omit<StyleProps, "children">) {
  return cn(
    BASE_CLASSES,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    fullWidth && "w-full",
    className,
  );
}

// A real <button>. Use it for actions (add to cart, submit a form).
type ButtonProps = StyleProps & Omit<ComponentProps<"button">, keyof StyleProps>;

export function Button({
  variant,
  size,
  fullWidth,
  className,
  children,
  type = "button",
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      type={type}
      className={getButtonClasses({ variant, size, fullWidth, className })}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

// A link that looks like a button. Use it for navigation (go to /shop).
type ButtonLinkProps = StyleProps & Omit<ComponentProps<typeof Link>, keyof StyleProps>;

export function ButtonLink({
  variant,
  size,
  fullWidth,
  className,
  children,
  ...linkProps
}: ButtonLinkProps) {
  return (
    <Link className={getButtonClasses({ variant, size, fullWidth, className })} {...linkProps}>
      {children}
    </Link>
  );
}