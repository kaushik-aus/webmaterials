"use client";

import { useIntersectionFade } from "@/hooks/useIntersectionFade";

export default function FeatureBlock() {
  const { ref, isVisible } = useIntersectionFade();

  return (
    <section className="container py-16 md:py-24">
      <div
        ref={ref}
        className={`fade-in-section ${isVisible ? "show" : ""} text-center max-w-3xl mx-auto`}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-ink mb-6">
          The Future of 3D Assets
        </h2>
        <p className="text-lg text-dim leading-relaxed">
          Discover an ever-growing library of premium 3D models designed for
          games, animation, VR experiences, and more. Every asset is crafted
          with attention to detail, optimized for performance, and ready to
          integrate into your workflow. Join thousands of creators who trust
          ModelMart for their 3D asset needs.
        </p>
      </div>
    </section>
  );
}
