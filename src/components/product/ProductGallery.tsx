"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

type ProductGalleryProps = {
  images: string[];
  productName: string;
};

/** The large product photo with clickable thumbnails. */
export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col-reverse gap-4 lg:flex-row">
      {/* Thumbnails: a row under the photo on phones, a column beside it on desktop */}
      <div className="flex gap-3 lg:flex-col">
        {images.map((imageUrl, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={imageUrl}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show photo ${index + 1} of ${images.length}`}
              aria-current={isActive}
              className={cn(
                "relative h-20 w-16 overflow-hidden rounded-lg border-2 transition-colors lg:h-24 lg:w-20",
                isActive ? "border-sand-600" : "border-transparent hover:border-ink-200",
              )}
            >
              <Image src={imageUrl} alt="" fill sizes="80px" className="object-cover" />
            </button>
          );
        })}
      </div>

      {/* Main photo */}
      <div className="relative aspect-3/4 overflow-hidden rounded-lg bg-ink-100 lg:flex-1">
        <Image
          src={images[activeIndex]}
          alt={`${productName}, photo ${activeIndex + 1}`}
          fill
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}