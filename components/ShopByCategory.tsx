const categories = [
  { name: "Spinning Rods", slug: "spinning", count: "1,240", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop" },
  { name: "Casting Rods", slug: "casting", count: "890", image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=300&fit=crop" },
  { name: "Telescopic Rods", slug: "telescopic", count: "620", image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400&h=300&fit=crop" },
  { name: "Surf Rods", slug: "surf", count: "380", image: "https://images.unsplash.com/photo-1559827260-dc66d43bef33?w=400&h=300&fit=crop" },
  { name: "Ice Fishing Rods", slug: "ice", count: "210", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=300&fit=crop" },
  { name: "Travel Rods", slug: "travel", count: "540", image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=400&h=300&fit=crop" },
];

export default function ShopByCategory() {
  return (
    <section id="categories" className="py-16 sm:py-24 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-gray-900 mb-2">Shop by Category</h2>
        <p className="text-gray-600 mb-12">Browse our extensive collection of fishing rod types</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-coral/20 transition-all duration-300 border-2 border-transparent hover:border-coral"
            >
              <div className="aspect-square overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="px-5 py-2.5 bg-coral text-white font-bold rounded-full shadow-lg animate-pulse">
                    View Products
                  </span>
                </div>
                <span className="absolute top-2 right-2 px-2 py-0.5 bg-amber-400 text-gray-900 text-xs font-bold rounded-full">
                  {cat.count}
                </span>
              </div>
              <div className="p-4 text-center bg-white">
                <h3 className="font-bold text-gray-900 group-hover:text-coral transition">
                  {cat.name}
                </h3>
                <p className="mt-1 text-sm text-amber-600 font-medium">{cat.count} products</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
