"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { valueCards } from "@/lib/content";
import { t } from "@/lib/i18n";

const ICONS = [
  <svg key="0" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>,
  <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
  <svg key="3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
];

export default function ValueCards() {
  const { lang } = useLanguage();
  return (
    <section className="py-12 sm:py-16 bg-gray-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{t("yourTrustedPartner", lang)}</h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">{t("bestPricesSupport", lang)}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {valueCards.map((card, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200">
              <div className="w-12 h-12 rounded-xl bg-gray-900 text-white flex items-center justify-center mb-4">{ICONS[i]}</div>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{card.title[lang] ?? card.title.en}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{card.desc[lang] ?? card.desc.en}</p>
              {i === 1 && (
                <Link href="/oem" className="mt-4 text-sm font-semibold text-gray-900 hover:text-black transition">{t("learnMore", lang)}</Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
