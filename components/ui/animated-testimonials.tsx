"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export type Artwork = {
  src: string;
  alt?: string;
  href?: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  designation?: string;
  src?: string; // avatar
  artworks?: Artwork[]; // NEW: gallery items
};

type AnimatedTestimonialsProps = {
  testimonials: Testimonial[];
  interval?: number; // ms between rotations
  pauseOnHover?: boolean;
  className?: string;
};

export function AnimatedTestimonials({
  testimonials,
  interval = 3500,
  pauseOnHover = true,
  className = "",
}: AnimatedTestimonialsProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const len = testimonials.length;

  const next = () => setIndex((i) => (i + 1) % len);
  const prev = () => setIndex((i) => (i - 1 + len) % len);

  useEffect(() => {
    if (reduce || len <= 1 || (pauseOnHover && paused)) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [reduce, len, paused, interval, index]);

  const current = useMemo(() => testimonials[index], [testimonials, index]);

  return (
    <section
      className={`relative ${className}`}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
      aria-label="Creator testimonials"
    >
      <div className="glass rounded-2xl p-5 md:p-6 border-glass shadow-[0_0_24px_rgba(0,236,255,0.15)]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm uppercase tracking-wider text-zinc-400">
            What creators say
          </h3>
          <div className="flex gap-1.5" aria-hidden>
            <button
              className="h-6 w-6 grid place-items-center rounded-md bg-black/30 border border-glass text-zinc-300 hover:text-cyan-300 transition"
              onClick={prev}
              aria-label="Previous testimonial"
            >
              ‹
            </button>
            <button
              className="h-6 w-6 grid place-items-center rounded-md bg-black/30 border border-glass text-zinc-300 hover:text-cyan-300 transition"
              onClick={next}
              aria-label="Next testimonial"
            >
              ›
            </button>
          </div>
        </div>

        {/* Quote area (unchanged) */}
        <div className="relative h-[220px] md:h-[240px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
              transition={{
                duration: reduce ? 0 : 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute inset-0"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  {current.src ? (
                    <Image
                      src={current.src}
                      alt={current.name}
                      width={56}
                      height={56}
                      className="rounded-full object-cover ring-1 ring-white/10"
                      unoptimized
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-full bg-cyan-500/30 grid place-items-center text-lg">
                      ✨
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <blockquote className="text-zinc-200/95 leading-relaxed">
                    “{current.quote}”
                  </blockquote>
                  <div className="mt-3 text-sm text-zinc-400">
                    <span className="text-zinc-200">{current.name}</span>
                    {current.designation ? ` · ${current.designation}` : null}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Artworks gallery (NEW) */}
        {!!current.artworks?.length && (
          <div className="mt-5">
            <h4 className="sr-only">Artworks by {current.name}</h4>

            {/* Mobile: horizontal scroll with snap */}
            <div className="md:hidden -mx-1 overflow-x-auto pb-1">
              <div className="flex gap-2 px-1 snap-x snap-mandatory">
                {current.artworks.slice(0, 10).map((art, i) => (
                  <a
                    key={i}
                    href={art.href || "#"}
                    className="group relative snap-start rounded-lg overflow-hidden ring-1 ring-white/10 bg-zinc-900/40 hover:ring-cyan-400/50 transition-shadow"
                    aria-label={art.alt || `Artwork ${i + 1}`}
                  >
                    <div className="relative h-24 w-36">
                      <Image
                        src={art.src}
                        alt={art.alt || ""}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                        sizes="40vw"
                        unoptimized
                      />
                    </div>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 shadow-[0_0_0_0_rgba(0,0,0,0)] group-hover:shadow-[0_0_18px_rgba(0,236,255,0.35)] transition-shadow"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Desktop: 4-column grid */}
            <div className="hidden md:grid grid-cols-4 gap-2">
              {current.artworks.slice(0, 8).map((art, i) => (
                <a
                  key={i}
                  href={art.href || "#"}
                  className="group relative rounded-lg overflow-hidden ring-1 ring-white/10 bg-zinc-900/40 hover:ring-cyan-400/50 transition-shadow"
                  aria-label={art.alt || `Artwork ${i + 1}`}
                >
                  <div className="relative h-24 w-full">
                    <Image
                      src={art.src}
                      alt={art.alt || ""}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                      sizes="(min-width: 768px) 25vw, 90vw"
                      unoptimized
                    />
                  </div>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 shadow-[0_0_0_0_rgba(0,0,0,0)] group-hover:shadow-[0_0_18px_rgba(0,236,255,0.35)] transition-shadow"
                  />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Dots (unchanged) */}
        {len > 1 && (
          <div className="mt-4 flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 w-4 rounded-full transition ${
                  i === index
                    ? "bg-cyan-300 shadow-[0_0_10px_rgba(0,236,255,0.6)]"
                    : "bg-white/25 hover:bg-white/45"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
