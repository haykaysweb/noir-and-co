import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import CartDrawer from "@/components/cart/CartDrawer";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { ShopProvider } from "@/context/ShopContext";
import { SITE_URL, STORE_NAME, STORE_TAGLINE } from "@/lib/constants";

// next/font downloads the fonts at build time and serves them from your own domain:
// no request to Google at runtime, and no layout shift while the font loads.
// "variable" gives each font a CSS variable that globals.css connects to font-sans / font-serif.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

// Default SEO tags. Individual pages override the title with their own
// ("Shop | NOIR & CO") through the template below.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${STORE_NAME} — Modern Luxury`,
    template: `%s | ${STORE_NAME}`,
  },
  description: STORE_TAGLINE,
  openGraph: {
    type: "website",
    siteName: STORE_NAME,
    title: `${STORE_NAME} — Modern Luxury`,
    description: STORE_TAGLINE,
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body className="flex min-h-screen flex-col">
        <ShopProvider>
          {/* Lets keyboard users skip past the navigation. Invisible until focused. */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
          >
            Skip to content
          </a>

          <Navbar />

          {/* The header is fixed to the top, so every page starts below it.
              (The home page hero cancels this with a negative margin.) */}
          <main id="main-content" className="flex-1 pt-16 lg:pt-20">
            {children}
          </main>

          <Footer />
          <CartDrawer />
        </ShopProvider>
      </body>
    </html>
  );
}