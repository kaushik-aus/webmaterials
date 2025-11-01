"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] backdrop-blur bg-near-black/80">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="font-display text-xl text-gradient-orange">
          ModelMart
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/models">Browse</Link>
          <Link href="/cart" className="relative">
            Cart
          </Link>
        </nav>
        <button
          className="md:hidden inline-flex items-center gap-2"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="primary-menu"
        >
          Menu
        </button>
      </div>
      {open && (
        <div
          id="primary-menu"
          className="md:hidden border-t border-[var(--border)]"
        >
          <div className="container py-3 flex flex-col gap-2">
            <Link href="/models" onClick={() => setOpen(false)}>
              Browse
            </Link>
            <Link href="/cart" onClick={() => setOpen(false)}>
              Cart
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
