export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Game Developer",
    content: "ModelMart has revolutionized our workflow. The quality and variety of 3D assets are unmatched. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    name: "Sarah Kim",
    role: "3D Artist",
    content: "The anime-style assets are absolutely stunning. I've found everything I need for my projects here. Amazing platform!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    name: "Marcus Rodriguez",
    role: "VR Designer",
    content: "Best marketplace for 3D models. The Liquid Ether UI is so smooth and the assets are top-tier. Five stars!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  },
];
