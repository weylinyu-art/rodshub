"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { companyIntro } from "@/lib/content";

/** 手绘风格 SVG 插图 - 200+ SKUs / 多品类 */
function IllustrationSKUs() {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: "3 2" }}>
      <rect x="20" y="50" width="25" height="60" rx="2" className="text-white/50" />
      <rect x="55" y="38" width="25" height="72" rx="2" className="text-white/65" />
      <rect x="90" y="52" width="25" height="58" rx="2" className="text-white/50" />
      <rect x="125" y="42" width="25" height="68" rx="2" className="text-white/65" />
      <rect x="160" y="48" width="25" height="62" rx="2" className="text-white/50" />
    </svg>
  );
}

/** 手绘风格 SVG 插图 - 6 Rod Categories */
function IllustrationCategories() {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: "3 2" }}>
      <path d="M28 96 Q48 38 68 96" className="text-white/55" />
      <path d="M78 96 Q95 42 112 96" className="text-white/70" />
      <path d="M118 96 Q135 48 152 96" className="text-white/55" />
      <path d="M158 96 Q172 38 192 96" className="text-white/70" />
      <path d="M48 38 L54 22 M95 42 L98 34 M135 48 L138 38 M172 38 L176 28" className="text-white/45" strokeWidth="1.2" />
    </svg>
  );
}

/** 手绘风格 SVG 插图 - 24h Response */
function IllustrationResponse() {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: "3 2" }}>
      <circle cx="100" cy="60" r="36" className="text-white/65" />
      <path d="M100 28 L100 52 L118 64" className="text-white/85" strokeWidth="2.2" />
      <path d="M72 88 Q98 72 128 88" className="text-white/45" />
      <path d="M88 80 L91 75 L96 78 L93 83 Z M106 80 L109 75 L114 78 L111 83 Z" className="text-white/55" />
    </svg>
  );
}

const ILLUSTRATIONS = [IllustrationSKUs, IllustrationCategories, IllustrationResponse];

export default function CompanyIntro() {
  const { lang } = useLanguage();
  const c = companyIntro[lang] ?? companyIntro.en;
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gray-900 text-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="lg:col-span-1 flex flex-col justify-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">{c.title}</h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base line-clamp-3 sm:line-clamp-none">{c.desc}</p>
            <Link
              href="/about"
              className="mt-4 sm:mt-6 inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-white text-white text-sm font-medium hover:bg-white hover:text-black transition w-fit"
            >
              {c.aboutLink}
            </Link>
          </div>
          {/* 移动端：横向滚动紧凑卡片，图标置于顶部小区域，避免与文字重叠 */}
          <div className="lg:col-span-2 md:hidden -mx-4 px-4 overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 pb-2">
              {c.stats.map((stat, i) => {
                const Illo = ILLUSTRATIONS[i];
                return (
                  <div
                    key={i}
                    className="flex-shrink-0 w-[130px] rounded-lg overflow-hidden bg-gray-800/80 border border-gray-700/50 flex flex-col"
                  >
                    <div className="h-10 flex items-center justify-center shrink-0 opacity-25 overflow-hidden">
                      <Illo />
                    </div>
                    <div className="p-2.5 pt-1 flex-1 flex flex-col justify-end">
                      <h3 className="font-bold text-white text-xs">{stat.title}</h3>
                      <p className="text-[10px] text-gray-400 leading-tight">{stat.subtitle}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* 桌面端：图标置于顶部独立区域，文字在下方，无重叠 */}
          <div className="hidden md:grid lg:col-span-2 md:grid-cols-3 gap-3 sm:gap-4">
            {c.stats.map((stat, i) => {
              const Illo = ILLUSTRATIONS[i];
              return (
                <div
                  key={i}
                  className="rounded-lg overflow-hidden aspect-[16/10] bg-gray-800/80 border border-gray-700/50 flex flex-col group hover:border-gray-500/60 transition-colors min-w-0"
                >
                  <div className="h-12 sm:h-14 flex items-center justify-center shrink-0 opacity-25 group-hover:opacity-35 overflow-hidden">
                    <Illo />
                  </div>
                  <div className="flex-1 flex flex-col justify-end p-3 sm:p-4 pt-1">
                    <h3 className="font-bold text-white text-sm sm:text-base">{stat.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-400 mt-0.5">{stat.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
