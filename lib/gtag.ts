export const GA_ID = "G-XY9P88CDSX";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

/** 追踪页面浏览（SPA 路由切换时调用） */
export function gtagPageView(url: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("config", GA_ID, { page_path: url });
}

/** 追踪自定义事件 */
export function gtagEvent(
  name: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}
