import Link from "next/link";
import { models, formatPrice } from "@/data/models";

export default function ModelsPage() {
  return (
    <section className="container py-10">
      <div className="mb-8">
        <h1 className="font-display text-4xl gradient-text mb-2">Browse models</h1>
        <p className="text-muted text-lg">Preview in 3D and add to cart.</p>
      </div>
      <div className="grid-auto">
        {models.map((m) => (
          <Link
            href={`/models/${m.slug}`}
            key={m.slug}
            className="card block"
          >
            <img
              src={m.thumbnail}
              alt={m.title}
              className="aspect-square object-cover"
            />
            <div className="p-4">
              <div className="font-semibold text-ink">{m.title}</div>
              <div className="text-sm text-muted mt-1">
                by {m.author.name} • {formatPrice(m.priceInCents)}
              </div>
              <div className="mt-2 text-xs text-muted/80 truncate">
                {m.tags.join(" • ")}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
