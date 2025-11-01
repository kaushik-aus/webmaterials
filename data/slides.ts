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
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=80&auto=format&fit=crop",
    title: "Neon Drop Collection",
    subtitle: "Explore stunning 3D models with vibrant anime aesthetics",
    cta: "Shop Now",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1600&q=80&auto=format&fit=crop",
    title: "Character Studio",
    subtitle: "Premium character models for your next project",
    cta: "Browse Collection",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=1600&q=80&auto=format&fit=crop",
    title: "Future Ready Assets",
    subtitle: "Professional 3D models for games, animation & VR",
    cta: "Get Started",
  },
];
