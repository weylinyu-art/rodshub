"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import { gtagEvent } from "@/lib/gtag";

export default function HomeCTA() {
  const { lang } = useLanguage();
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-2xl mx-auto text-center px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("readyToSource", lang)}</h2>
        <p className="text-gray-600 mb-6">{t("sendInquiryPrompt", lang)}</p>
        <Link
          href="/inquiry"
          onClick={() => gtagEvent("inquiry_click", { source: "home_cta" })}
          className="inline-flex items-center px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
        >
          {t("sendInquiry", lang)}
        </Link>
      </div>
    </section>
  );
}
