import Link from "next/link";
import { models, formatPrice } from "@/data/models";

export default function HomePage() {
  const featured = models.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden seam-guard">
        <div className="container py-16 md:py-24">
          <p className="uppercase tracking-wide text-xs text-muted mb-2">
            Marketplace for 3D
          </p>
          <h1 className="font-display text-4xl md:text-5xl leading-tight">
            Sell and buy production‑ready 3D models
          </h1>
          <p className="text-muted mt-3 max-w-2xl">
            Preview models live in 3D, purchase securely, and download
            instantly. Built for 3D artists, game devs, and archviz teams.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/models" className="btn">
              Browse models
            </Link>
            <a className="btn btn-secondary" aria-disabled title="Coming soon">
              Become a seller (soon)
            </a>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container pb-12">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-2xl">Featured</h2>
          <Link href="/models" className="text-sm underline">
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
              <div className="p-3">
                <div className="font-semibold">{m.title}</div>
                <div className="text-sm text-muted">
                  by {m.author.name} • {formatPrice(m.priceInCents)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="container my-10">
        <div className="rounded-xl border border-[var(--border)] bg-white/80 p-5 md:p-6 shadow-sm">
          <div className="md:flex items-center justify-between gap-6">
            <div>
              <p className="font-display text-xl">Are you a 3D artist?</p>
              <p className="text-muted">
                List your models, set your price, and get paid. Creator tools
                coming soon.
              </p>
            </div>
            <button
              className="btn mt-3 md:mt-0"
              aria-disabled
              title="Coming soon"
            >
              Join as a seller (soon)
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
