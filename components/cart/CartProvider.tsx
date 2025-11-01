"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Model } from "@/data/models";

type CartLine = { model: Model; qty: number };
type CartCtx = {
  items: CartLine[];
  count: number;
  add: (m: Model, qty?: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  totalInCents: number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>(() => {
    // Initialize from localStorage on mount
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem("mm:cart");
        if (raw) return JSON.parse(raw);
      } catch {}
    }
    return [];
  });

  // Persist to localStorage when items change
  useEffect(() => {
    try {
      localStorage.setItem("mm:cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  const add = (m: Model, qty = 1) => {
    setItems((curr) => {
      const found = curr.find((c) => c.model.slug === m.slug);
      if (found) {
        return curr.map((c) =>
          c.model.slug === m.slug ? { ...c, qty: c.qty + qty } : c
        );
      }
      return [...curr, { model: m, qty }];
    });
  };
  const remove = (slug: string) => {
    setItems((curr) => curr.filter((c) => c.model.slug !== slug));
  };
  const clear = () => setItems([]);

  const count = items.reduce((sum, l) => sum + l.qty, 0);
  const totalInCents = items.reduce(
    (sum, l) => sum + l.qty * l.model.priceInCents,
    0
  );

  const value = useMemo(
    () => ({ items, add, remove, clear, count, totalInCents }),
    [items, count, totalInCents]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
