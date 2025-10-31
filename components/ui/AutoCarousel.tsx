"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselItem = {
  id: string;
  href?: string; // Clicking whole slide navigates here
  imageUrl?: string; // Optional banner image
  title?: string; // Optional overlay content
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  bg?: string; // Optional fallback CSS gradient/background
  element?: React.ReactNode; // Fully custom content slide
};

type AutoCarouselProps = {
  items: CarouselItem[];
  className?: string;
  interval?: number; // ms between slides
  autoPlay?: boolean;
  pauseOnHover?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
  height?: string; // Tailwind height classes, e.g., "h-64 md:h-96"
  draggable?: boolean;
  ariaLabel?: string;
};

function clampIndex(i: number, len: number) {
  if (len === 0) return 0;
  return (i + len) % len;
}

export default function AutoCarousel({
  items,
  className = "",
  interval = 4000,
  autoPlay = true,
  pauseOnHover = true,
  showArrows = true,
  showDots = true,
  height = "h-64 md:h-96",
  draggable = true,
  ariaLabel = "Promotional carousel",
}: AutoCarouselProps) {
  const len = items.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const goTo = (i: number) => setIndex(clampIndex(i, len));
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // Auto-advance
  useEffect(() => {
    if (!autoPlay || prefersReduced || len <= 1) return;
    if (pauseOnHover && paused) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [autoPlay, paused, interval, prefersReduced, len, index]);

  // Handle swipe drag end
  const handleDragEnd = (
    _: any,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const swipe = info.offset.x + info.velocity.x * 50; // combine distance + intent
    if (swipe < -50) next();
    else if (swipe > 50) prev();
  };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  const slides = useMemo(
    () =>
      items.map((item, i) => {
        const isActive = i === index;
        const content = item.element ?? (
          <div className="relative w-full h-full">
            {/* Image */}
            {item.imageUrl ? (
              <Image
                src={item.imageUrl}
                alt={item.title ?? "Banner"}
                fill
                priority={isActive}
                className="object-cover"
                sizes="100vw"
              />
            ) : (
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    item.bg ??
                    "radial-gradient(1200px 600px at 20% 0%, rgba(0,236,255,0.15), transparent 60%), radial-gradient(1000px 600px at 80% 100%, rgba(214,89,255,0.15), transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
                }}
              />
            )}

            {/* Overlay content */}
            {(item.title || item.subtitle || item.ctaText) && (
              <div className="relative z-10 h-full w-full">
                <div className="container h-full flex flex-col items-start justify-center gap-3">
                  {item.title && (
                    <h3 className="text-2xl md:text-4xl font-bold neon drop-shadow-sm">
                      {item.title}
                    </h3>
                  )}
                  {item.subtitle && (
                    <p className="max-w-xl text-zinc-300/85">{item.subtitle}</p>
                  )}
                  {item.ctaText && (
                    <div className="mt-2">
                      <Link
                        href={item.ctaHref ?? "#"}
                        className="btn-primary"
                        aria-label={item.ctaText}
                      >
                        {item.ctaText}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Soft gradient mask for text legibility */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(12,12,16,0.5) 0%, rgba(12,12,16,0.25) 35%, rgba(12,12,16,0.05) 60%, rgba(12,12,16,0) 100%)",
              }}
            />
          </div>
        );

        const Slide = (
          <div
            className={`relative shrink-0 w-full ${height} overflow-hidden rounded-xl glass`}
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${len}`}
          >
            {item.href ? (
              <Link href={item.href} className="absolute inset-0">
                {content}
              </Link>
            ) : (
              content
            )}
          </div>
        );

        return (
          <motion.div
            key={item.id}
            className="basis-full grow-0 shrink-0 px-1"
            initial={false}
            animate={{ scale: isActive ? 1 : 0.98 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            {Slide}
          </motion.div>
        );
      }),
    [items, index, len, height]
  );

  return (
    <section
      className={`relative ${className}`}
      role="region"
      aria-label={ariaLabel}
      aria-roledescription="carousel"
    >
      <div
        className="container"
        ref={containerRef}
        onMouseEnter={() => pauseOnHover && setPaused(true)}
        onMouseLeave={() => pauseOnHover && setPaused(false)}
      >
        <div className="relative">
          <motion.div
            className="flex"
            drag={draggable ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={{ x: `${-index * 100}%` }}
            transition={{
              duration: prefersReduced ? 0 : 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            role="group"
            aria-live="polite"
          >
            {slides}
          </motion.div>

          {/* Arrows */}
          {showArrows && len > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous slide"
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/40 border border-glass backdrop-blur px-2 py-2 text-zinc-200 hover:text-cyan-300 hover:shadow-[0_0_16px_rgba(0,236,255,0.35)] transition"
              >
                <ChevronLeft />
              </button>
              <button
                type="button"
                aria-label="Next slide"
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/40 border border-glass backdrop-blur px-2 py-2 text-zinc-200 hover:text-cyan-300 hover:shadow-[0_0_16px_rgba(0,236,255,0.35)] transition"
              >
                <ChevronRight />
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {showDots && len > 1 && (
          <div className="mt-3 flex items-center justify-center gap-2">
            {items.map((_, i) => {
              const active = i === index;
              return (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`h-2 w-2 rounded-full transition ${
                    active
                      ? "bg-cyan-300 shadow-[0_0_10px_rgba(0,236,255,0.8)]"
                      : "bg-white/30 hover:bg-white/60"
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
