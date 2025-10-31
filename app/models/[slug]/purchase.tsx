"use client";

import { useCart } from "@/components/cart/CartProvider";
import { models } from "@/data/models";

export default function AddToCart({ slug }: { slug: string }) {
  const { add } = useCart();
  const model = models.find((m) => m.slug === slug)!;
  return (
    <button className="btn" onClick={() => add(model, 1)}>
      Add to cart
    </button>
  );
}
