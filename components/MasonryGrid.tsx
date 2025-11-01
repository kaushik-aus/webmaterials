"use client";

import Image from "next/image";
import { assets } from "@/data/assets";

/**
 * Responsive masonry grid using CSS columns.
 * Features:
 * - White asset cards with subtle hover lift
 * - Responsive columns (1 on mobile, 2 on tablet, 3-4 on desktop)
 * - Shadow effects for depth
 */
export default function MasonryGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Featured Assets
        </h2>

        {/* CSS Columns Masonry */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="break-inside-avoid mb-6"
            >
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group cursor-pointer">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={asset.image}
                    alt={asset.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">{asset.title}</h3>
                    <span className="text-[#FF6600] font-bold text-lg">{asset.price}</span>
                  </div>
                  <p className="text-sm text-gray-500">{asset.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
