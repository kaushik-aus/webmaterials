"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface NeonButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline";
  href?: string;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

export function NeonButton({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  ariaLabel,
  disabled = false,
}: NeonButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold transition-all duration-300 relative overflow-hidden";

  const variantStyles = {
    primary: `
      bg-gradient-to-r from-cyan-500 to-blue-500 
      text-black border border-cyan-400
      shadow-[0_0_15px_rgba(6,182,212,0.5)]
      hover:shadow-[0_0_25px_rgba(6,182,212,0.8),0_0_35px_rgba(6,182,212,0.4)]
      hover:-translate-y-0.5
    `,
    outline: `
      bg-transparent border-2 border-cyan-400
      text-cyan-400
      shadow-[0_0_10px_rgba(6,182,212,0.3)]
      hover:bg-cyan-400/10
      hover:shadow-[0_0_20px_rgba(6,182,212,0.6)]
    `,
  };

  const Component = href ? motion.a : motion.button;
  const props = href ? { href } : { onClick, disabled };

  return (
    <Component
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      aria-label={ariaLabel}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {!disabled && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/30 to-cyan-400/0"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      )}
    </Component>
  );
}
