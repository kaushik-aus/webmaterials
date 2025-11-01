"use client";

import { useState, MouseEvent } from "react";

interface RippleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
}

/**
 * Button with "Liquid Ether" ripple effect.
 * Ripple emanates from click position with smooth animation.
 */
export default function RippleButton({
  children,
  onClick,
  className = "",
  variant = "primary",
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);

    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 600);

    onClick?.();
  };

  const baseStyles = "ripple-container relative px-6 py-2 rounded-full font-medium transition-all duration-200";
  const variantStyles = variant === "primary" 
    ? "bg-[#FF6600] text-white hover:bg-[#FF7722] active:scale-95"
    : "bg-transparent text-gray-700 hover:bg-gray-100 active:scale-95";

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      onClick={handleClick}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple-effect"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 10,
            height: 10,
            marginLeft: -5,
            marginTop: -5,
          }}
        />
      ))}
    </button>
  );
}
