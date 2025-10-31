export type Model = {
  slug: string;
  title: string;
  description: string;
  priceInCents: number;
  thumbnail: string;
  modelUrl: string;
  author: { name: string; handle: string; avatar?: string };
  tags: string[];
};

export const models: Model[] = [
  {
    slug: "astronaut",
    title: "Astronaut",
    description:
      "Rigged astronaut character. Great for demos and space scenes.",
    priceInCents: 1999,
    thumbnail:
      "https://images.unsplash.com/photo-1543946207-39bd91e70ca7?w=800&q=80&auto=format&fit=crop",
    modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
    author: { name: "Nova Studio", handle: "@nova" },
    tags: ["character", "game-ready"],
  },
  {
    slug: "chair",
    title: "Classic Chair",
    description: "Photoreal chair, PBR materials, good topology.",
    priceInCents: 1299,
    thumbnail:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&q=80&auto=format&fit=crop",
    modelUrl: "https://modelviewer.dev/assets/ShopifyModels/Chair.glb",
    author: { name: "Forma", handle: "@forma" },
    tags: ["furniture", "archviz"],
  },
  {
    slug: "robot",
    title: "Robot Head",
    description: "Stylized mech head for concept pieces.",
    priceInCents: 999,
    thumbnail:
      "https://images.unsplash.com/photo-1512446816042-444d641267d4?w=800&q=80&auto=format&fit=crop",
    modelUrl:
      "https://modelviewer.dev/shared-assets/models/RobotExpressive.glb",
    author: { name: "MechaLab", handle: "@mecha" },
    tags: ["hard-surface", "stylized"],
  },
];

export function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
