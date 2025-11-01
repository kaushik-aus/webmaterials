export interface Slide {
  id: number;
  image?: string;
  gradient: string;
  title: string;
  subtitle: string;
  cta: string;
}

export const slides: Slide[] = [
  {
    id: 1,
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    title: "Neon Drop Collection",
    subtitle: "Explore stunning 3D models with vibrant anime aesthetics",
    cta: "Shop Now",
  },
  {
    id: 2,
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    title: "Character Studio",
    subtitle: "Premium character models for your next project",
    cta: "Browse Collection",
  },
  {
    id: 3,
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    title: "Future Ready Assets",
    subtitle: "Professional 3D models for games, animation & VR",
    cta: "Get Started",
  },
];
