const collections = [
  { name: "Carbon Series", desc: "High-performance carbon fiber rods", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop", slug: "carbon" },
  { name: "Travel Rods", desc: "Compact, portable designs", image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=600&h=400&fit=crop", slug: "travel" },
  { name: "Heavy Duty Rods", desc: "Built for big catches", image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&h=400&fit=crop", slug: "heavy-duty" },
  { name: "Ultralight Rods", desc: "Sensitivity meets finesse", image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&h=400&fit=crop", slug: "ultralight" },
];

export default function RodCollections() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Rod Collections</h2>
        <p className="text-gray-600 mb-12">Curated collections for every fishing need</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col) => (
            <a
              key={col.slug}
              href={`#${col.slug}`}
              className="group block overflow-hidden rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-200"
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={col.image}
                  alt={col.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 bg-white">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition">
                  {col.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{col.desc}</p>
                <span className="mt-2 inline-block text-sm font-medium text-blue-600">
                  Explore →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
