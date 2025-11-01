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
        gradient-text neon-text
        ${sizeClasses[size]}
        ${className}
      `}
      style={{
        animation: 'prefers-reduced-motion: no-preference ? neonFlicker 8s infinite : none',
      }}
    >
      {children}
      <style jsx>{`
        @keyframes neonFlicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            text-shadow: 
              0 0 10px rgba(249, 115, 22, 0.5),
              0 0 20px rgba(249, 115, 22, 0.3);
          }
          20%, 24%, 55% {
            text-shadow: 
              0 0 5px rgba(249, 115, 22, 0.3),
              0 0 10px rgba(249, 115, 22, 0.2);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          @keyframes neonFlicker {
            0%, 100% {
              text-shadow: 
                0 0 10px rgba(249, 115, 22, 0.5),
                0 0 20px rgba(249, 115, 22, 0.3);
            }
          }
        }
      `}</style>
    </Component>
  );
}
