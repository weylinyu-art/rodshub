import Link from "next/link";

const STATS = [
  {
    title: "200+ SKUs",
    subtitle: "Across 6 Categories",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
  },
  {
    title: "6 Rod Categories",
    subtitle: "Spinning · Casting · Surf · Ice · Travel",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&h=400&fit=crop",
  },
  {
    title: "24h Response",
    subtitle: "Inquiry Reply Guarantee",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&h=400&fit=crop",
  },
];

export default function CompanyIntro() {
  return (
    <section className="py-16 sm:py-24 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-4">RodsHub</h2>
            <p className="text-gray-300 leading-relaxed">
              Dedicated to fishing rod sourcing, we provide ample stock for fast fulfillment and efficient logistics. 
              From spinning to surf rods, our catalog meets global market demands with competitive B2B pricing and OEM support.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center px-4 py-2 border border-white text-white text-sm font-medium hover:bg-white hover:text-black transition"
            >
              About Us →
            </Link>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="relative rounded-lg overflow-hidden aspect-[4/3] group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={stat.image}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-bold text-white">{stat.title}</h3>
                  <p className="text-sm text-gray-300">{stat.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
