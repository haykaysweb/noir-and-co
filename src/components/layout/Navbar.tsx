"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag } from "lucide-react";
import MobileMenu from "@/components/layout/MobileMenu";
import SearchOverlay from "@/components/layout/SearchOverlay";
import { useShop } from "@/context/ShopContext";
import { cn } from "@/lib/cn";
import { NAV_LINKS } from "@/lib/constants";

/** The small number on top of the cart and wishlist icons. */
function CountBadge({ count }: { count: number }) {
  if (count === 0) return null;

  return (
    <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-sand-600 text-[10px] font-medium text-white">
      {count}
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount, wishlistIds, openCart } = useShop();

  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Give the header a solid background once the page has been scrolled a little.
  useEffect(() => {
    function handleScroll() {
      setHasScrolled(window.scrollY > 20);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // On the home page the header sits on top of the dark hero photo, so it uses white text
  // until the page is scrolled.
  const isOverHero = pathname === "/" && !hasScrolled;

  const iconClasses = cn(
    "relative p-2 transition-colors",
    isOverHero ? "text-white hover:text-sand-200" : "text-ink-700 hover:text-sand-600",
  );

  // "/shop/tailored-wool-coat" should still highlight the "Shop" link.
  function isActiveLink(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          hasScrolled ? "bg-sand-50/95 shadow-sm backdrop-blur-md" : "bg-transparent",
        )}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8"
        >
          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            className={cn("-ml-2 lg:hidden", iconClasses)}
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <Link
            href="/"
            className={cn(
              "font-serif text-xl font-semibold tracking-tight transition-colors lg:text-2xl",
              isOverHero ? "text-white" : "text-ink-900 hover:text-sand-700",
            )}
          >
            NOIR <span className={isOverHero ? "text-sand-300" : "text-sand-600"}>&</span> CO
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = isActiveLink(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group relative text-sm font-medium tracking-wide transition-colors",
                      isOverHero
                        ? "text-white hover:text-sand-200"
                        : isActive
                          ? "text-sand-700"
                          : "text-ink-700 hover:text-sand-600",
                    )}
                  >
                    {link.label}
                    {/* The thin underline: full width when active, grows on hover. */}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-px bg-sand-500 transition-all duration-300",
                        isActive ? "w-full" : "w-0 group-hover:w-full",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right-hand icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className={iconClasses}
            >
              <Search size={20} />
            </button>

            <Link
              href="/wishlist"
              aria-label={`Wishlist, ${wishlistIds.length} items`}
              className={cn("hidden sm:block", iconClasses)}
            >
              <Heart size={20} />
              <CountBadge count={wishlistIds.length} />
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label={`Open cart, ${cartCount} items`}
              className={iconClasses}
            >
              <ShoppingBag size={20} />
              <CountBadge count={cartCount} />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}