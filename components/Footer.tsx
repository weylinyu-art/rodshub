"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import ShareCurrentPage from "@/components/ShareCurrentPage";

const EMAIL = "hello@rodshub.com";
const WHATSAPP = "+86 19957106387";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP.replace(/\D/g, "")}`;

const WhatsAppIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const CopyIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

export default function Footer() {
  const pathname = usePathname();
  const { lang } = useLanguage();
  const [copiedWhatsapp, setCopiedWhatsapp] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const handleCopy = async (text: string, setter: (v: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      setter(true);
      setTimeout(() => setter(false), 2000);
    } catch {
      /* ignore */
    }
  };
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
            <div className="flex items-center gap-2 flex-wrap">
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-sm hover:text-white transition">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {EMAIL}
              </a>
              <button
                type="button"
                onClick={() => handleCopy(EMAIL, setCopiedEmail)}
                className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded border border-gray-600 hover:border-gray-500 hover:text-white transition"
              >
                {copiedEmail ? (
                  <span className="text-emerald-400">{t("copied", lang)}</span>
                ) : (
                  <>
                    <CopyIcon />
                    <span>{t("copy", lang)}</span>
                  </>
                )}
              </button>
            </div>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm hover:text-white transition">
                <WhatsAppIcon />
                <span>{WHATSAPP}</span>
              </a>
              <button
                type="button"
                onClick={() => handleCopy(WHATSAPP, setCopiedWhatsapp)}
                className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded border border-gray-600 hover:border-gray-500 hover:text-white transition"
              >
                {copiedWhatsapp ? (
                  <span className="text-emerald-400">{t("copied", lang)}</span>
                ) : (
                  <>
                    <CopyIcon />
                    <span>{t("copy", lang)}</span>
                  </>
                )}
              </button>
            </div>
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
          <div>
            <h3 className="font-bold text-white mb-4">
              {pathname === "/" ? t("shareRodsHub", lang) : t("shareThisPage", lang)}
            </h3>
            <p className="text-sm text-gray-400 mb-3">{t("shareWithNetwork", lang)}</p>
            <ShareCurrentPage />
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} RodsHub. {t("allRightsReserved", lang)}
        </div>
      </div>
    </footer>
  );
}
