"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { inquiryForm } from "@/lib/content";
import { gtagEvent } from "@/lib/gtag";

const INQUIRY_EMAIL = "hello@rodshub.com";

function buildMailto(data: Record<string, string>): string {
  const nl = "\r\n"; // CRLF：兼容 Gmail / Outlook / Apple Mail
  const pad = (label: string) => label.padEnd(9);
  const body = [
    "Hi RodsHub Team,",
    "",
    "[ CONTACT ]",
    `  ${pad("Name")} : ${data.name || "-"}`,
    `  ${pad("Email")} : ${data.email || "-"}`,
    `  ${pad("Company")} : ${data.company || "-"}`,
    `  ${pad("Country")} : ${data.country || "-"}`,
    "",
    "[ PRODUCT INTEREST ]",
    `  ${data.product || "(not specified)"}`,
    "",
    "[ MESSAGE ]",
    `  ${(data.message || "(no message)").replace(/\n/g, `${nl}  `)}`,
    "",
    "--",
    "Sent via rodshub.com inquiry form",
  ].join(nl);
  // 保持总 URL 在 1800 字符以内（CRLF 编码后每个换行占 6 字符）
  const safeBody = body.length > 650 ? body.slice(0, 650) + `${nl}...(truncated)` : body;
  const subject = `RodsHub Inquiry - ${data.name || "New Inquiry"}`;
  return `mailto:${INQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(safeBody)}`;
}

export default function QuickInquiryForm() {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [lastData, setLastData] = useState<Record<string, string> | null>(null);
  const [copied, setCopied] = useState(false);
  const { lang } = useLanguage();
  const c = inquiryForm[lang] ?? inquiryForm.en;
  const labels = c.labels;
  const placeholders = c.placeholders;

  const showSuccess = submitted || searchParams.get("success") === "1";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData) as Record<string, string>;
    setLastData(data);
    setSubmitted(true);
    // GA4 事件（异步发出，不阻塞）—— mailto 不会离开页面，事件能正常发送
    gtagEvent("inquiry_submit", {
      method: "email_form",
      has_product: Boolean(data.product),
      country: data.country || "unknown",
    });
    // 在用户手势同步上下文中触发，确保浏览器允许唤起邮箱客户端
    try {
      window.location.href = buildMailto(data);
    } catch {
      // 若浏览器拦截则无操作，用户可点击备用按钮
    }
  };

  const handleCopy = (data: Record<string, string>) => {
    const text = [
      `RodsHub Inquiry`,
      ``,
      `Name: ${data.name || ""}`,
      `Email: ${data.email || ""}`,
      `Company: ${data.company || ""}`,
      `Country: ${data.country || ""}`,
      `Product: ${data.product || ""}`,
      `Message: ${data.message || ""}`,
      ``,
      `— Send to ${INQUIRY_EMAIL}`,
    ].join("\n");
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (showSuccess) {
    const data = lastData || {};
    const mailto = buildMailto(data);
    return (
      <section id="inquiry" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-12">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 text-center">{c.successTitle}</h3>
            <p className="mt-2 text-gray-600 text-center">{c.successDesc}</p>
            <p className="mt-6 text-sm text-gray-500 text-center">
              Your email client should have opened automatically. If not:
            </p>
            <div className="mt-3 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={mailto}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-gray-300 text-sm text-gray-700 font-medium rounded-lg hover:border-gray-500 hover:text-black transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {c.openEmailBtn}
              </a>
              <button
                type="button"
                onClick={() => handleCopy(data)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-gray-300 text-sm text-gray-700 font-medium rounded-lg hover:border-gray-500 hover:text-black transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                {copied ? c.copied : c.copyContent}
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-500 text-center">
              {c.emailDirectlyTo} <a href={`mailto:${INQUIRY_EMAIL}`} className="text-gray-900 underline font-medium">{INQUIRY_EMAIL}</a>
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="inquiry" className="py-16 sm:py-24 bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{c.title}</h2>
        <p className="text-gray-600 mb-2">{c.subtitle}</p>
        <p className="text-orange-600 font-semibold mb-8">{c.replyNote}</p>
        <p className="mb-6 text-sm text-gray-500">
          Or email directly: <a href={`mailto:${INQUIRY_EMAIL}?subject=RodsHub%20Inquiry`} className="text-gray-900 underline font-medium">{INQUIRY_EMAIL}</a>
        </p>
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                {labels.name} <span className="text-red-500">*</span>
              </label>
              <input id="name" name="name" type="text" required placeholder={placeholders.name}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {labels.email} <span className="text-red-500">*</span>
              </label>
              <input id="email" name="email" type="email" required placeholder={placeholders.email}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">{labels.company}</label>
              <input id="company" name="company" type="text" placeholder={placeholders.company}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">{labels.country}</label>
              <input id="country" name="country" type="text" placeholder={placeholders.country}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">{labels.product}</label>
            <input id="product" name="product" type="text" placeholder={placeholders.product}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="mt-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              {labels.message} <span className="text-red-500">*</span>
            </label>
            <textarea id="message" name="message" rows={4} required placeholder={placeholders.message}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <button
            type="submit"
            className="mt-8 w-full min-h-[48px] px-8 py-4 bg-gray-900 hover:bg-black text-white text-lg font-bold rounded-lg transition shadow-md border-2 border-gray-900"
          >
            {c.submitBtn}
          </button>
        </form>
      </div>
    </section>
  );
}
