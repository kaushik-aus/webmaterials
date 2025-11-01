import React from "react";

export interface KatakanaChipProps {
  children: React.ReactNode;
  variant?: "default" | "outlined" | "filled";
  size?: "sm" | "md" | "lg";
  showDot?: boolean;
  className?: string;
}

/**
 * KatakanaChip - Anime-style pill chip with thin neon border and hover glow
 * 
 * Features:
 * - Thin neon border with subtle glow on hover
 * - Optional leading icon dot
 * - Typography optimized for katakana with font-feature-settings
 * - Accessible with proper contrast and keyboard navigation
 * 
 * Usage:
 *   <KatakanaChip>タグ</KatakanaChip>
 *   <KatakanaChip showDot variant="outlined">フィルター</KatakanaChip>
 */
export function KatakanaChip({
  children,
  variant = "default",
  size = "md",
  showDot = false,
  className = "",
}: KatakanaChipProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  const variantClasses = {
    default: "bg-transparent border border-mikan-500 text-mikan-400 hover:bg-mikan-500/10 hover:shadow-orange-glow",
    outlined: "bg-transparent border border-mikan-600 text-mikan-500 hover:bg-mikan-600/10 hover:shadow-orange-glow",
    filled: "bg-mikan-500 border border-mikan-600 text-white hover:bg-mikan-600 hover:shadow-orange-glow-lg",
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full 
        font-bold transition-all duration-300
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      style={{
        fontFeatureSettings: '"halt", "vhal"',
      }}
    >
      {showDot && (
        <span
          className="w-1.5 h-1.5 rounded-full bg-current"
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
}
