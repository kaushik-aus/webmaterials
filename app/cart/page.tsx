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
        <NeonHeading as="h1" size="lg">
          Your cart
        </NeonHeading>
        {items.length > 0 && (
          <KatakanaChip showDot className="mt-3">
            {items.length} アイテム
          </KatakanaChip>
        )}
      </div>
      {items.length === 0 ? (
        <div className="rounded-xl border border-mikan-700/40 p-8 text-center" style={{
          background: "linear-gradient(135deg, rgba(249, 115, 22, 0.05) 0%, rgba(234, 88, 12, 0.05) 100%)"
        }}>
          <p className="text-lg mb-4">Your cart is empty.</p>
          <Link href="/models" className="btn">
            Browse models
          </Link>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-[var(--border)] bg-paper-warm rounded-xl border border-mikan-700/40 overflow-hidden">
            {items.map((line) => (
              <li key={line.model.slug} className="p-4 flex gap-4 items-center hover:bg-mikan-50/50 transition">
                <img
                  src={line.model.thumbnail}
                  alt={line.model.title}
                  className="size-16 rounded-md object-cover border border-border"
                />
                <div className="flex-1">
                  <div className="font-semibold text-ink">{line.model.title}</div>
                  <div className="text-sm text-muted flex items-center gap-2 mt-1">
                    <span>{line.qty} × {formatPrice(line.model.priceInCents)}</span>
                  </div>
                </div>
                <div className="font-semibold text-brand text-lg">
                  {formatPrice(line.qty * line.model.priceInCents)}
                </div>
                <button
                  className="ml-3 text-sm link-hover"
                  onClick={() => remove(line.model.slug)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <button className="text-sm link-hover" onClick={() => clear()}>
              Clear cart
            </button>
            <div className="flex items-center gap-4">
              <div className="text-2xl font-semibold text-brand">
                Total: {formatPrice(totalInCents)}
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
