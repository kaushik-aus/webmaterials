"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";

export default function Navbar() {
  const { count } = useCart();

  return (
    <header className="border-b border-muted/60 sticky top-0 bg-paper/80 backdrop-blur-sm z-10">
      <nav className="container py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-xl font-semibold">
          ModelMart
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm hover:underline">
            Home
          </Link>
          <Link href="/models" className="text-sm hover:underline">
            Browse
          </Link>
          <Link href="/cart" className="text-sm hover:underline relative">
            Cart
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <Link
            href="/api/auth/signin"
            className="text-sm hover:underline"
          >
            Sign in
          </Link>
        </div>
      </nav>
    </header>
  );
}
