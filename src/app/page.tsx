import CategoryTiles from "@/components/home/CategoryTiles";
import HeroSection from "@/components/home/HeroSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import ProductShowcase from "@/components/home/ProductShowcase";
import PromoBanner from "@/components/home/PromoBanner";
import { getFeaturedProducts, getNewArrivals } from "@/lib/products";

// The home page is only a list of sections. Each section is its own component.
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryTiles />
      <ProductShowcase eyebrow="Curated" title="Featured Products" products={getFeaturedProducts()} />
      <PromoBanner />
      <ProductShowcase eyebrow="Just In" title="New Arrivals" products={getNewArrivals()} />
      <NewsletterSection />
    </>
  );
}