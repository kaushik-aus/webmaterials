"use client";

import React, { useEffect, useRef } from "react";

export interface NeonHeadingProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "sm" | "md" | "lg";
  enableFlicker?: boolean;
  className?: string;
}

/**
 * NeonHeading - Neon signage-inspired heading with text gradient and glow
 * 
 * Features:
 * - Text gradient (orange/amber tones)
 * - Outer glow effect
 * - Gentle flicker animation (optional, respects prefers-reduced-motion)
 * - Three size variants: sm, md, lg
 * - Customizable HTML heading level (h1-h6)
 * 
 * Usage:
 *   <NeonHeading as="h1" size="lg">Welcome</NeonHeading>
 *   <NeonHeading as="h2" size="md" enableFlicker>Featured</NeonHeading>
 */
export function NeonHeading({
  children,
  as: Component = "h2",
  size = "md",
  enableFlicker = false,
  className = "",
}: NeonHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  const sizeClasses = {
    sm: "text-2xl md:text-3xl",
    md: "text-3xl md:text-4xl",
    lg: "text-4xl md:text-5xl lg:text-6xl",
  };

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!enableFlicker || prefersReducedMotion || !headingRef.current) {
      return;
    }

    // Simple CSS animation-based flicker (no anime.js needed for this simple effect)
    const element = headingRef.current;
    element.style.animation = "flicker 3s linear infinite";

    return () => {
      if (element) {
        element.style.animation = "";
      }
    };
  }, [enableFlicker]);

  return (
    <Component
      ref={headingRef}
      className={`
        font-display font-bold
        ${sizeClasses[size]}
        text-gradient-orange
        ${enableFlicker ? "animate-flicker" : ""}
        ${className}
      `}
      style={{
        filter: "drop-shadow(0 0 10px rgba(249, 115, 22, 0.6))",
      }}
    >
      {children}
    </Component>
  );
}
