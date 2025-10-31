"use client";

import { motion } from "framer-motion";
import NeonButton from "@/components/ui/NeonButton";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { creatorTestimonials } from "@/data/creators-testimonials";

export default function SpotlightHero() {
  return (
    // Transparent wrapper; no section-wide overlays
    <section className="spotlight-hero hero-transparent relative isolate bg-transparent">
      <div className="container py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Left: Headline, subtext, CTAs */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-6xl font-extrabold leading-tight neon"
            >
              The Future of <span className="text-gradient">3D Assets</span>{" "}
              <span className="inline-block glitch" aria-hidden="true">
                |
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                delay: 0.05,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-5 text-lg text-zinc-300/85 max-w-2xl"
            >
              Curated, high‑quality models. A sleek, neon‑dark experience. Built
              for creators, studios, and teams.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                delay: 0.1,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-7 flex flex-wrap items-center gap-4"
            >
              <NeonButton as="a" href="/models" variant="primary">
                Browse Models
              </NeonButton>
              <NeonButton as="a" href="/dashboard/upload" variant="outline">
                Upload
              </NeonButton>
            </motion.div>

            {/* Trust chips (local glass only) */}
            <motion.ul
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                delay: 0.15,
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 grid grid-cols-2 gap-3 max-w-lg text-sm text-zinc-300/90"
            >
              <li className="glass rounded-lg px-3 py-2 border-glass">
                ✨ Instant previews
              </li>
              <li className="glass rounded-lg px-3 py-2 border-glass">
                🔒 Secure checkout
              </li>
              <li className="glass rounded-lg px-3 py-2 border-glass">
                🚀 Fast uploads
              </li>
              <li className="glass rounded-lg px-3 py-2 border-glass">
                🧩 Curated assets
              </li>
            </motion.ul>
          </div>

          {/* Right: Testimonials (local card surface only) */}
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="md:mt-1"
          >
            <AnimatedTestimonials
              testimonials={creatorTestimonials}
              interval={3500}
            />
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .glitch {
          animation: blink 2.2s steps(1) infinite;
          color: rgba(0, 236, 255, 0.9);
          text-shadow: 0 0 12px rgba(214, 89, 255, 0.6);
        }
        @keyframes blink {
          0%,
          96%,
          100% {
            opacity: 0;
          }
          97% {
            opacity: 1;
          }
          98% {
            opacity: 0;
          }
          99% {
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .glitch {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
