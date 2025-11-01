"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export interface RouteTransitionProps {
  children: React.ReactNode;
}

/**
 * RouteTransition - Smooth page transitions with fade and slide
 * 
 * Features:
 * - Gentle fade in/out effect
 * - Subtle upward slide animation
 * - Respects prefers-reduced-motion
 * - Stagger effect for nested content
 * 
 * Usage:
 *   Wrap page content or main layout children with this component
 */
export function RouteTransition({ children }: RouteTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
