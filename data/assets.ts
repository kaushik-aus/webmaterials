export interface Asset {
  id: number;
  title: string;
  image: string;
  price: string;
  category: string;
}

export const assets: Asset[] = [
  {
    id: 1,
    title: "Cyber Samurai",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=400&fit=crop",
    price: "$29",
    category: "Characters",
  },
  {
    id: 2,
    title: "Neon City",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop",
    price: "$49",
    category: "Environments",
  },
  {
    id: 3,
    title: "Futuristic Weapon",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
    price: "$19",
    category: "Props",
  },
  {
    id: 4,
    title: "Anime Girl",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=400&fit=crop",
    price: "$39",
    category: "Characters",
  },
  {
    id: 5,
    title: "Holographic UI",
    image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=400&h=400&fit=crop",
    price: "$24",
    category: "UI Elements",
  },
  {
    id: 6,
    title: "Robot Companion",
    image: "https://images.unsplash.com/photo-1546776310-eef45dd6d63c?w=400&h=400&fit=crop",
    price: "$34",
    category: "Characters",
  },
  {
    id: 7,
    title: "Cyberpunk Vehicle",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    price: "$44",
    category: "Vehicles",
  },
  {
    id: 8,
    title: "Sci-Fi Building",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop",
    price: "$54",
    category: "Environments",
  },
];
