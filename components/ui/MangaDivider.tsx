import React from 'react';

interface MangaDividerProps {
  label?: React.ReactNode;
  variant?: 'single' | 'double';
  screentone?: boolean;
  className?: string;
}

/**
 * Manga panel divider styled like a manga panel edge with angled corner nicks.
 * Optional screentone halftone overlay and label slot.
 * Respects prefers-reduced-motion.
 */
export function MangaDivider({ 
  label, 
  variant = 'single', 
  screentone = false,
  className = '' 
}: MangaDividerProps) {
  return (
    <div className={`relative my-8 ${className}`}>
      {/* Main divider line */}
      <div className={`manga-divider ${screentone ? 'screentone-overlay' : ''}`}>
        {variant === 'double' && (
          <div className="absolute top-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
        )}
      </div>
      
      {/* Optional label slot */}
      {label && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-bg-dark">
          {label}
        </div>
      )}
    </div>
  );
}
