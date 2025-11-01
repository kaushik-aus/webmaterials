"use client";

import Image from "next/image";
import { assets } from "@/data/assets";

export default function MasonryGrid() {
  return (
    <section className="container py-16 md:py-24">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-ink">
        Featured Assets
      </h2>

      {/* CSS Columns Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="break-inside-avoid mb-4 bg-white rounded-lg shadow-s hover:shadow-l transition-shadow cursor-pointer group overflow-hidden"
          >
            <div className="relative w-full overflow-hidden">
              <Image
                src={asset.image}
                alt={asset.title}
                width={600}
                height={asset.height || 300}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-ink mb-1">{asset.title}</h3>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">by {asset.author}</p>
                <p className="font-bold text-accent">{asset.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
