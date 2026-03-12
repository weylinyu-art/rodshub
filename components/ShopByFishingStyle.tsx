const styles = [
  { name: "Freshwater", slug: "freshwater", image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=400&h=280&fit=crop", count: "2,400+ rods" },
  { name: "Saltwater", slug: "saltwater", image: "https://images.unsplash.com/photo-1559827260-dc66d43bef33?w=400&h=280&fit=crop", count: "1,100+ rods" },
  { name: "Surf", slug: "surf", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=280&fit=crop", count: "580+ rods" },
  { name: "Boat", slug: "boat", image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=280&fit=crop", count: "920+ rods" },
  { name: "Ice Fishing", slug: "ice", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=280&fit=crop", count: "340+ rods" },
];

export default function ShopByFishingStyle() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-gray-900 mb-2">Shop by Fishing Style</h2>
        <p className="text-gray-600 mb-12">Find the perfect rod for your fishing environment</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {styles.map((style) => (
            <a
              key={style.slug}
              href={`#${style.slug}`}
              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white hover:shadow-xl hover:border-gray-400 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={style.image}
                  alt={style.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                <h3 className="font-bold text-white">{style.name}</h3>
                <p className="text-sm text-gray-300 font-medium">{style.count}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
