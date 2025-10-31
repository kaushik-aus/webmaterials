"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
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

  const variants = prefersReducedMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
      }
    : {
        initial: { opacity: 0, filter: "blur(4px)", scale: 0.98 },
        animate: { opacity: 1, filter: "blur(0px)", scale: 1 },
        exit: { opacity: 0, filter: "blur(4px)", scale: 0.98 },
      };

  const transition = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.4, ease: [0.42, 0, 0.58, 1] as const };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
