"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/data/models";

export default function CartPage() {
  const { items, remove, clear, totalInCents } = useCart();

  return (
    <section className="container py-8">
      <h1 className="font-display text-3xl mb-4">Your cart</h1>
      {items.length === 0 ? (
        <div className="rounded-xl border p-6" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <p>Your cart is empty.</p>
          <Link href="/models" className="btn btn-secondary mt-3">
            Browse models
          </Link>
        </div>
      ) : (
        <>
          <ul className="divide-y rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
            {items.map((line) => (
              <li key={line.model.slug} className="p-4 flex gap-4 items-center">
                {line.model.thumbnail && line.model.thumbnail.trim() !== '' ? (
                  <img
                    src={line.model.thumbnail}
                    alt={line.model.title}
                    className="size-16 rounded-md object-cover"
                  />
                ) : (
                  <div className="size-16 rounded-md flex items-center justify-center text-xs" style={{ background: 'var(--surface)', color: 'var(--text-muted)' }}>
                    No image
                  </div>
                )}
                <div className="flex-1">
                  <div className="font-semibold">{line.model.title}</div>
                  <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
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
                aria-disabled
                title="Checkout to be wired to Stripe"
              >
                Checkout (soon)
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
