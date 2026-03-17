"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gtagEvent } from "@/lib/gtag";

const ERROR_TRACKER_URL = process.env.NEXT_PUBLIC_ERROR_TRACKER_URL || "";
const MAX_REPORTS_PER_PAGE = 5;
const MAX_TEXT_LEN = 400;

type ErrorPayload = {
  kind: "error" | "unhandledrejection";
  message: string;
  stack: string;
  path: string;
  userAgent: string;
  timestamp: string;
};

function truncate(input: unknown): string {
  const text = typeof input === "string" ? input : String(input ?? "");
  return text.length > MAX_TEXT_LEN ? `${text.slice(0, MAX_TEXT_LEN)}...` : text;
}

function postError(payload: ErrorPayload) {
  if (!ERROR_TRACKER_URL || typeof window === "undefined") return;
  try {
    const body = JSON.stringify(payload);
    const endpoint = `${ERROR_TRACKER_URL.replace(/\/$/, "")}/client-error`;
    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, new Blob([body], { type: "application/json" }));
      return;
    }
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Keep reporting best-effort to avoid secondary crashes.
  }
}

export default function ClientErrorReporter() {
  const pathname = usePathname();
  const countRef = useRef(0);
  const sentRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    countRef.current = 0;
    sentRef.current = new Set();
  }, [pathname]);

  useEffect(() => {
    const report = (kind: "error" | "unhandledrejection", message: unknown, stack?: unknown) => {
      const msg = truncate(message || "unknown_error");
      const stackText = truncate(stack || "");
      const key = `${kind}:${msg}`;

      if (sentRef.current.has(key)) return;
      if (countRef.current >= MAX_REPORTS_PER_PAGE) return;

      sentRef.current.add(key);
      countRef.current += 1;

      gtagEvent("client_exception", {
        kind,
        page: pathname,
        message: msg,
      });

      postError({
        kind,
        message: msg,
        stack: stackText,
        path: pathname,
        userAgent: truncate(typeof navigator !== "undefined" ? navigator.userAgent : "unknown"),
        timestamp: new Date().toISOString(),
      });
    };

    const onError = (event: ErrorEvent) => {
      const fallbackStack =
        event.filename && event.lineno
          ? `${event.filename}:${event.lineno}:${event.colno}`
          : "";
      report("error", event.message, event.error?.stack ?? fallbackStack);
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      if (reason instanceof Error) {
        report("unhandledrejection", reason.message, reason.stack);
        return;
      }
      report("unhandledrejection", truncate(reason), "");
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandledRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, [pathname]);

  return null;
}

