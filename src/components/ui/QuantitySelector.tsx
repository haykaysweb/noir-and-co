import { Minus, Plus } from "lucide-react";
import { MAX_QUANTITY_PER_ITEM } from "@/lib/constants";
import { cn } from "@/lib/cn";

type QuantitySelectorProps = {
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
};

/** The "− 2 +" control used in the cart drawer, cart page and product page. */
export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = MAX_QUANTITY_PER_ITEM,
  size = "md",
}: QuantitySelectorProps) {
  const buttonPadding = size === "sm" ? "p-1.5" : "p-3";
  const iconSize = size === "sm" ? 14 : 16;

  return (
    <div className="flex items-center rounded-lg border border-ink-200">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={cn(
          buttonPadding,
          "text-ink-600 transition-colors hover:text-ink-900 disabled:opacity-40",
        )}
      >
        <Minus size={iconSize} />
      </button>

      <span
        aria-live="polite"
        className={cn(
          "text-center text-sm font-medium text-ink-900",
          size === "sm" ? "min-w-6 px-2" : "min-w-8 px-3",
        )}
      >
        {value}
      </span>

      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={cn(
          buttonPadding,
          "text-ink-600 transition-colors hover:text-ink-900 disabled:opacity-40",
        )}
      >
        <Plus size={iconSize} />
      </button>
    </div>
  );
}