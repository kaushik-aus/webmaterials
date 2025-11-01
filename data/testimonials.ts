export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Yuki Tanaka",
    role: "Game Developer",
    content:
      "ModelMart has completely transformed my workflow. The quality of assets and the anime-inspired designs are exactly what I needed for my projects. Highly recommended!",
  },
  {
    id: 2,
    name: "Alex Rivera",
    role: "3D Artist",
    content:
      "The best marketplace I've found for high-quality 3D models. The user experience is seamless, and the variety of models is incredible. A must-have for any 3D creator.",
  },
  {
    id: 3,
    name: "Sophie Chen",
    role: "Animation Director",
    content:
      "Outstanding collection of assets with fantastic quality. ModelMart makes it easy to find exactly what you need and integrate it into your pipeline. Five stars!",
  },
];
