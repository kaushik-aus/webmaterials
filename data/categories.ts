export type Category = {
  slug: string;
  title: string;
  emoji: string;
};

export const categories: Category[] = [
  { slug: "architecture", title: "Architecture", emoji: "🏛️" },
  { slug: "characters", title: "Characters", emoji: "👤" },
  { slug: "furniture", title: "Furniture", emoji: "🪑" },
  { slug: "vehicles", title: "Vehicles", emoji: "🚗" },
  { slug: "nature", title: "Nature", emoji: "🌳" },
  { slug: "props", title: "Props", emoji: "📦" },
  { slug: "animals", title: "Animals", emoji: "🦁" },
  { slug: "weapons", title: "Weapons", emoji: "⚔️" },
];
