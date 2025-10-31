"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { NeonButton } from "./NeonButton";
import { useEffect, useState } from "react";

export function SpotlightHero() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Enhanced neon gradient spotlight background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(ellipse at 50% 0%, rgba(6, 182, 212, 0.4) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 50%, rgba(168, 85, 247, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse at 20% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      <div className="container py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="font-display text-5xl md:text-6xl lg:text-7xl leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="gradient-text text-glow-cyan">Premium 3D Models</span>
            <br />
            <span className="text-ink">for</span>{" "}
            <span className="relative inline-block">
              <span className="text-ink">Creators</span>
              {!prefersReducedMotion && (
                <motion.span
                  className="absolute inset-0 text-cyan-400"
                  style={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{
                    clipPath: [
                      "inset(0 100% 0 0)",
                      "inset(0 0 0 0)",
                      "inset(0 100% 0 0)",
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut",
                  }}
                >
                  Creators
                </motion.span>
              )}
            </span>
          </motion.h1>

          <motion.p
            className="text-muted mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            Discover high-quality 3D assets from talented artists. Preview live
            in 3D, purchase securely, and download instantly. Built for game
            developers, designers, and creative professionals.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <Link href="/models">
              <NeonButton variant="primary" ariaLabel="Browse all 3D models">
                Browse Models
              </NeonButton>
            </Link>
            <Link href="/dashboard/upload">
              <NeonButton variant="outline" ariaLabel="Upload your 3D models">
                Upload Model
              </NeonButton>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
