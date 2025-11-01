import Link from "next/link";
import { models, formatPrice } from "@/data/models";

export default function ModelsPage() {
  return (
    <section className="container py-8">
      <div className="mb-5">
        <h1 className="font-display text-3xl">Browse models</h1>
        <p style={{ color: 'var(--text-muted)' }}>Preview in 3D and add to cart.</p>
      </div>
      <div className="grid-auto">
        {models.map((m) => (
          <Link
            href={`/models/${m.slug}`}
            key={m.slug}
            className="card hover:shadow-md transition"
          >
            {m.thumbnail && m.thumbnail.trim() !== '' ? (
              <img
                src={m.thumbnail}
                alt={m.title}
                className="aspect-square object-cover"
              />
            ) : (
              <div className="aspect-square flex items-center justify-center" style={{ background: 'var(--surface)', color: 'var(--text-muted)' }}>
                No image
              </div>
            )}
            <div className="p-3">
              <div className="font-semibold">{m.title}</div>
              <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                by {m.author.name} • {formatPrice(m.priceInCents)}
              </div>
              <div className="mt-2 text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                {m.tags.join(" • ")}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
