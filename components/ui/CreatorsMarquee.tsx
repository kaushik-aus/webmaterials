"use client";

import Image from "next/image";
import Section from "./Section";
import { creators } from "@/data/creators";

export default function CreatorsMarquee() {
  return (
    <Section className="py-10">
      <div className="container">
        <h2 className="text-xl text-zinc-300 mb-3">Featured Creators</h2>
      </div>
      <div className="relative overflow-hidden">
        <div className="marquee flex gap-8 py-4">
          {[...creators, ...creators].map((c, i) => (
            <div
              key={`${c.handle}-${i}`}
              className="glass rounded-full px-4 py-2 flex items-center gap-3 border-glass"
            >
              {c.avatarUrl ? (
                <Image
                  src={c.avatarUrl}
                  alt={c.name}
                  width={28}
                  height={28}
                  className="rounded-full"
                />
              ) : (
                <div className="h-7 w-7 rounded-full bg-cyan-500/30 grid place-items-center text-sm">
                  {c.emoji ?? "✨"}
                </div>
              )}
              <span className="text-sm text-zinc-300">{c.name}</span>
              <span className="text-xs text-zinc-400">{c.handle}</span>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .marquee {
          width: max-content;
          animation: scroll 28s linear infinite;
        }
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee {
            animation: none;
          }
        }
      `}</style>
    </Section>
  );
}
