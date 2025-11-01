import React from "react";
import { KatakanaChip } from "./KatakanaChip";

export interface MangaDividerProps {
  label?: string;
  variant?: "single" | "double";
  showScreentone?: boolean;
  className?: string;
}

/**
 * MangaDivider - Manga panel edge-inspired horizontal divider
 * 
 * Features:
 * - Angled corner nicks (diamond shapes at edges)
 * - Optional double-line style
 * - Optional screentone halftone overlay pattern
 * - Optional label slot (can render a KatakanaChip inline)
 * - Respects prefers-reduced-motion for animations
 * 
 * Usage:
 *   <MangaDivider />
 *   <MangaDivider variant="double" label="セクション" />
 *   <MangaDivider showScreentone />
 */
export function MangaDivider({
  label,
  variant = "single",
  showScreentone = false,
  className = "",
}: MangaDividerProps) {
  return (
    <div className={`relative my-8 ${className}`}>
      {/* Main divider line(s) */}
      <div className="relative flex items-center">
        <div
          className={`flex-1 relative ${
            variant === "double" ? "h-1" : "h-0.5"
          }`}
        >
          {/* Primary line */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-mikan-700 to-transparent opacity-50"
            style={{
              background:
                variant === "double"
                  ? "linear-gradient(to right, transparent, rgba(194, 65, 12, 0.5) 20%, rgba(194, 65, 12, 0.5) 80%, transparent)"
                  : "linear-gradient(to right, transparent, rgba(194, 65, 12, 0.5) 10%, rgba(194, 65, 12, 0.5) 90%, transparent)",
            }}
          />
          
          {/* Secondary line for double variant */}
          {variant === "double" && (
            <div
              className="absolute top-0.5 inset-x-0 h-0.5"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(194, 65, 12, 0.3) 20%, rgba(194, 65, 12, 0.3) 80%, transparent)",
              }}
            />
          )}

          {/* Screentone halftone overlay */}
          {showScreentone && (
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(249, 115, 22, 0.8) 1px, transparent 1px)",
                backgroundSize: "4px 4px",
              }}
            />
          )}
        </div>

        {/* Label in center */}
        {label && (
          <div className="px-4">
            <KatakanaChip variant="outlined" size="sm">
              {label}
            </KatakanaChip>
          </div>
        )}

        {/* Right side line (mirror of left) */}
        {label && (
          <div
            className={`flex-1 relative ${
              variant === "double" ? "h-1" : "h-0.5"
            }`}
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-mikan-700 to-transparent opacity-50"
              style={{
                background:
                  variant === "double"
                    ? "linear-gradient(to right, transparent, rgba(194, 65, 12, 0.5) 20%, rgba(194, 65, 12, 0.5) 80%, transparent)"
                    : "linear-gradient(to right, transparent, rgba(194, 65, 12, 0.5) 10%, rgba(194, 65, 12, 0.5) 90%, transparent)",
              }}
            />
            {variant === "double" && (
              <div
                className="absolute top-0.5 inset-x-0 h-0.5"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(194, 65, 12, 0.3) 20%, rgba(194, 65, 12, 0.3) 80%, transparent)",
                }}
              />
            )}
            {showScreentone && (
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(249, 115, 22, 0.8) 1px, transparent 1px)",
                  backgroundSize: "4px 4px",
                }}
              />
            )}
          </div>
        )}
      </div>

      {/* Corner nicks (diamond shapes) */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 border-2 border-mikan-700 bg-near-black transform rotate-45 -translate-x-1.5" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border-2 border-mikan-700 bg-near-black transform rotate-45 translate-x-1.5" />
    </div>
  );
}
