import Link from "next/link";
import { models, formatPrice } from "@/data/models";
import { NeonHeading } from "@/components/ui/NeonHeading";
import { KatakanaChip } from "@/components/ui/KatakanaChip";
import { MangaDivider } from "@/components/ui/MangaDivider";

export default function HomePage() {
  const featured = models.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden seam-guard">
        <div className="container py-16 md:py-24">
          <div className="mb-3">
            <KatakanaChip label="3D Marketplace" icon />
          </div>
          <NeonHeading as="h1" size="lg" className="leading-tight max-w-4xl">
            Sell and buy production‑ready 3D models
          </NeonHeading>
          <p className="text-muted mt-4 max-w-2xl text-lg">
            Preview models live in 3D, purchase securely, and download
            instantly. Built for 3D artists, game devs, and archviz teams.
          </p>
          <div className="mt-8 flex gap-3">
            <Link href="/models" className="btn">
              Browse models
            </Link>
            <button className="btn btn-secondary" aria-disabled title="Coming soon">
              Become a seller (soon)
            </button>
          </div>
        </div>
      </section>
      
      <MangaDivider screentone />

      {/* Featured */}
      <section className="container pb-12">
        <div className="mb-6 flex items-end justify-between">
          <NeonHeading as="h2" size="md">Featured</NeonHeading>
          <Link href="/models" className="text-sm link-hover text-mikan-400">
            View all →
          </Link>
        </div>
        <div className="grid-auto">
          {featured.map((m) => (
            <Link
              href={`/models/${m.slug}`}
              key={m.slug}
              className="card group"
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
                  {m.tags.slice(0, 2).map(tag => (
                    <KatakanaChip key={tag} label={tag} />
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      <MangaDivider label={<KatakanaChip label="Join Us" icon />} />

      {/* CTA strip */}
      <section className="container my-10">
        <div className="rounded-xl border p-6 md:p-8" style={{ 
          borderColor: 'var(--border)',
          background: 'var(--paper)'
        }}>
          <div className="md:flex items-center justify-between gap-6">
            <div>
              <p className="font-display text-2xl gradient-text mb-2">Are you a 3D artist?</p>
              <p className="text-muted">
                List your models, set your price, and get paid. Creator tools
                coming soon.
              </p>
            </div>
            <button
              className="btn mt-4 md:mt-0 whitespace-nowrap"
              aria-disabled
              title="Coming soon"
            >
              Join as a seller
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
