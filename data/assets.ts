export interface Asset {
  id: number;
  title: string;
  author: string;
  price: string;
  image: string;
  height?: number;
}

export const assets: Asset[] = [
  {
    id: 1,
    title: "Cyberpunk Character",
    author: "Neon Studios",
    price: "$49.99",
    image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=600&q=80&auto=format&fit=crop",
    height: 350,
  },
  {
    id: 2,
    title: "Anime Girl Portrait",
    author: "ArtByMika",
    price: "$39.99",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&q=80&auto=format&fit=crop",
    height: 280,
  },
  {
    id: 3,
    title: "Sci-Fi Environment",
    author: "FutureLab",
    price: "$79.99",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80&auto=format&fit=crop",
    height: 320,
  },
  {
    id: 4,
    title: "Mecha Robot",
    author: "TechArt",
    price: "$59.99",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80&auto=format&fit=crop",
    height: 380,
  },
  {
    id: 5,
    title: "Fantasy Weapon Set",
    author: "BladeCraft",
    price: "$29.99",
    image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=600&q=80&auto=format&fit=crop",
    height: 250,
  },
  {
    id: 6,
    title: "Urban Street Scene",
    author: "CityScapes",
    price: "$89.99",
    image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=600&q=80&auto=format&fit=crop",
    height: 340,
  },
  {
    id: 7,
    title: "Anime Character Pack",
    author: "StudioGhibli3D",
    price: "$99.99",
    image: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=600&q=80&auto=format&fit=crop",
    height: 290,
  },
  {
    id: 8,
    title: "Futuristic Vehicle",
    author: "VehicleWorks",
    price: "$69.99",
    image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=600&q=80&auto=format&fit=crop",
    height: 310,
  },
];
