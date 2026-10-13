import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/product/ProductGallery";
import ProductGrid from "@/components/product/ProductGrid";
import ProductPurchasePanel from "@/components/product/ProductPurchasePanel";
import Container from "@/components/ui/Container";
import { products } from "@/data/products";
import { FREE_SHIPPING_THRESHOLD, SITE_URL } from "@/lib/constants";
import { formatPrice } from "@/lib/format";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";

// In Next.js 15 and newer, params is a Promise, so we await it.
type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Tells Next.js which product pages exist, so it can build every one of them
 * ahead of time (static generation). Static pages load almost instantly.
 */
export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

/** Sets the page title, description and social-sharing tags for each product. */
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return { title: "Product not found" };

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

const TRUST_POINTS = [
  { label: "Shipping", value: `Free over ${formatPrice(FREE_SHIPPING_THRESHOLD)}` },
  { label: "Returns", value: "30-day policy" },
  { label: "Authentic", value: "Guaranteed" },
];

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  // No product with this slug: show the 404 page (app/not-found.tsx).
  if (!product) notFound();

  const relatedProducts = getRelatedProducts(product);

  // Structured data helps Google show price and availability in search results.
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    category: product.category,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price,
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/shop/${product.slug}`,
    },
  };

  return (
    <>
      {/* Breadcrumb */}
      <Container className="pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-ink-400">
          <Link href="/" className="transition-colors hover:text-ink-700">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href={`/shop?category=${product.category}`}
            className="transition-colors hover:text-ink-700"
          >
            {product.category}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-ink-700">{product.name}</span>
        </nav>
      </Container>

      {/* Main section: gallery on the left, details on the right */}
      <Container className="py-8 lg:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* key={product.id} makes React start fresh (selected photo, size, color,
              quantity) whenever you move from one product to another. */}
          <ProductGallery key={product.id} images={product.images} productName={product.name} />

          <div className="lg:pt-4">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-sand-600">
              {product.category}
            </p>
            <h1 className="mb-3 font-serif text-3xl font-semibold text-ink-900 lg:text-4xl">
              {product.name}
            </h1>
            <p className="mb-6 text-2xl font-semibold text-ink-800">{formatPrice(product.price)}</p>
            <p className="mb-8 text-sm leading-relaxed text-ink-600">{product.description}</p>

            <ProductPurchasePanel key={product.id} product={product} />

            <dl className="grid grid-cols-3 gap-4 border-t border-ink-100 pt-6 text-center">
              {TRUST_POINTS.map((point) => (
                <div key={point.label}>
                  <dt className="mb-1 text-xs uppercase tracking-wider text-ink-400">{point.label}</dt>
                  <dd className="text-xs text-ink-700">{point.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section>
          <Container className="py-12 lg:py-16">
            <h2 className="mb-8 text-center font-serif text-2xl font-semibold text-ink-900 lg:text-3xl">
              You May Also Like
            </h2>
            <ProductGrid products={relatedProducts} columns="four" />
          </Container>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
    </>
  );
}