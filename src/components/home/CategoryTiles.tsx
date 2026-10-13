import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { CATEGORY_TILES } from "@/data/site-content";

export default function CategoryTiles() {
  return (
    <section>
      <Container className="py-16 lg:py-24">
        <SectionHeading eyebrow="Explore" title="Shop by Category" align="center" className="mb-10" />

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
          {CATEGORY_TILES.map((tile) => (
            <li key={tile.name}>
              <Link
                href={`/shop?category=${tile.name}`}
                className="group relative block aspect-4/5 overflow-hidden rounded-lg"
              >
                <Image
                  src={tile.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink-900/60 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="mb-1 font-serif text-2xl font-semibold text-white">{tile.name}</h3>
                  <p className="mb-3 text-sm text-white/70">{tile.description}</p>
                  <span className="inline-flex items-center gap-1 border-b border-white/40 pb-1 text-sm font-medium text-white transition-colors group-hover:border-sand-300 group-hover:text-sand-200">
                    Discover
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}