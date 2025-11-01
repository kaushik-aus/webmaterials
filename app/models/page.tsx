import Link from "next/link";
import { models, formatPrice } from "@/data/models";

export default function ModelsPage() {
  return (
    <section className="container py-8">
      <div className="mb-5">
        <h1 className="font-display text-3xl">Browse models</h1>
        <p className="text-muted">Preview in 3D and add to cart.</p>
      </div>
      <div className="grid-auto">
        {models.map((m) => (
          <Link
            href={`/models/${m.slug}`}
            key={m.slug}
            className="card"
          >
            <img
              src={m.thumbnail}
              alt={m.title}
              className="aspect-square object-cover"
            />
            <div className="p-3">
              <div className="font-semibold">{m.title}</div>
              <div className="text-sm text-muted">
                by {m.author.name} • {formatPrice(m.priceInCents)}
              </div>
              <div className="mt-2 text-xs text-muted truncate">
                {m.tags.join(" • ")}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
