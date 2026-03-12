const ARTICLES = [
  {
    title: "How to Choose a Fishing Rod Supplier",
    excerpt: "Key factors for B2B buyers: quality, MOQ, lead time, and certification.",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=360&fit=crop",
    slug: "choose-supplier",
  },
  {
    title: "Spinning Rod vs Casting Rod",
    excerpt: "Understand the differences and choose the right type for your market.",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&h=360&fit=crop",
    slug: "spinning-vs-casting",
  },
  {
    title: "Carbon Fiber Fishing Rod Guide",
    excerpt: "Materials, grades, and what to look for when sourcing carbon rods.",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&h=360&fit=crop",
    slug: "carbon-fiber-guide",
  },
  {
    title: "Fishing Rod Manufacturing Process",
    excerpt: "From blank to finished product: a behind-the-scenes look.",
    image: "https://images.unsplash.com/photo-1559827260-dc66d43bef33?w=600&h=360&fit=crop",
    slug: "manufacturing-process",
  },
];

export default function FishingInsights() {
  return (
    <section id="insights" className="py-16 sm:py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-black mb-2">Fishing Insights</h2>
        <p className="text-gray-600 mb-10">Industry knowledge for smarter sourcing</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARTICLES.map((article) => (
            <a
              key={article.slug}
              href={`#insights-${article.slug}`}
              className="group block bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all"
            >
              <div className="aspect-[5/3] overflow-hidden bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-black group-hover:text-gray-600 transition line-clamp-2">
                  {article.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{article.excerpt}</p>
                <span className="mt-2 inline-block text-sm font-medium text-black">Read more →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
