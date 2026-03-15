"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ShareButtons from "./ShareButtons";
import { SITE_URL, SHARE_RECOMMENDED_COPIES } from "@/lib/seo";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

/** 首页/默认分享文案 */
const DEFAULT_TITLE = "RodsHub – B2B Fishing Rod Marketplace";
const DEFAULT_DESC = "200+ SKUs, wholesale $8-18, 24h reply. OEM available. Source spinning, casting, telescopic, surf, ice & travel rods.";

/** 从 DOM 读取当前页面的 meta 信息，用于分享时展示当前页亮点 */
function usePageMeta() {
  const pathname = usePathname();
  const [meta, setMeta] = useState({ title: DEFAULT_TITLE, description: DEFAULT_DESC });

  useEffect(() => {
    const read = () => {
      if (typeof document === "undefined") return;
      const title = document.title?.trim();
      const ogDesc =
        document.querySelector('meta[property="og:description"]')?.getAttribute("content") ||
        document.querySelector('meta[name="description"]')?.getAttribute("content");
      // 使用当前页面 title 和 description，若缺失则用默认
      setMeta({
        title: title && !title.includes("Not Found") ? title : DEFAULT_TITLE,
        description: (ogDesc?.trim().slice(0, 160) as string) || DEFAULT_DESC,
      });
    };
    read();
    const t = setTimeout(read, 100);
    return () => clearTimeout(t);
  }, [pathname]);

  return meta;
}

/** 获取具吸引力的社交分享文案：中文优先，否则按语言 */
function getSocialShareMessage(lang: string): string {
  if (typeof navigator !== "undefined" && navigator.language?.startsWith("zh")) {
    return SHARE_RECOMMENDED_COPIES.zh;
  }
  return t("shareRecommendedCopy", lang as "en");
}

export default function ShareCurrentPage() {
  const pathname = usePathname();
  const { lang } = useLanguage();
  const { title, description } = usePageMeta();
  const url = pathname ? `${SITE_URL}${pathname}` : SITE_URL;
  const socialShareMessage = getSocialShareMessage(lang);

  return (
    <ShareButtons
      url={url}
      title={title}
      description={description}
      socialShareMessage={socialShareMessage}
      variant="compact"
      className="[&_a]:bg-gray-700 [&_a]:text-gray-200 [&_a:hover]:bg-gray-600 [&_a:hover]:text-white [&_button]:bg-gray-700 [&_button]:text-gray-200 [&_button:hover]:bg-gray-600 [&_button:hover]:text-white"
    />
  );
}
