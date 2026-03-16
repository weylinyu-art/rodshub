"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import { categoryNames } from "@/lib/content";
import { gtagEvent } from "@/lib/gtag";

interface Props {
  slug: string;
  productCount?: number;
}

export default function CategoryPageHeader({ slug }: Props) {
  const { lang } = useLanguage();
  const name = categoryNames[slug]?.[lang] ?? categoryNames[slug]?.en ?? slug;

  useEffect(() => {
    gtagEvent("category_view", { category: slug, category_name: name });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-black transition">{t("home", lang)}</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{name}</span>
        </nav>
        <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">{name}</h1>
      </div>
    </div>
  );
}
