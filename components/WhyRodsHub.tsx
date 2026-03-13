"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { whyRodsHub } from "@/lib/content";

export default function WhyRodsHub() {
  const { lang } = useLanguage();
  const c = whyRodsHub[lang] ?? whyRodsHub.en;
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-12 text-center">
          {c.title}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{c.block1Title}</h3>
            <p className="text-gray-600 leading-relaxed mb-6">{c.block1Desc}</p>
            <div className="flex flex-wrap gap-2">
              {c.regions.map((r) => (
                <span key={r} className="px-3 py-1 bg-white border border-gray-200 rounded text-sm text-gray-700">
                  {r}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 flex gap-6">
              <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1624218656926-da680b8127c9?w=200&h=200&fit=crop"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{c.block2Title}</h3>
                <p className="text-sm text-gray-600">{c.block2Desc}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 flex gap-6">
              <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1537872384762-e785271d14f8?w=200&h=200&fit=crop"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">{c.block3Title}</h3>
                <p className="text-sm text-gray-600">{c.block3Desc}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/oem"
            className="inline-flex items-center px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
          >
            {c.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
