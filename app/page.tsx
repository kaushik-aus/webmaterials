import Link from "next/link";
import { models, formatPrice } from "@/data/models";
import { NeonHeading } from "@/components/ui/NeonHeading";
import { MangaDivider } from "@/components/ui/MangaDivider";
import { KatakanaChip } from "@/components/ui/KatakanaChip";

export default function HomePage() {
  const featured = models.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden seam-guard">
        <div className="container py-16 md:py-24">
          <KatakanaChip showDot size="sm" className="mb-4">
            マーケットプレイス
          </KatakanaChip>
          <NeonHeading as="h1" size="lg">
            Sell and buy production‑ready 3D models
          </NeonHeading>
          <p className="text-muted mt-6 max-w-2xl text-lg">
            Preview models live in 3D, purchase securely, and download
            instantly. Built for 3D artists, game devs, and archviz teams.
          </p>
          <div className="mt-8 flex gap-3 flex-wrap">
            <Link href="/models" className="btn">
              Browse models
            </Link>
            <button className="btn btn-secondary" aria-disabled title="Coming soon">
              Become a seller (soon)
            </button>
          </div>
        </div>
      </section>

      <MangaDivider label="フィーチャード" />

      {/* Featured */}
      <section className="container pb-12">
        <div className="mb-6 flex items-end justify-between">
          <NeonHeading as="h2" size="md">
            Featured Models
          </NeonHeading>
          <Link href="/models" className="link-hover text-sm font-semibold">
            View all
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
                <div className="font-semibold text-ink mb-2">{m.title}</div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {m.tags.slice(0, 2).map((tag) => (
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

      <MangaDivider variant="double" showScreentone />

      {/* CTA strip */}
      <section className="container my-10">
        <div className="rounded-xl border border-mikan-700/40 p-6 md:p-8 relative overflow-hidden" style={{
          background: "linear-gradient(135deg, rgba(249, 115, 22, 0.05) 0%, rgba(234, 88, 12, 0.05) 100%)"
        }}>
          <div className="md:flex items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <NeonHeading as="h3" size="sm">
                  Are you a 3D artist?
                </NeonHeading>
                <KatakanaChip variant="filled" size="sm">
                  クリエイター
                </KatakanaChip>
              </div>
              <p className="text-muted text-base">
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
