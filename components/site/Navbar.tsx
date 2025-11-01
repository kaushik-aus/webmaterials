"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur seam-guard" style={{ borderColor: 'var(--border)', background: 'rgba(26, 26, 26, 0.8)' }}>
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="font-display text-xl gradient-text link-hover">
          ModelMart
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/models" className="link-hover">Browse</Link>
          <Link href="/cart" className="relative link-hover">
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
          className="md:hidden border-t"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="container py-3 flex flex-col gap-2">
            <Link href="/models" onClick={() => setOpen(false)} className="link-hover">
              Browse
            </Link>
            <Link href="/cart" onClick={() => setOpen(false)} className="link-hover">
              Cart
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
