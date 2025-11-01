"use client";

import { useIntersectionFade } from "@/hooks/useIntersectionFade";

/**
 * Feature section with scroll-based reveal animation.
 * Fades in and slides up when it enters the viewport.
 */
export default function FeatureBlock() {
  const ref = useIntersectionFade();

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="reveal text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The Future of 3D Assets
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Discover a curated collection of premium 3D models, textures, and environments
            designed with anime aesthetics in mind. Our marketplace brings together the best
            creators to deliver stunning assets that elevate your projects to the next level.
            Experience seamless browsing, instant downloads, and a community-driven platform
            that puts quality first.
          </p>
        </div>
      </div>
    </section>
  );
}
