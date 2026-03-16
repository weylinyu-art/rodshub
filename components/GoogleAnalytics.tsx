"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { GA_ID, gtagPageView } from "@/lib/gtag";

/**
 * GA4 轻量接入：
 * 1. 加载 gtag.js（afterInteractive，不阻塞首屏）
 * 2. 监听 Next.js 路由变化，自动上报 page_view
 */
export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    gtagPageView(pathname);
  }, [pathname]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
