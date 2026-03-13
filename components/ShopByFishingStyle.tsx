"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { shopByFishingStyle } from "@/lib/content";

const styles = [
  { slug: "freshwater", image: "https://images.pexels.com/photos/14339529/pexels-photo-14339529.jpeg?auto=compress&w=400&h=280&fit=crop", count: "2,400+" },
  { slug: "saltwater", image: "https://images.unsplash.com/photo-1689618601755-ef7ce1230bea?w=400&h=280&fit=crop", count: "1,100+" },
  { slug: "surf", image: "https://images.unsplash.com/photo-1689618601755-ef7ce1230bea?w=400&h=280&fit=crop", count: "580+" },
  { slug: "boat", image: "https://images.pexels.com/photos/18040479/pexels-photo-18040479.jpeg?auto=compress&w=400&h=280&fit=crop", count: "920+" },
  { slug: "ice", image: "https://images.unsplash.com/photo-1537872384762-e785271d14f8?w=400&h=280&fit=crop", count: "340+" },
];

const STYLE_NAMES: Record<string, Record<string, string>> = {
  freshwater: { en: "Freshwater", es: "Agua dulce", fr: "Eau douce", de: "Süßwasser", ar: "المياه العذبة", ru: "Пресная вода", ja: "淡水", ko: "민물", pt: "Água doce" },
  saltwater: { en: "Saltwater", es: "Agua salada", fr: "Eau salée", de: "Salzwasser", ar: "المياه المالحة", ru: "Морская вода", ja: "海水", ko: "바닷물", pt: "Água salgada" },
  surf: { en: "Surf", es: "Surf", fr: "Surf", de: "Surf", ar: "سيرف", ru: "Серф", ja: "サーフ", ko: "서프", pt: "Surf" },
  boat: { en: "Boat", es: "Bote", fr: "Bateau", de: "Boot", ar: "القارب", ru: "Лодка", ja: "ボート", ko: "보트", pt: "Barco" },
  ice: { en: "Ice Fishing", es: "Pesca en hielo", fr: "Pêche sur glace", de: "Eisangeln", ar: "صيد الجليد", ru: "Зимняя рыбалка", ja: "アイスフィッシング", ko: "빙어낚시", pt: "Pesca no gelo" },
};

export default function ShopByFishingStyle() {
  const { lang } = useLanguage();
  const c = shopByFishingStyle[lang] ?? shopByFishingStyle.en;
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black text-gray-900 mb-2">{c.title}</h2>
        <p className="text-gray-600 mb-12">{c.subtitle}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {styles.map((style) => (
            <Link
              key={style.slug}
              href={`/scenario/${style.slug}`}
              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white hover:shadow-xl hover:border-gray-400 transition-all duration-300 block"
            >
              <div className="aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={style.image}
                  alt={STYLE_NAMES[style.slug]?.[lang] ?? style.slug}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
                <h3 className="font-bold text-white">{STYLE_NAMES[style.slug]?.[lang] ?? style.slug}</h3>
                <p className="text-sm text-gray-300 font-medium">{style.count} {c.rods}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
