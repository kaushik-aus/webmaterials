"use client";

import React, { MouseEvent } from "react";

interface RippleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function RippleButton({
  children,
  onClick,
  className = "",
  type = "button",
}: RippleButtonProps) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement("span");
    ripple.className = "ripple-effect";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = "10px";
    ripple.style.height = "10px";

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);

    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`ripple bg-accent text-white font-semibold px-6 py-2.5 rounded-full shadow-m hover:shadow-l transition-shadow ${className}`}
    >
      {children}
    </button>
  );
}
