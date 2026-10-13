import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { ABOUT_IMAGE, ABOUT_STATS, ABOUT_VALUES } from "@/data/site-content";

export const metadata: Metadata = {
  title: "About",
  description: "Our story, our materials and the people who make our pieces.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero image */}
      <section className="relative h-100 overflow-hidden lg:h-125">
        <Image
          src={ABOUT_IMAGE}
          alt="Inside the NOIR & CO boutique"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink-900/40" />
        <div className="relative flex h-full items-center justify-center px-4 text-center">
          <div className="max-w-2xl animate-slide-up">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-sand-200">Our Story</p>
            <h1 className="font-serif text-4xl font-semibold text-balance text-white lg:text-6xl">
              Designed with Intention
            </h1>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-24">
        <p className="text-lg leading-relaxed text-balance text-ink-700 lg:text-xl">
          NOIR &amp; CO was born from a simple belief: that luxury should be quiet, considered, and
          built to last. We create timeless pieces in premium materials, designed to be worn,
          loved, and passed on.
        </p>
      </section>

      {/* Numbers */}
      <section className="bg-sand-100 py-12 lg:py-16">
        <Container>
          <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {ABOUT_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <dd className="font-serif text-3xl font-semibold text-sand-800 lg:text-5xl">
                  {stat.value}
                </dd>
                <dt className="mt-2 text-xs uppercase tracking-wider text-ink-500">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Principles */}
      <section>
        <Container className="py-16 lg:py-24">
          <SectionHeading
            eyebrow="What We Stand For"
            title="Our Principles"
            align="center"
            className="mb-12"
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
            {ABOUT_VALUES.map((value) => (
              <div key={value.title} className="text-center">
                <h3 className="mb-3 font-serif text-xl font-semibold text-ink-900">{value.title}</h3>
                <p className="text-sm leading-relaxed text-ink-600">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Call to action */}
      <section>
        <Container className="pb-16 lg:pb-24">
          <div className="rounded-2xl bg-ink-900 px-6 py-12 text-center lg:px-16 lg:py-16">
            <h2 className="mb-4 font-serif text-3xl font-semibold text-white lg:text-4xl">
              Explore the Collection
            </h2>
            <p className="mx-auto mb-8 max-w-md text-sm text-ink-300">
              Discover pieces designed to be worn for years, not seasons.
            </p>
            <ButtonLink href="/shop" variant="light" className="group">
              Shop Now
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}