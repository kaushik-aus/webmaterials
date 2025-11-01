import Link from "next/link";
import { models, formatPrice } from "@/data/models";
import { NeonHeading } from "@/components/ui/NeonHeading";
import { KatakanaChip } from "@/components/ui/KatakanaChip";

export default function ModelsPage() {
  return (
    <section className="container py-8">
      <div className="mb-8">
        <NeonHeading as="h1" size="lg">
          Browse models
        </NeonHeading>
        <p className="text-muted mt-3 text-lg">Preview in 3D and add to cart.</p>
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
            <div className="p-4">
              <div className="font-semibold text-ink mb-2">{m.title}</div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {m.tags.map((tag) => (
                  <KatakanaChip key={tag} size="sm" variant="outlined">
                    {tag}
                  </KatakanaChip>
                ))}
              </div>
              <div className="text-sm text-muted">
                by {m.author.name} • <span className="text-brand font-semibold">{formatPrice(m.priceInCents)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
