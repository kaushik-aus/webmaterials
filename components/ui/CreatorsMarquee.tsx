"use client";

import { creators } from "@/data/creators";
import { motion } from "framer-motion";

export function CreatorsMarquee() {
  return (
    <section className="py-12 overflow-hidden border-y border-white/10 relative">
      <div className="container mb-6">
        <motion.h2
          className="font-display text-2xl md:text-3xl text-center gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Featured Creators
        </motion.h2>
      </div>

      <div className="relative">
        {/* Enhanced gradient fade with neon glow */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10"
          style={{
            background:
              "linear-gradient(to right, rgba(10, 10, 15, 1) 0%, rgba(10, 10, 15, 0.8) 50%, transparent 100%)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10"
          style={{
            background:
              "linear-gradient(to left, rgba(10, 10, 15, 1) 0%, rgba(10, 10, 15, 0.8) 50%, transparent 100%)",
          }}
        />

        {/* Glow trail effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full blur-[60px] opacity-30"
            style={{
              background: "radial-gradient(circle, rgba(6, 182, 212, 0.6), transparent)",
              animation: "pulse 3s ease-in-out infinite",
            }}
          />
        </div>

        {/* Marquee container */}
        <div className="marquee-container">
          <div className="marquee-content">
            {/* Duplicate creators for seamless loop */}
            {[...creators, ...creators].map((creator, idx) => (
              <div
                key={`${creator.handle}-${idx}`}
                className="inline-flex items-center gap-3 mx-6 whitespace-nowrap group"
              >
                <div className="relative">
                  <img
                    src={creator.avatarUrl}
                    alt={`${creator.name} avatar`}
                    className="w-12 h-12 rounded-full border-2 border-cyan-400/50 transition-all duration-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.6)]"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <div className="font-semibold text-ink">{creator.name}</div>
                  <div className="text-sm text-muted">{creator.handle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-container {
          display: flex;
          overflow: hidden;
        }

        .marquee-content {
          display: flex;
          animation: marquee 30s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-content {
            animation: marquee 120s linear infinite;
          }
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }
      `}</style>
    </section>
  );
}
