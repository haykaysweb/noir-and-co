"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, X } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { cn } from "@/lib/cn";
import { NAV_LINKS } from "@/lib/constants";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

/** The slide-in navigation drawer shown on phones and tablets. */
export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const { wishlistIds } = useShop();

  // Hooks must run on every render, so they come BEFORE the early return below.
  useEscapeKey(onClose, isOpen);
  useLockBodyScroll(isOpen);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 lg:hidden">
      {/* Dark backdrop: clicking it closes the menu */}
      <div className="absolute inset-0 animate-fade-in bg-ink-900/40" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className="absolute inset-y-0 left-0 flex w-72 animate-slide-in-left flex-col bg-sand-50 p-6 shadow-xl"
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="font-serif text-lg font-semibold text-ink-900">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 text-ink-700 hover:text-sand-600"
          >
            <X size={22} />
          </button>
        </div>

        <nav aria-label="Mobile navigation">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "block border-b border-ink-100 py-3 text-base font-medium transition-colors",
                    pathname === link.href
                      ? "text-sand-700"
                      : "text-ink-800 hover:text-sand-600",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/wishlist"
                onClick={onClose}
                className="flex items-center gap-2 border-b border-ink-100 py-3 text-base font-medium text-ink-800 transition-colors hover:text-sand-600"
              >
                <Heart size={18} /> Wishlist ({wishlistIds.length})
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}