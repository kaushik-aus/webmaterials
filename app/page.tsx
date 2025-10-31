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
        <div className="rounded-xl border border-muted/60 p-5 md:p-6">
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
