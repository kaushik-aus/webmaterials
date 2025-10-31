import { notFound } from "next/navigation";
import { models, formatPrice } from "@/data/models";
import { ModelViewer } from "@/components/viewers/ModelViewer";
import AddToCart from "./purchase";

export function generateStaticParams() {
  return models.map((m) => ({ slug: m.slug }));
}

export default function ModelDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const model = models.find((m) => m.slug === params.slug);
  if (!model) return notFound();

  return (
    <section className="container py-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <ModelViewer src={model.modelUrl} />
          <div className="mt-2 text-xs text-muted">
            Use mouse/touch to orbit. Scroll to zoom.
          </div>
        </div>
        <div>
          <h1 className="font-display text-3xl">{model.title}</h1>
          <p className="text-muted mt-1">by {model.author.name}</p>
          <p className="mt-4">{model.description}</p>
          <div className="mt-6 flex items-center gap-4">
            <div className="text-2xl font-semibold">
              {formatPrice(model.priceInCents)}
            </div>
            <AddToCart slug={model.slug} />
          </div>
          <ul className="mt-6 text-sm text-muted list-disc pl-5">
            <li>Formats: GLB (example), add FBX/OBJ on upload (soon)</li>
            <li>License: Standard (set per model later)</li>
          </ul>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="font-display text-xl mb-3">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {model.tags.map((t) => (
            <span
              key={t}
              className="text-xs rounded-full border border-muted/60 px-3 py-1 bg-white"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
