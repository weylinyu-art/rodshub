"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { companyIntro } from "@/lib/content";

const STAT_IMAGES = [
  "https://images.unsplash.com/photo-1525134055640-f42ef8a7032d?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1624218656926-da680b8127c9?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1529230117010-b6c436154f25?w=600&h=400&fit=crop",
];

export default function CompanyIntro() {
  const { lang } = useLanguage();
  const c = companyIntro[lang] ?? companyIntro.en;
  return (
    <section className="py-16 sm:py-24 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-4">{c.title}</h2>
            <p className="text-gray-300 leading-relaxed">{c.desc}</p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center px-4 py-2 border border-white text-white text-sm font-medium hover:bg-white hover:text-black transition"
            >
              {c.aboutLink}
            </Link>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {c.stats.map((stat, i) => (
              <div key={i} className="relative rounded-lg overflow-hidden aspect-[4/3] group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={STAT_IMAGES[i]}
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
