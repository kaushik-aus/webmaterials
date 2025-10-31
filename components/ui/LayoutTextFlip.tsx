"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type LayoutTextFlipProps = {
  text?: string; // Optional prefix like "Welcome to "
  words: string[]; // Words to cycle through
  interval?: number; // ms between flips
  className?: string; // Optional styles
};

export default function LayoutTextFlip({
  text = "",
  words,
  interval = 1800,
  className = "",
}: LayoutTextFlipProps) {
  const [idx, setIdx] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || words.length <= 1) return;
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [interval, words.length, reduce]);

  const current = words[idx] ?? "";

  if (reduce) {
    return (
      <span className={`inline-flex items-baseline ${className}`}>
        {text}
        <span>{words[0] ?? ""}</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-baseline ${className}`}>
      {text}
      <span className="relative inline-flex h-[1.25em] overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={current}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            {current}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
