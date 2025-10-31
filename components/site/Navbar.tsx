"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { count } = useCart();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    // Check for session - this is a simple check that won't crash if auth is not configured
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        setIsSignedIn(!!data?.user);
      })
      .catch((error) => {
        // Auth not configured or error - fail gracefully
        console.debug("Auth session check failed (this is expected if auth is not configured):", error.message);
        setIsSignedIn(false);
      });
  }, []);

  return (
    <header className="border-b border-white/10 sticky top-0 glass z-50">
      <nav className="container py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl font-semibold gradient-text text-glow-cyan"
        >
          ModelMart
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm text-ink hover:text-cyan-400 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/models"
            className="text-sm text-ink hover:text-cyan-400 transition-colors duration-300"
          >
            Browse
          </Link>
          <Link
            href="/cart"
            className="text-sm text-ink hover:text-cyan-400 transition-colors duration-300 relative"
          >
            Cart
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.6)]">
                {count}
              </span>
            )}
          </Link>
          {isSignedIn ? (
            <Link
              href="/signin"
              className="text-sm text-ink hover:text-cyan-400 transition-colors duration-300"
            >
              Account
            </Link>
          ) : (
            <Link
              href="/signin"
              className="text-sm text-ink hover:text-cyan-400 transition-colors duration-300"
            >
              Sign in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
