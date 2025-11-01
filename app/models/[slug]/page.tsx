import { notFound } from "next/navigation";
import { models, formatPrice } from "@/data/models";
import { ModelViewer } from "@/components/viewers/ModelViewer";
import AddToCart from "./purchase";
import { NeonHeading } from "@/components/ui/NeonHeading";
import { KatakanaChip } from "@/components/ui/KatakanaChip";
import { MangaDivider } from "@/components/ui/MangaDivider";

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
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <ModelViewer src={model.modelUrl} />
          <div className="mt-3 text-sm text-muted">
            Use mouse/touch to orbit. Scroll to zoom.
          </div>
        </div>
        <div>
          <NeonHeading as="h1" size="md">{model.title}</NeonHeading>
          <p className="text-muted mt-2">by {model.author.name}</p>
          <p className="mt-4 text-ink-muted">{model.description}</p>
          <div className="mt-6 flex items-center gap-4">
            <div className="text-3xl font-semibold gradient-text">
              {formatPrice(model.priceInCents)}
            </div>
            <AddToCart slug={model.slug} />
          </div>
          <ul className="mt-6 text-sm text-muted list-disc pl-5 space-y-1">
            <li>Formats: GLB (example), add FBX/OBJ on upload (soon)</li>
            <li>License: Standard (set per model later)</li>
          </ul>
        </div>
      </div>
      
      <MangaDivider className="my-8" />
      
      <div>
        <h2 className="font-display text-xl mb-4 gradient-text">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {model.tags.map((t) => (
            <KatakanaChip key={t} label={t} icon />
          ))}
        </div>
      </div>
    </section>
  );
}
