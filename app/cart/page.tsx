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
    <section className="container py-8">
      <h1 className="font-display text-3xl mb-4">Your cart</h1>
      {items.length === 0 ? (
        <div className="rounded-xl border border-muted/60 p-6">
          <p>Your cart is empty.</p>
          <Link href="/models" className="btn btn-secondary mt-3">
            Browse models
          </Link>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-[var(--border)] bg-white rounded-xl border border-muted/60">
            {items.map((line) => (
              <li key={line.model.slug} className="p-4 flex gap-4 items-center">
                <img
                  src={line.model.thumbnail}
                  alt={line.model.title}
                  className="size-16 rounded-md object-cover"
                />
                <div className="flex-1">
                  <div className="font-semibold">{line.model.title}</div>
                  <div className="text-sm text-muted">
                    {line.qty} × {formatPrice(line.model.priceInCents)}
                  </div>
                </div>
                <div className="font-semibold">
                  {formatPrice(line.qty * line.model.priceInCents)}
                </div>
                <button
                  className="ml-3 text-sm underline"
                  onClick={() => remove(line.model.slug)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between">
            <button className="text-sm underline" onClick={() => clear()}>
              Clear cart
            </button>
            <div className="flex items-center gap-4">
              <div className="text-lg font-semibold">
                {formatPrice(totalInCents)}
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
