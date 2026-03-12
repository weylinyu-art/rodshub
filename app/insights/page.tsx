import Link from "next/link";
import { ARTICLES } from "@/lib/insights";

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-black transition">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Fishing Insights</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Fishing Insights</h1>
          <p className="mt-1 text-gray-600">
            Industry knowledge for smarter sourcing
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARTICLES.map((article) => (
            <article
              key={article.slug}
              className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 hover:shadow-lg transition-all"
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
                <h2 className="font-semibold text-gray-900 group-hover:text-black transition line-clamp-2">
                  {article.title}
                </h2>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{article.excerpt}</p>
                <span className="mt-2 inline-block text-sm font-medium text-gray-900">Read more →</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
