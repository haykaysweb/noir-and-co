import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/** Centers page content and keeps it a consistent width with side padding. */
export default function Container({ children, className }: ContainerProps) {
  return <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}