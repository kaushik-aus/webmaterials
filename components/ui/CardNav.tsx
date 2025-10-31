"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  ArrowUpRight,
  Search,
  ShoppingCart,
  LogIn,
} from "lucide-react";
import LayoutTextFlip from "@/components/ui/LayoutTextFlip";

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export type CardNavItem = {
  label: string;
  bgColor?: string;
  textColor?: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  items: CardNavItem[];
  className?: string;
  baseColor?: string;
  menuColor?: string;
  searchWords?: string[];
}

export default function CardNav({
  items,
  className = "",
  baseColor,
  menuColor = "#d1d5db",
  searchWords = [
    "3D Models",
    "Sci‑Fi Kits",
    "Architecture",
    "Characters",
    "Vehicles",
  ],
}: CardNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const navRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [targetHeight, setTargetHeight] = useState<number>(60);

  const computeHeight = useCallback(() => {
    const base = 60;
    const el = contentRef.current;
    if (!el) return base;
    const prev = {
      visibility: el.style.visibility,
      position: el.style.position,
      height: el.style.height,
      pointerEvents: el.style.pointerEvents,
    };
    el.style.visibility = "hidden";
    el.style.position = "static";
    el.style.height = "auto";
    el.style.pointerEvents = "none";
    const contentHeight = el.scrollHeight;
    el.style.visibility = prev.visibility;
    el.style.position = prev.position;
    el.style.height = prev.height;
    el.style.pointerEvents = prev.pointerEvents;
    return base + contentHeight + 8;
  }, []);

  useEffect(() => setTargetHeight(60), []);

  useEffect(() => {
    const onResize = () => {
      if (isOpen) setTargetHeight(computeHeight());
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isOpen, computeHeight]);

  useEffect(() => {
    if (isOpen) setTargetHeight(computeHeight());
    else setTargetHeight(60);
  }, [isOpen, computeHeight]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = search.trim();
    if (!q) return;
    router.push(`/models?search=${encodeURIComponent(q)}`);
    setIsOpen(false);
  };

  const topBar = useMemo(
    () => (
      <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center gap-3 p-2 z-[2]">
        {/* Inline controls: hamburger → search → Cart → Sign in */}
        <div className="ml-1 flex items-center gap-2 w-full">
          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="group inline-flex h-9 w-9 items-center justify-center rounded-md border border-glass bg-black/30 hover:bg-black/40 transition text-sm"
            style={{ color: menuColor }}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Search (desktop) with animated hint */}
          <form
            className="hidden md:flex items-center gap-2 relative flex-1"
            onSubmit={handleSearchSubmit}
            role="search"
            aria-label="Search models"
          >
            <div className="relative w-full">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              {!isFocused && !search && (
                <div className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 text-sm text-zinc-500/80">
                  <LayoutTextFlip words={searchWords} interval={1600} />
                </div>
              )}
              <input
                type="search"
                placeholder=""
                className="h-9 w-full rounded-md bg-black/30 border border-glass pl-8 pr-3 text-sm outline-none focus:ring-1 focus:ring-cyan-400/60 placeholder:text-zinc-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                aria-label="Search"
              />
            </div>
          </form>

          {/* Cart */}
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 h-9 rounded-md px-3 text-sm btn-outline"
          >
            <ShoppingCart className="h-4 w-4" />
            Cart
          </Link>

          {/* Sign in */}
          <Link
            href="/(auth)/signin"
            className="inline-flex items-center gap-2 h-9 rounded-md px-3 text-sm btn-outline"
          >
            <LogIn className="h-4 w-4" />
            Sign in
          </Link>
        </div>
      </div>
    ),
    [isOpen, menuColor, search, isFocused, searchWords]
  );

  return (
    <div
      className={`card-nav-container absolute left-1/2 -translate-x-1/2 w-[92%] max-w-[980px] z-50 top-[0.75rem] md:top-[1.25rem] ${className}`}
    >
      <motion.nav
        ref={navRef}
        className="relative block rounded-xl shadow-md overflow-hidden glass border-glass"
        style={{ backgroundColor: baseColor }}
        initial={{ height: 60 }}
        animate={{ height: targetHeight }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {topBar}

        {/* Collapsible content */}
        <div
          ref={contentRef}
          className="card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col gap-2 md:flex-row md:items-end md:gap-3"
          aria-hidden={!isOpen}
        >
          {/* Mobile search inside content with animated hint */}
          <form
            className="md:hidden flex items-center gap-2"
            onSubmit={handleSearchSubmit}
            role="search"
            aria-label="Search models"
          >
            <div className="relative w-full">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-300" />
              {!isFocused && !search && (
                <div className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
                  <LayoutTextFlip words={searchWords} interval={1600} />
                </div>
              )}
              <input
                type="search"
                placeholder=""
                className="h-10 w-full rounded-md bg-black/30 border border-glass pl-8 pr-3 text-sm outline-none focus:ring-1 focus:ring-cyan-400/60 placeholder:text-zinc-400"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                aria-label="Search"
              />
            </div>
          </form>

          <AnimatePresence initial={false}>
            {(items || []).slice(0, 3).map((item, idx) => (
              <motion.div
                key={`${item.label}-${idx}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 14 }}
                exit={{ opacity: 0, y: 14 }}
                transition={{ duration: 0.28, delay: isOpen ? idx * 0.06 : 0 }}
                className="select-none relative flex flex-col gap-2 rounded-lg min-w-0 flex-[1_1_auto] p-3 md:p-4 md:flex-[1_1_0%]"
                style={{
                  backgroundColor: item.bgColor || "rgba(255,255,255,0.04)",
                  color: item.textColor || "rgb(226,232,240)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="font-medium tracking-tight text-base md:text-lg">
                  {item.label}
                </div>
                <div className="mt-auto flex flex-col gap-1.5">
                  {item.links?.map((lnk, i) => (
                    <Link
                      key={`${lnk.label}-${i}`}
                      href={lnk.href}
                      aria-label={lnk.ariaLabel || lnk.label}
                      className="inline-flex items-center gap-1.5 text-sm hover:text-cyan-300 transition"
                      onClick={() => setIsOpen(false)}
                    >
                      <ArrowUpRight
                        className="h-4 w-4 opacity-80"
                        aria-hidden="true"
                      />
                      {lnk.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.nav>
    </div>
  );
}
