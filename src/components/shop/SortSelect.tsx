"use client";

import { useQueryParams } from "@/hooks/useQueryParams";
import { SORT_OPTIONS } from "@/lib/constants";
import { SHOP_QUERY_KEYS } from "@/lib/shop-query";
import type { SortValue } from "@/lib/constants";

export default function SortSelect({ currentSort }: { currentSort: SortValue }) {
  const { setParam } = useQueryParams();

  function handleChange(newSort: string) {
    // "featured" is the default, so it does not need to appear in the URL.
    setParam(SHOP_QUERY_KEYS.sort, newSort === "featured" ? null : newSort);
  }

  return (
    <select
      value={currentSort}
      onChange={(event) => handleChange(event.target.value)}
      aria-label="Sort products"
      className="cursor-pointer rounded-lg border border-ink-200 bg-sand-50 px-3 py-2 text-sm font-medium text-ink-700 outline-none focus:border-sand-500"
    >
      {SORT_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}