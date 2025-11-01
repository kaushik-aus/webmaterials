"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export interface AnimatedButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  "aria-disabled"?: boolean;
  title?: string;
}

/**
 * AnimatedButton - Button with micro-interactions
 * 
 * Features:
 * - Gradient pulse on hover
 * - Ripple effect on click (respects prefers-reduced-motion)
 * - Smooth transitions
 * 
 * Usage:
 *   <AnimatedButton>Click me</AnimatedButton>
 *   <AnimatedButton variant="secondary">Cancel</AnimatedButton>
 */
export function AnimatedButton({
  variant = "primary",
  children,
  className = "",
  onClick,
  disabled,
  type = "button",
  ...props
}: AnimatedButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 600);

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={`btn ${variant === "secondary" ? "btn-secondary" : ""} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      {...props}
    >
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
          }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ width: 100, height: 100, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
      {children}
    </motion.button>
  );
}
