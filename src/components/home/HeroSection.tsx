import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { HERO_IMAGE } from "@/data/site-content";

export default function HeroSection() {
  return (
    // The layout pushes every page down to make room for the fixed header.
    // The negative top margin cancels that, so the photo reaches the very top of the screen.
    <section className="relative -mt-16 h-screen min-h-150 w-full overflow-hidden lg:-mt-20">
      <Image
        src={HERO_IMAGE}
        alt="Models wearing the Autumn / Winter collection"
        fill
        priority // The first thing people see: load it immediately.
        sizes="100vw"
        className="object-cover"
      />
      {/* Dark gradient so the white text stays readable on any photo */}
      <div className="absolute inset-0 bg-linear-to-b from-ink-900/30 via-ink-900/20 to-ink-900/50" />

      <div className="relative flex h-full items-center justify-center px-4">
        <div className="max-w-2xl animate-slide-up text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-sand-200">
            Autumn / Winter 2026
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-tight text-balance text-white sm:text-5xl lg:text-7xl">
            Quiet Luxury, Loudly Crafted
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
            Timeless pieces in premium materials. Designed to be worn for years, not seasons.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/shop" variant="light" className="group">
              Shop the Collection
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink href="/about" variant="outline">
              Our Story
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}