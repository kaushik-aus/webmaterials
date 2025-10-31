"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "cyan" | "magenta" | "purple";
  hover?: boolean;
}

export function GlassCard({
  children,
  className = "",
  glowColor = "cyan",
  hover = true,
}: GlassCardProps) {
  const glowColors = {
    cyan: "hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]",
    magenta: "hover:shadow-[0_0_20px_rgba(236,72,153,0.4)]",
    purple: "hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]",
  };

  const borderColors = {
    cyan: "hover:border-cyan-400/50",
    magenta: "hover:border-pink-400/50",
    purple: "hover:border-purple-400/50",
  };

  return (
    <motion.div
      className={`
        glass rounded-xl p-6 
        border border-white/10
        transition-all duration-300
        ${hover ? `${glowColors[glowColor]} ${borderColors[glowColor]}` : ""}
        ${className}
      `}
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
