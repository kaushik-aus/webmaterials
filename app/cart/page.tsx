"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/data/models";
import { useState } from "react";

export default function CartPage() {
  const { items, remove, clear, totalInCents } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((line) => ({
            id: line.model.slug,
            name: line.model.title,
            price: line.model.priceInCents,
            quantity: line.qty,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to initiate checkout. Please try again.");
      setIsCheckingOut(false);
    }
  };

  return (
    <section className="container py-10">
      <h1 className="font-display text-4xl gradient-text mb-6">Your cart</h1>
      {items.length === 0 ? (
        <div className="glass rounded-xl border border-white/10 p-8 text-center">
          <p className="text-ink text-lg mb-4">Your cart is empty.</p>
          <Link href="/models" className="btn btn-secondary">
            Browse models
          </Link>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-white/10 glass rounded-xl border border-white/10 overflow-hidden">
            {items.map((line) => (
              <li key={line.model.slug} className="p-5 flex gap-4 items-center hover:bg-white/5 transition-colors">
                <img
                  src={line.model.thumbnail}
                  alt={line.model.title}
                  className="size-20 rounded-md object-cover border border-white/10"
                />
                <div className="flex-1">
                  <div className="font-semibold text-ink text-lg">{line.model.title}</div>
                  <div className="text-sm text-muted mt-1">
                    {line.qty} × {formatPrice(line.model.priceInCents)}
                  </div>
                </div>
                <div className="font-semibold text-cyan-400 text-lg">
                  {formatPrice(line.qty * line.model.priceInCents)}
                </div>
                <button
                  className="ml-3 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                  onClick={() => remove(line.model.slug)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-8 glass rounded-xl border border-white/10 p-6 flex items-center justify-between">
            <button 
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors" 
              onClick={() => clear()}
            >
              Clear cart
            </button>
            <div className="flex items-center gap-6">
              <div className="text-xl font-semibold text-ink">
                Total: <span className="text-cyan-400">{formatPrice(totalInCents)}</span>
              </div>
              <button
                className="btn"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? "Redirecting..." : "Checkout"}
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
