"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { testimonials } from "@/lib/content";
import { gtagEvent } from "@/lib/gtag";

export default function Testimonials() {
  const { lang } = useLanguage();
  const c = testimonials[lang] ?? testimonials.en;
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center">
          {c.title}
        </h2>
        <p className="text-gray-600 text-center mb-12">{c.subtitle}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {c.items.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex gap-2 mb-4">
                {item.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
              <blockquote className="text-gray-700 text-sm leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <p className="mt-4 font-medium text-gray-900 text-sm">— {item.author}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/inquiry" onClick={() => gtagEvent("inquiry_click", { source: "testimonials" })} className="inline-flex items-center px-6 py-2 text-sm font-semibold text-gray-900 hover:text-black">
            {c.shareLink}
          </Link>
        </div>
      </div>
    </section>
  );
}
