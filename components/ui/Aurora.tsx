"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Aurora() {
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

  const layers = [
    {
      color: "rgba(6, 182, 212, 0.3)",
      x: [0, 100, 0],
      y: [0, -50, 0],
      scale: [1, 1.2, 1],
      duration: 20,
    },
    {
      color: "rgba(236, 72, 153, 0.25)",
      x: [0, -80, 0],
      y: [0, 60, 0],
      scale: [1, 1.1, 1],
      duration: 25,
    },
    {
      color: "rgba(168, 85, 247, 0.2)",
      x: [0, 50, 0],
      y: [0, -40, 0],
      scale: [1, 1.15, 1],
      duration: 30,
    },
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 opacity-50">
        {layers.map((layer, i) => (
          <motion.div
            key={i}
            className="absolute top-0 left-1/2 w-[800px] h-[800px] rounded-full blur-[100px]"
            style={{
              background: `radial-gradient(circle, ${layer.color} 0%, transparent 70%)`,
              transform: "translate(-50%, -50%)",
            }}
            animate={
              prefersReducedMotion
                ? {}
                : {
                    x: layer.x,
                    y: layer.y,
                    scale: layer.scale,
                  }
            }
            transition={{
              duration: layer.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
