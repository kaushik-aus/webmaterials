import Link from "next/link";
import { models, formatPrice } from "@/data/models";
import { SpotlightHero } from "@/components/ui/SpotlightHero";
import { BentoCategories } from "@/components/ui/BentoCategories";
import { CreatorsMarquee } from "@/components/ui/CreatorsMarquee";

export default function HomePage() {
  const featured = models.slice(0, 3);

  return (
    <>
      {/* New Hero Component */}
      <SpotlightHero />

      {/* Bento Categories */}
      <BentoCategories />

      {/* Creators Marquee */}
      <CreatorsMarquee />

      {/* Featured */}
      <section className="container pb-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-3xl gradient-text">Featured</h2>
          <Link
            href="/models"
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            View all →
          </Link>
        </div>
        <div className="grid-auto">
          {featured.map((m) => (
            <Link
              href={`/models/${m.slug}`}
              key={m.slug}
              className="card group block"
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
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="container my-10">
        <div className="glass rounded-xl p-6 md:p-8 border border-cyan-400/30 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
          <div className="md:flex items-center justify-between gap-6">
            <div>
              <p className="font-display text-2xl gradient-text">
                Are you a 3D artist?
              </p>
              <p className="text-muted mt-2 text-lg">
                List your models, set your price, and get paid. Creator tools
                coming soon.
              </p>
            </div>
            <button
              className="btn mt-4 md:mt-0 opacity-60 cursor-not-allowed"
              aria-disabled
              title="Coming soon"
              disabled
            >
              Join as a seller (soon)
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
