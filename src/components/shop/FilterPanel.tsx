"use client";

import { useId, type ReactNode } from "react";
import { useQueryParams } from "@/hooks/useQueryParams";
import { cn } from "@/lib/cn";
import { PRICE_RANGES } from "@/lib/constants";
import { SHOP_QUERY_KEYS } from "@/lib/shop-query";
import type { ProductColor } from "@/types/product";

type FilterPanelProps = {
  availableSizes: string[];
  availableColors: ProductColor[];
};

/** A titled block inside the panel ("Price", "Size", "Color"). */
function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink-900">{title}</h3>
      {children}
    </div>
  );
}

/**
 * The price, size and color filters.
 * Nothing is stored in React state: every choice is written to the URL, and the
 * selected values are read back from the URL. The server page then re-renders
 * with the matching products.
 */
export default function FilterPanel({ availableSizes, availableColors }: FilterPanelProps) {
  const { searchParams, setParam, toggleParamValue, removeParams } = useQueryParams();

  // useId gives this radio group a unique name, even though the panel can appear twice
  // on the page (desktop sidebar and mobile drawer).
  const priceGroupName = useId();

  const selectedPriceId = searchParams.get(SHOP_QUERY_KEYS.price) ?? "all";
  const selectedSizes = searchParams.getAll(SHOP_QUERY_KEYS.size);
  const selectedColors = searchParams.getAll(SHOP_QUERY_KEYS.color);

  return (
    <div className="space-y-8">
      <FilterGroup title="Price">
        <div className="space-y-3">
          {PRICE_RANGES.map((range) => (
            <label key={range.id} className="flex cursor-pointer items-center gap-2 text-sm text-ink-700">
              <input
                type="radio"
                name={priceGroupName}
                checked={selectedPriceId === range.id}
                onChange={() => setParam(SHOP_QUERY_KEYS.price, range.id === "all" ? null : range.id)}
                className="accent-ink-900"
              />
              {range.label}
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Size">
        <div className="flex flex-wrap gap-2">
          {availableSizes.map((size) => {
            const isSelected = selectedSizes.includes(size);

            return (
              <button
                key={size}
                type="button"
                onClick={() => toggleParamValue(SHOP_QUERY_KEYS.size, size)}
                aria-pressed={isSelected}
                className={cn(
                  "rounded-lg border px-3 py-2 text-xs font-medium transition-all",
                  isSelected
                    ? "border-ink-900 bg-ink-900 text-white"
                    : "border-ink-200 text-ink-700 hover:border-ink-400",
                )}
              >
                {size}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Color">
        <div className="flex flex-wrap gap-2">
          {availableColors.map((color) => {
            const isSelected = selectedColors.includes(color.name);

            return (
              <button
                key={color.name}
                type="button"
                onClick={() => toggleParamValue(SHOP_QUERY_KEYS.color, color.name)}
                aria-pressed={isSelected}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium text-ink-800 transition-all",
                  isSelected ? "border-sand-600 bg-sand-100" : "border-ink-200 hover:border-ink-400",
                )}
              >
                <span
                  className="inline-block h-4 w-4 rounded-full border border-ink-200"
                  style={{ backgroundColor: color.hex }}
                />
                {color.name}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      {/* Clears the three filters but keeps the chosen category and sort order. */}
      <button
        type="button"
        onClick={() =>
          removeParams([SHOP_QUERY_KEYS.price, SHOP_QUERY_KEYS.size, SHOP_QUERY_KEYS.color])
        }
        className="text-sm text-ink-500 underline transition-colors hover:text-ink-900"
      >
        Reset all filters
      </button>
    </div>
  );
}