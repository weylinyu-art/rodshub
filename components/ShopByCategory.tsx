"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { shopByCategory, categoryNames } from "@/lib/content";

const CATEGORIES = [
  { slug: "spinning" as const, count: "1,240+", image: "https://images.unsplash.com/photo-1529230117010-b6c436154f25?w=400&h=300&fit=crop" },
  { slug: "casting" as const, count: "890+", image: "https://images.unsplash.com/photo-1624218656926-da680b8127c9?w=400&h=300&fit=crop" },
  { slug: "telescopic" as const, count: "620+", image: "https://images.unsplash.com/photo-1525134055640-f42ef8a7032d?w=400&h=300&fit=crop" },
  { slug: "surf" as const, count: "380+", image: "https://images.unsplash.com/photo-1689618601755-ef7ce1230bea?w=400&h=300&fit=crop" },
  { slug: "ice" as const, count: "210+", image: "https://images.unsplash.com/photo-1537872384762-e785271d14f8?w=400&h=300&fit=crop" },
  { slug: "travel" as const, count: "540+", image: "https://images.pexels.com/photos/14339529/pexels-photo-14339529.jpeg?auto=compress&w=400&h=300&fit=crop" },
];

export default function ShopByCategory() {
  const { lang } = useLanguage();
  const c = shopByCategory[lang] ?? shopByCategory.en;
  return (
    <section id="categories" className="py-12 sm:py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{c.title}</h2>
        <p className="text-gray-500 mb-8">{c.subtitle}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => {
            const name = categoryNames[cat.slug]?.[lang] ?? categoryNames[cat.slug]?.en ?? cat.slug;
            return (
              <a
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group block bg-gray-50 rounded-lg overflow-hidden border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all duration-200"
              >
                <div className="aspect-square overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.image}
                    alt={name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 text-center">
                  <h3 className="font-semibold text-gray-900 text-sm group-hover:text-black transition">
                    {name}
                  </h3>
                  <p className="mt-0.5 text-xs text-gray-500">{cat.count} {c.products}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
