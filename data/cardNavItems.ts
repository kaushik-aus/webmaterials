export const cardNavItems = [
  {
    label: "Discover",
    bgColor: "rgba(0,236,255,0.08)",
    textColor: "rgb(224,242,254)",
    links: [
      { label: "Trending Models", href: "/models?sort=trending" },
      { label: "New Releases", href: "/models?sort=new" },
      { label: "Top Creators", href: "/models?sort=creators" },
    ],
  },
  {
    label: "Categories",
    bgColor: "rgba(214,89,255,0.08)",
    textColor: "rgb(243,232,255)",
    links: [
      { label: "Architecture", href: "/models?category=architecture" },
      { label: "Characters", href: "/models?category=characters" },
      { label: "Vehicles", href: "/models?category=vehicles" },
    ],
  },
  {
    label: "Create",
    bgColor: "rgba(255,64,129,0.08)",
    textColor: "rgb(255,228,235)",
    links: [
      { label: "Upload Model", href: "/dashboard/upload" },
      { label: "Guides", href: "/docs/getting-started" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
] as const;
