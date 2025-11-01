'use client';

import React from 'react';

interface NeonHeadingProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Neon signage heading with text gradient, outer glow, and optional subtle flicker.
 * Flicker animation is guarded by prefers-reduced-motion.
 * Tuned to orange/amber color palette.
 */
export function NeonHeading({ 
  children, 
  as: Component = 'h2',
  size = 'md',
  className = '' 
}: NeonHeadingProps) {
  const sizeClasses = {
    sm: 'text-2xl md:text-3xl',
    md: 'text-3xl md:text-4xl',
    lg: 'text-4xl md:text-5xl lg:text-6xl',
  };

  return (
    <Component 
      className={`
        font-display font-bold
        gradient-text neon-text neon-flicker
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {children}
    </Component>
  );
}
