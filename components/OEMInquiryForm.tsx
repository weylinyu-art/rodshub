"use client";

import { useState, useEffect } from "react";
import { gtagEvent } from "@/lib/gtag";

const OEM_EMAIL = "hello@rodshub.com";

function buildOEMMailto(data: Record<string, string>): string {
  const nl = "\r\n";
  const pad = (label: string) => label.padEnd(9);
  const body = [
    "Hi RodsHub Team,",
    "",
    "I'd like to start an OEM inquiry.",
    "",
    "[ CONTACT ]",
    `  ${pad("Name")} : ${data.name || "-"}`,
    `  ${pad("Email")} : ${data.email || "-"}`,
    `  ${pad("Company")} : ${data.company || "-"}`,
    `  ${pad("Country")} : ${data.country || "-"}`,
    "",
    "[ TARGET MARKET / QUANTITY ]",
    `  ${data.target || "(not specified)"}`,
    "",
    "[ CUSTOMIZATION REQUIREMENTS ]",
    `  ${(data.message || "(no message)").replace(/\n/g, `${nl}  `)}`,
    "",
    "--",
    "Sent via rodshub.com OEM page",
  ].join(nl);
  const safeBody = body.length > 650 ? body.slice(0, 650) + `${nl}...(truncated)` : body;
  const subject = `RodsHub OEM Inquiry - ${data.company || data.name || "New Inquiry"}`;
  return `mailto:${OEM_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(safeBody)}`;
}

export default function OEMInquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [lastData, setLastData] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    gtagEvent("oem_interest", { source: "oem_page" });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setLastData(data);
    setSubmitted(true);
    gtagEvent("oem_inquiry_submit", {
      has_company: Boolean(data.company),
      country: data.country || "unknown",
    });
    try {
      window.location.href = buildOEMMailto(data);
    } catch {
      // 若浏览器拦截则无操作，用户可点击备用按钮
    }
  };

  const handleCopy = () => {
    const text = [
      `OEM Inquiry`,
      `Name: ${lastData.name || ""}`,
      `Email: ${lastData.email || ""}`,
      `Company: ${lastData.company || ""}`,
      `Country: ${lastData.country || ""}`,
      `Target: ${lastData.target || ""}`,
      `Requirements: ${lastData.message || ""}`,
    ].join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (submitted) {
    const mailto = buildOEMMailto(lastData);
    return (
      <div className="max-w-xl mx-auto bg-white rounded-xl border border-gray-200 p-8 sm:p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900">OEM Inquiry Sent!</h3>
        <p className="mt-2 text-gray-600">Our team will contact you within 24 hours to discuss your customization needs.</p>
        <p className="mt-6 text-sm text-gray-500">
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
            Open Email Client
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-gray-300 text-sm text-gray-700 font-medium rounded-lg hover:border-gray-500 hover:text-black transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            {copied ? "Copied!" : "Copy Content"}
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Or email directly to{" "}
          <a href={`mailto:${OEM_EMAIL}`} className="text-gray-900 underline font-medium">
            {OEM_EMAIL}
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Start OEM Inquiry</h2>
      <p className="text-gray-600 mb-6">Fill in your details and we&apos;ll get back to you within 24 hours.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
            <input id="name" name="name" type="text" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black" placeholder="John Smith" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input id="email" name="email" type="email" required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black" placeholder="john@company.com" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <input id="company" name="company" type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black" placeholder="Your Company" />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <input id="country" name="country" type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black" placeholder="e.g. United States" />
          </div>
        </div>
        <div>
          <label htmlFor="target" className="block text-sm font-medium text-gray-700 mb-1">Target Market / Quantity</label>
          <input id="target" name="target" type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black" placeholder="e.g. US retail, 5000 pcs/month" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Customization Requirements *</label>
          <textarea id="message" name="message" rows={5} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black" placeholder="Rod specs, branding needs, packaging, MOQ expectations..." />
        </div>
        <button type="submit" className="w-full px-8 py-4 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition">
          Submit OEM Inquiry
        </button>
      </form>
    </div>
  );
}
