"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

const EMAIL = "hello@rodshub.com";
const WHATSAPP = "+8613800138000";

export default function Footer() {
  const { lang } = useLanguage();
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-white mb-4">RodsHub</h3>
            <p className="text-sm">{t("footerTagline", lang)}</p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">{t("contactUs", lang)}</h3>
            <a href={`mailto:${EMAIL}`} className="block text-sm hover:text-white transition">
              {EMAIL}
            </a>
            <a href={`https://wa.me/${WHATSAPP.replace(/\+/g, "")}`} target="_blank" rel="noopener noreferrer" className="block text-sm mt-2 hover:text-white transition">
              WhatsApp: {WHATSAPP}
            </a>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">{t("company", lang)}</h3>
            <Link href="/about" className="block text-sm hover:text-white transition">{t("aboutUs", lang)}</Link>
            <Link href="/contact" className="block text-sm mt-2 hover:text-white transition">{t("contact", lang)}</Link>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">{t("legal", lang)}</h3>
            <Link href="/privacy" className="block text-sm hover:text-white transition">{t("privacyPolicy", lang)}</Link>
            <Link href="/faq" className="block text-sm mt-2 hover:text-white transition">{t("faq", lang)}</Link>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} RodsHub. {t("allRightsReserved", lang)}
        </div>
      </div>
    </footer>
  );
}
