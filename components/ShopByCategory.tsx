const categories = [
  { name: "Spinning Rods", slug: "spinning", count: "1,240+", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop" },
  { name: "Casting Rods", slug: "casting", count: "890+", image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=300&fit=crop" },
  { name: "Telescopic Rods", slug: "telescopic", count: "620+", image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=300&fit=crop" },
  { name: "Surf Rods", slug: "surf", count: "380+", image: "https://images.unsplash.com/photo-1559827260-dc66d43bef33?w=400&h=300&fit=crop" },
  { name: "Ice Fishing Rods", slug: "ice", count: "210+", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=300&fit=crop" },
  { name: "Travel Rods", slug: "travel", count: "540+", image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=400&h=300&fit=crop" },
];

export default function ShopByCategory() {
  return (
    <section id="categories" className="py-12 sm:py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Shop by Category</h2>
        <p className="text-gray-500 mb-8">Browse our catalog by rod type</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group block bg-gray-50 rounded-lg overflow-hidden border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all duration-200"
            >
              <div className="aspect-square overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="font-semibold text-gray-900 text-sm group-hover:text-black transition">
                  {cat.name}
                </h3>
                <p className="mt-0.5 text-xs text-gray-500">{cat.count} products</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
