export interface Asset {
  id: number;
  title: string;
  author: string;
  price: string;
  image?: string;
  gradient: string;
  height?: number;
}

export const assets: Asset[] = [
  {
    id: 1,
    title: "Cyberpunk Character",
    author: "Neon Studios",
    price: "$49.99",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    height: 350,
  },
  {
    id: 2,
    title: "Anime Girl Portrait",
    author: "ArtByMika",
    price: "$39.99",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    height: 280,
  },
  {
    id: 3,
    title: "Sci-Fi Environment",
    author: "FutureLab",
    price: "$79.99",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    height: 320,
  },
  {
    id: 4,
    title: "Mecha Robot",
    author: "TechArt",
    price: "$59.99",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    height: 380,
  },
  {
    id: 5,
    title: "Fantasy Weapon Set",
    author: "BladeCraft",
    price: "$29.99",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    height: 250,
  },
  {
    id: 6,
    title: "Urban Street Scene",
    author: "CityScapes",
    price: "$89.99",
    gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    height: 340,
  },
  {
    id: 7,
    title: "Anime Character Pack",
    author: "StudioGhibli3D",
    price: "$99.99",
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    height: 290,
  },
  {
    id: 8,
    title: "Futuristic Vehicle",
    author: "VehicleWorks",
    price: "$69.99",
    gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    height: 310,
  },
];
