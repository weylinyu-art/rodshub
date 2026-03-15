"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CLICK_TRACKER_URL = process.env.NEXT_PUBLIC_CLICK_TRACKER_URL || "";
const STORAGE_KEY = "rodshub_click_counts";

function readFromStorage(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

const ClickCountsContext = createContext<Record<string, number>>({});

export function ClickCountsProvider({ children }: { children: React.ReactNode }) {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    if (CLICK_TRACKER_URL) {
      fetch(`${CLICK_TRACKER_URL}/counts`)
        .then((r) => r.json())
        .then((data) => setCounts(typeof data === "object" ? data : {}))
        .catch(() => {});
    } else {
      setCounts(readFromStorage());
    }
  }, []);

  return (
    <ClickCountsContext.Provider value={counts}>
      {children}
    </ClickCountsContext.Provider>
  );
}

export function useClickCounts(): Record<string, number> {
  return useContext(ClickCountsContext) ?? {};
}
