import type { Testimonial } from "@/components/ui/animated-testimonials";

export const creatorTestimonials: Testimonial[] = [
  {
    quote:
      "The neon-dark UI is stunning and the checkout flow is buttery smooth. Uploading models is a breeze.",
    name: "Sarah Chen",
    designation: "3D Artist",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop",
    artworks: [
      {
        src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&auto=format&fit=crop",
        alt: "Sci‑fi corridor",
        href: "/models/sci-fi-corridor",
      },
      {
        src: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&auto=format&fit=crop",
        alt: "Neon city kit",
        href: "/models/neon-city-kit",
      },
      {
        src: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&auto=format&fit=crop",
        alt: "Robot concept",
        href: "/models/robot-concept",
      },
      {
        src: "https://images.unsplash.com/photo-1558980394-0c2e5e3b71b4?q=80&auto=format&fit=crop",
        alt: "Hologram console",
        href: "/models/hologram-console",
      },
    ],
  },
  {
    quote:
      "Selling my kitbashes here doubled my exposure. The viewer and previews look premium out of the box.",
    name: "Michael Rodriguez",
    designation: "Kitbash Creator",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&auto=format&fit=crop",
    artworks: [
      {
        src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&auto=format&fit=crop",
        alt: "Ship parts",
        href: "/models/ship-parts",
      },
      {
        src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&auto=format&fit=crop",
        alt: "Mech joints",
        href: "/models/mech-joints",
      },
      {
        src: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&auto=format&fit=crop",
        alt: "Greeble pack",
        href: "/models/greeble-pack",
      },
      {
        src: "https://images.unsplash.com/photo-1524386189629-3b2d5b4a2f28?q=80&auto=format&fit=crop",
        alt: "Panel kit",
        href: "/models/panel-kit",
      },
    ],
  },
  // Add more as needed...
];
