import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Usually a button or link that tells the person what to do next. */
  action?: ReactNode;
  iconSize?: number;
  className?: string;
};

/** Shown when a list is empty: empty cart, empty wishlist, no search results. */
export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  iconSize = 56,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center px-4 py-16 text-center", className)}>
      <Icon size={iconSize} className="mb-6 text-ink-300" aria-hidden="true" />
      <h2 className="mb-2 font-serif text-2xl font-semibold text-ink-900">{title}</h2>
      <p className="mb-8 max-w-sm text-sm text-ink-500">{description}</p>
      {action}
    </div>
  );
}