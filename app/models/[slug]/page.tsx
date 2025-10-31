import { notFound } from "next/navigation";
import { models, formatPrice } from "@/data/models";
import { ModelViewer } from "@/components/viewers/ModelViewer";
import AddToCart from "./purchase";

export function generateStaticParams() {
  return models.map((m) => ({ slug: m.slug }));
}

export default async function ModelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const model = models.find((m) => m.slug === slug);
  if (!model) return notFound();

  return (
    <section className="container py-10">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <ModelViewer src={model.modelUrl} />
          <div className="mt-3 text-sm text-muted">
            Use mouse/touch to orbit. Scroll to zoom.
          </div>
        </div>
        <div>
          <h1 className="font-display text-4xl gradient-text mb-2">{model.title}</h1>
          <p className="text-muted text-lg">by {model.author.name}</p>
          <p className="mt-6 text-ink leading-relaxed">{model.description}</p>
          <div className="mt-8 flex items-center gap-5">
            <div className="text-3xl font-semibold text-cyan-400">
              {formatPrice(model.priceInCents)}
            </div>
            <AddToCart slug={model.slug} />
          </div>
          <ul className="mt-8 text-sm text-muted space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              <span>Formats: GLB (example), add FBX/OBJ on upload (soon)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              <span>License: Standard (set per model later)</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="font-display text-2xl gradient-text mb-4">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {model.tags.map((t) => (
            <span
              key={t}
              className="text-xs rounded-full border border-cyan-400/50 px-4 py-2 glass hover:border-cyan-400 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
