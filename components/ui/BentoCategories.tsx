"use client";

import Link from "next/link";
import Section from "./Section";
import GlassCard from "./GlassCard";
import { categories } from "@/data/categories";

export default function BentoCategories() {
  return (
    <Section className="py-8">
      <div className="container">
        <h2 className="text-xl text-zinc-300 mb-3">Explore</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {categories.map((c, idx) => (
            <GlassCard
              key={c.slug}
              className="group relative overflow-hidden p-5"
            >
              <Link href={`/models?category=${c.slug}`} className="block">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{c.emoji}</div>
                  <div className="font-semibold tracking-wide">{c.title}</div>
                </div>
                <p className="mt-2 text-sm text-zinc-400/85">{c.description}</p>
                <div
                  className="absolute -right-8 -bottom-8 h-28 w-28 rounded-full opacity-30 blur-2xl"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(0,236,255,0.4), transparent)",
                  }}
                />
              </Link>
            </GlassCard>
          ))}
        </div>
      </div>
    </Section>
  );
}
