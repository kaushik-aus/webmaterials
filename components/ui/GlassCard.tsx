"use client";

import { HTMLAttributes } from "react";

export default function GlassCard({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`glass rounded-xl p-4 hover:neon-ring transition duration-300 ${className}`}
      {...props}
    />
  );
}
