"use client";

import Link from "next/link";
import HoverBorderGradient from "@/components/ui/hover-border-gradient";

export default function SiteBrand({ name = "ModelMart" }: { name?: string }) {
  return (
    <div className="fixed left-3 top-[0.75rem] md:left-4 md:top-[1.25rem] z-[60]">
      <Link href="/" aria-label={`${name} home`} className="block">
        <HoverBorderGradient
          as="div"
          containerClassName="rounded-full"
          className="flex items-center gap-2 text-sm md:text-base"
        >
          {/* Neon themed logo mark (transparent background) */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="brandStroke"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgb(var(--primary))" />
                <stop offset="60%" stopColor="rgb(var(--secondary))" />
                <stop offset="100%" stopColor="rgb(var(--accent))" />
              </linearGradient>
            </defs>
            <path
              d="M12 20 L32 8 L52 20 L52 44 L32 56 L12 44 Z M12 20 L32 32 L52 20 M32 32 L32 56"
              fill="none"
              stroke="url(#brandStroke)"
              strokeWidth="3.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              style={{
                filter:
                  "drop-shadow(0 0 6px rgba(0,236,255,0.6)) drop-shadow(0 0 10px rgba(214,89,255,0.45))",
              }}
            />
          </svg>
          <span className="tracking-wide neon">{name}</span>
        </HoverBorderGradient>
      </Link>
    </div>
  );
}
