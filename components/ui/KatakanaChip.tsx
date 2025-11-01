import React from 'react';

interface KatakanaChipProps {
  label: string;
  icon?: boolean;
  className?: string;
}

/**
 * Anime-inspired pill chip with thin neon border and glow on hover.
 * Designed for katakana labels, section tags, filters, and small badges.
 */
export function KatakanaChip({ label, icon = false, className = '' }: KatakanaChipProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-3 py-1 
        rounded-full text-xs font-bold uppercase tracking-wider
        border border-mikan-600 bg-mikan-950/20 text-mikan-400
        transition-all duration-300
        hover:bg-mikan-900/30 hover:shadow-neon-orange
        ${className}
      `}
      style={{
        fontFeatureSettings: '"kern" 1, "liga" 1',
      }}
    >
      {icon && (
        <span 
          className="w-1.5 h-1.5 rounded-full bg-mikan-500"
          aria-hidden="true"
        />
      )}
      {label}
    </span>
  );
}
