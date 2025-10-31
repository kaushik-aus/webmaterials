"use client";

import Link from "next/link";
import { ComponentProps } from "react";

type Variant = "primary" | "outline";
type As = "button" | "a";

type Props = {
  variant?: Variant;
  as?: As;
  href?: string;
} & ComponentProps<"button"> &
  ComponentProps<"a">;

export default function NeonButton({
  variant = "primary",
  as = "button",
  href = "#",
  className = "",
  children,
  ...rest
}: Props) {
  const cls = variant === "primary" ? "btn-primary" : "btn-outline";
  if (as === "a") {
    return (
      <Link href={href} className={`${cls} ${className}`} {...(rest as any)}>
        {children}
      </Link>
    );
  }
  return (
    <button className={`${cls} ${className}`} {...(rest as any)}>
      {children}
    </button>
  );
}
