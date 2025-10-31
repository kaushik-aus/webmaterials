"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { categories } from "@/data/categories";
import { GlassCard } from "./GlassCard";
import { useEffect, useState } from "react";

export function BentoCategories() {
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

  const glowColors: Array<"cyan" | "magenta" | "purple"> = [
    "cyan",
    "magenta",
    "purple",
    "cyan",
  ];

  return (
    <section className="container py-12">
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-display text-3xl md:text-4xl gradient-text mb-2">
          Explore by Category
        </h2>
        <p className="text-muted">Find the perfect asset for your project</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category, idx) => (
          <motion.div
            key={category.slug}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <Link href={`/models?category=${category.slug}`}>
              <GlassCard
                glowColor={glowColors[idx % glowColors.length]}
                className="p-6 text-center cursor-pointer group"
              >
                <motion.div
                  className="text-4xl mb-3"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {category.emoji}
                </motion.div>
                <div className="font-semibold text-lg text-ink">
                  {category.title}
                </div>
              </GlassCard>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
