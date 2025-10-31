import Link from "next/link";
import { categories } from "@/data/categories";

export function BentoCategories() {
  return (
    <section className="container py-12">
      <div className="mb-8 text-center">
        <h2 className="font-display text-3xl md:text-4xl">
          Explore by Category
        </h2>
        <p className="text-muted mt-2">
          Find the perfect asset for your project
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/models?category=${category.slug}`}
            className="card group hover:shadow-lg transition-all duration-300 p-6 text-center"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
              {category.emoji}
            </div>
            <div className="font-semibold text-lg">{category.title}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
