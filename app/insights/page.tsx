import type { Metadata } from "next";
import Link from "next/link";
import { INSIGHT_BLOCKS } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Fishing Insights | RodsHub",
  description: "Fishing rod types, materials, power & action, supplier selection, manufacturing, and line/lure guides.",
};

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
            Industry knowledge for smarter rod sourcing — rod types, materials, power & action, supplier selection, manufacturing, and more.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {INSIGHT_BLOCKS.map((block) => (
          <article
            key={block.id}
            id={block.id}
            className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4">{block.title}</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              {block.content.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-16 text-center">
        <Link
          href="/inquiry"
          className="inline-flex items-center justify-center px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
        >
          Ask us about sourcing
        </Link>
      </div>
    </main>
  );
}
