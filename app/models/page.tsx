import Link from "next/link";
import { models, formatPrice } from "@/data/models";
import { NeonHeading } from "@/components/ui/NeonHeading";
import { KatakanaChip } from "@/components/ui/KatakanaChip";

export default function ModelsPage() {
  return (
    <section className="container py-8">
      <div className="mb-8">
        <NeonHeading as="h1" size="lg">Browse models</NeonHeading>
        <p className="text-muted mt-2 text-lg">Preview in 3D and add to cart.</p>
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
              <div className="font-semibold text-ink">{m.title}</div>
              <div className="text-sm text-muted mt-1">
                by {m.author.name} • {formatPrice(m.priceInCents)}
              </div>
              <div className="mt-3 flex gap-2 flex-wrap">
                {m.tags.map(tag => (
                  <KatakanaChip key={tag} label={tag} />
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
