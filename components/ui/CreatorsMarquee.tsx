"use client";

import { creators } from "@/data/creators";

export function CreatorsMarquee() {
  return (
    <section className="py-12 overflow-hidden border-y border-muted/60">
      <div className="container mb-4">
        <h2 className="font-display text-2xl md:text-3xl text-center">
          Featured Creators
        </h2>
      </div>

      <div className="relative">
        {/* Gradient fade on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-paper to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-paper to-transparent z-10" />

        {/* Marquee container */}
        <div className="marquee-container">
          <div className="marquee-content">
            {/* Duplicate creators for seamless loop */}
            {[...creators, ...creators].map((creator, idx) => (
              <div
                key={`${creator.handle}-${idx}`}
                className="inline-flex items-center gap-3 mx-6 whitespace-nowrap"
              >
                <img
                  src={creator.avatarUrl}
                  alt={`${creator.name} avatar`}
                  className="w-12 h-12 rounded-full bg-white border-2 border-muted/60"
                />
                <div>
                  <div className="font-semibold">{creator.name}</div>
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
            animation: none;
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
      `}</style>
    </section>
  );
}
