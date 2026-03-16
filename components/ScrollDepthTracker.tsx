"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gtagEvent } from "@/lib/gtag";

const DEPTHS = [25, 50, 75, 90];

/** 监听页面滚动深度，每次路由变化重置，分别在 25/50/75/90% 触发一次事件 */
export default function ScrollDepthTracker() {
  const pathname = usePathname();
  const firedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    firedRef.current = new Set();

    const handleScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      if (total <= 0) return;
      const pct = Math.round((scrolled / total) * 100);
      for (const depth of DEPTHS) {
        if (pct >= depth && !firedRef.current.has(depth)) {
          firedRef.current.add(depth);
          gtagEvent("scroll_depth", { depth_percent: depth, page: pathname });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return null;
}
