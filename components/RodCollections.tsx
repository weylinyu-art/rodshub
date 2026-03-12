const collections = [
  { name: "Carbon Series", desc: "High-performance carbon fiber rods", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop", slug: "carbon" },
  { name: "Travel Rods", desc: "Compact, portable designs", image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=600&h=400&fit=crop", slug: "travel" },
  { name: "Heavy Duty Rods", desc: "Built for big catches", image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&h=400&fit=crop", slug: "heavy-duty" },
  { name: "Ultralight Rods", desc: "Sensitivity meets finesse", image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&h=400&fit=crop", slug: "ultralight" },
];

export default function RodCollections() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-amber-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-gray-900 mb-2">Rod Collections</h2>
        <p className="text-gray-600 mb-12">Curated collections for every fishing need</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col) => (
            <a
              key={col.slug}
              href={`#${col.slug}`}
              className="group block overflow-hidden rounded-2xl bg-white hover:shadow-2xl hover:shadow-coral/15 transition-all duration-300 ring-2 ring-gray-100 hover:ring-coral/40"
            >
              <div className="aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={col.image}
                  alt={col.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-5 bg-white">
                <h3 className="font-bold text-gray-900 group-hover:text-coral transition">
                  {col.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{col.desc}</p>
                <span className="mt-2 inline-block text-sm font-bold text-coral">
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
