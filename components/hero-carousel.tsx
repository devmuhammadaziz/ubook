"use client";

import type { GalleryImage } from "@/lib/data";
import { ArrowLeft, ArrowRight } from "iconsax-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function HeroCarousel({ images }: { images: GalleryImage[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const [index, setIndex] = useState(0);

  function go(next: number) {
    const el = scroller.current;
    const safe = (next + images.length) % images.length;
    if (!el) {
      setIndex(safe);
      return;
    }
    el.scrollTo({ left: safe * el.clientWidth, behavior: "smooth" });
    setIndex(safe);
  }

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const id = window.setInterval(() => {
      if (paused.current) return;
      setIndex((current) => {
        const next = (current + 1) % images.length;
        const el = scroller.current;
        if (el) el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
        return next;
      });
    }, 6500);
    return () => window.clearInterval(id);
  }, [images.length]);

  return (
    <div
      className="relative overflow-hidden rounded-[28px] bg-surface-2"
      onMouseEnter={() => {
        paused.current = true;
      }}
      onMouseLeave={() => {
        paused.current = false;
      }}
    >
      <div
        ref={scroller}
        className="flex aspect-[16/10] snap-x snap-mandatory overflow-x-auto scroller sm:aspect-[4/3]"
        onScroll={(event) => {
          const el = event.currentTarget;
          if (!el.clientWidth) return;
          setIndex(Math.round(el.scrollLeft / el.clientWidth));
        }}
      >
        {images.map((image, imageIndex) => (
          <div key={image.src} className="relative h-full min-w-full shrink-0 snap-start">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={imageIndex === 0}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/45 to-transparent" />
      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-1.5">
        {images.map((image, imageIndex) => (
          <button
            key={image.src}
            type="button"
            aria-label={`Show photo ${imageIndex + 1}`}
            onClick={() => go(imageIndex)}
            className={
              imageIndex === index
                ? "h-1.5 w-6 rounded-full bg-white"
                : "h-1.5 w-1.5 rounded-full bg-white/55"
            }
          />
        ))}
      </div>
      <button
        type="button"
        aria-label="Previous photo"
        onClick={() => go(index - 1)}
        className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/35 text-white backdrop-blur-sm md:grid"
      >
        <ArrowLeft size={18} color="currentColor" variant="Bold" aria-hidden />
      </button>
      <button
        type="button"
        aria-label="Next photo"
        onClick={() => go(index + 1)}
        className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/35 text-white backdrop-blur-sm md:grid"
      >
        <ArrowRight size={18} color="currentColor" variant="Bold" aria-hidden />
      </button>
    </div>
  );
}
