import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { PROMO_IMAGE } from "@/data/site-content";

export default function PromoBanner() {
  return (
    <section className="relative my-16 h-100 overflow-hidden lg:my-24 lg:h-125">
      <Image
        src={PROMO_IMAGE}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink-900/40" />

      <div className="relative flex h-full items-center justify-center px-4 text-center">
        <div className="max-w-lg">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-sand-200">Limited Time</p>
          <h2 className="font-serif text-3xl font-semibold text-balance text-white lg:text-5xl">
            Up to 30% Off Autumn Essentials
          </h2>
          <p className="mb-6 mt-4 text-sm text-white/70">
            Selected pieces from our clothing and accessories collections.
          </p>
          <ButtonLink href="/shop" variant="light" className="group">
            Shop the Sale
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}