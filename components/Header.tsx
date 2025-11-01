"use client";

import { useState } from "react";
import RippleButton from "./RippleButton";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-s">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded"></div>
            <span className="text-xl font-bold text-ink">ModelMart</span>
          </div>

          {/* Desktop Search - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search models..."
                className="w-full px-4 py-2 pl-10 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <RippleButton onClick={() => console.log("Cart clicked")}>
              Cart
            </RippleButton>
            <RippleButton onClick={() => console.log("Sign In clicked")}>
              Sign In
            </RippleButton>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-ink"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-3">
              <RippleButton
                onClick={() => {
                  console.log("Cart clicked");
                  setMobileMenuOpen(false);
                }}
                className="w-full"
              >
                Cart
              </RippleButton>
              <RippleButton
                onClick={() => {
                  console.log("Sign In clicked");
                  setMobileMenuOpen(false);
                }}
                className="w-full"
              >
                Sign In
              </RippleButton>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
