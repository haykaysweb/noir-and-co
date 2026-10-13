"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import FilterPanel from "@/components/shop/FilterPanel";
import { Button } from "@/components/ui/Button";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import type { ProductColor } from "@/types/product";

type MobileFilterDrawerProps = {
  availableSizes: string[];
  availableColors: ProductColor[];
  resultCount: number;
};

/** On phones the filters live in a drawer opened by a "Filters" button. */
export default function MobileFilterDrawer({
  availableSizes,
  availableColors,
  resultCount,
}: MobileFilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeDrawer = () => setIsOpen(false);

  useEscapeKey(closeDrawer, isOpen);
  useLockBodyScroll(isOpen);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 rounded-lg border border-ink-200 px-3 py-2 text-sm font-medium text-ink-700 lg:hidden"
      >
        <SlidersHorizontal size={16} />
        Filters
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-60 lg:hidden">
          <div className="absolute inset-0 animate-fade-in bg-ink-900/40" onClick={closeDrawer} />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
            className="absolute inset-y-0 left-0 w-80 max-w-[85vw] animate-slide-in-left overflow-y-auto bg-sand-50 shadow-xl"
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-ink-100 bg-sand-50 px-6 py-5">
              <h2 className="font-serif text-lg font-semibold text-ink-900">Filters</h2>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close filters"
                className="p-2 text-ink-600 hover:text-ink-900"
              >
                <X size={22} />
              </button>
            </div>

            <div className="px-6 py-6">
              <FilterPanel availableSizes={availableSizes} availableColors={availableColors} />
              <Button onClick={closeDrawer} fullWidth size="md" className="mt-6">
                Show {resultCount} {resultCount === 1 ? "result" : "results"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}