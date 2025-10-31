"use client";

import { useEffect, useRef } from "react";

export function GlowGrid() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    let animationFrameId: number;
    let scrollY = 0;

    const animate = () => {
      scrollY += 0.2;
      if (canvasRef.current) {
        canvasRef.current.style.transform = `translateY(${scrollY % 100}px)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          maskImage: "radial-gradient(ellipse at center, transparent 20%, black 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, transparent 20%, black 80%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(6, 182, 212, 0.15), transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.15), transparent 40%)
          `,
        }}
      />
    </div>
  );
}
