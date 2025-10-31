"use client";

import React from "react";

/**
 * HoverBorderGradient
 * - True ring-only neon border using CSS mask (no interior fill).
 * - Transparent inner by default (no backdrop blur).
 */
type HoverBorderGradientProps = {
  as?: "div" | "button" | "a";
  containerClassName?: string;
  className?: string;
  children: React.ReactNode;
};

export function HoverBorderGradient({
  as = "div",
  containerClassName = "",
  className = "",
  children,
}: HoverBorderGradientProps) {
  const Comp: any = as || "div";

  return (
    <div className={`relative inline-flex ${containerClassName}`}>
      {/* Neon ring (only the border is visible thanks to the mask) */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full p-[2px]"
        style={{
          background:
            "conic-gradient(from var(--angle), rgba(var(--primary),0.95), rgba(var(--secondary),0.95), rgba(var(--accent),0.95), rgba(var(--primary),0.95))",
          animation: "hbg-rotate 6s linear infinite",
          filter: "drop-shadow(0 0 10px rgba(var(--glow),0.55))",
          // Mask out the inner area so only a ring remains
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          borderRadius: "9999px",
        }}
      />
      {/* Transparent inner content (no blur, no background) */}
      <Comp
        className={`relative rounded-full px-4 py-2 text-white/92 ${className}`}
      >
        {children}
      </Comp>

      <style jsx global>{`
        @keyframes hbg-rotate {
          to {
            --angle: 360deg;
          }
        }
        :root {
          --angle: 0deg;
        }
      `}</style>
    </div>
  );
}

export default HoverBorderGradient;
