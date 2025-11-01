export interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  cta: string;
}

export const slides: Slide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop",
    title: "Neon Drop Collection",
    subtitle: "Premium 3D assets with anime aesthetics",
    cta: "Explore Now",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=600&fit=crop",
    title: "Future Forward",
    subtitle: "Next-gen models for your creative projects",
    cta: "Get Started",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1200&h=600&fit=crop",
    title: "Limitless Possibilities",
    subtitle: "Transform your vision into reality",
    cta: "Discover More",
  },
];
