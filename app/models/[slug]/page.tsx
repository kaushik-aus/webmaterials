import { notFound } from "next/navigation";
import { models, formatPrice } from "@/data/models";
import { ModelViewer } from "@/components/viewers/ModelViewer";
import { NeonHeading } from "@/components/ui/NeonHeading";
import { KatakanaChip } from "@/components/ui/KatakanaChip";
import { MangaDivider } from "@/components/ui/MangaDivider";
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
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <ModelViewer src={model.modelUrl} />
          <div className="mt-3 text-sm text-muted flex items-center gap-2">
            <KatakanaChip size="sm" showDot>3D</KatakanaChip>
            <span>Use mouse/touch to orbit. Scroll to zoom.</span>
          </div>
        </div>
        <div>
          <NeonHeading as="h1" size="md">
            {model.title}
          </NeonHeading>
          <p className="text-muted mt-2 text-base">by {model.author.name}</p>
          <p className="mt-4 text-paper-warm leading-relaxed">{model.description}</p>
          <div className="mt-6 flex items-center gap-4">
            <div className="text-3xl font-semibold text-brand">
              {formatPrice(model.priceInCents)}
            </div>
            <AddToCart slug={model.slug} />
          </div>
          <ul className="mt-6 text-sm text-muted space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-brand">•</span>
              <span>Formats: GLB (example), add FBX/OBJ on upload (soon)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-brand">•</span>
              <span>License: Standard (set per model later)</span>
            </li>
          </ul>
        </div>
      </div>
      
      <MangaDivider label="タグ" className="mt-12" />
      
      <div className="mt-8">
        <div className="flex flex-wrap gap-2">
          {model.tags.map((t) => (
            <KatakanaChip key={t} variant="outlined">
              {t}
            </KatakanaChip>
          ))}
        </div>
      </div>
    </section>
  );
}
