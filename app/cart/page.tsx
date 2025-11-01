"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/data/models";
import { NeonHeading } from "@/components/ui/NeonHeading";
import { KatakanaChip } from "@/components/ui/KatakanaChip";

export default function CartPage() {
  const { items, remove, clear, totalInCents } = useCart();

  return (
    <section className="container py-8">
      <div className="mb-6">
        <NeonHeading as="h1" size="lg">Your cart</NeonHeading>
      </div>
      {items.length === 0 ? (
        <div className="rounded-xl border p-8 text-center" style={{ 
          borderColor: 'var(--border)',
          background: 'var(--paper)'
        }}>
          <p className="text-muted text-lg mb-4">Your cart is empty.</p>
          <Link href="/models" className="btn">
            Browse models
          </Link>
        </div>
      ) : (
        <>
          <div className="rounded-xl border" style={{ 
            borderColor: 'var(--border)',
            background: 'var(--paper)'
          }}>
            <ul className="divide-y" style={{ borderColor: 'var(--border)' }}>
              {items.map((line) => (
                <li key={line.model.slug} className="p-5 flex gap-4 items-center border-border-subtle">
                  <img
                    src={line.model.thumbnail}
                    alt={line.model.title}
                    className="size-16 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-ink">{line.model.title}</div>
                    <div className="text-sm text-muted mt-1">
                      {line.qty} × {formatPrice(line.model.priceInCents)}
                    </div>
                  </div>
                  <div className="font-semibold text-mikan-400">
                    {formatPrice(line.qty * line.model.priceInCents)}
                  </div>
                  <button
                    className="ml-3 text-sm link-hover text-mikan-400"
                    onClick={() => remove(line.model.slug)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <button className="text-sm link-hover text-muted" onClick={() => clear()}>
              Clear cart
            </button>
            <div className="flex items-center gap-4">
              <KatakanaChip label="Total" />
              <div className="text-2xl font-semibold gradient-text">
                {formatPrice(totalInCents)}
              </div>
              <button
                className="btn"
                aria-disabled
                title="Checkout to be wired to Stripe"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
