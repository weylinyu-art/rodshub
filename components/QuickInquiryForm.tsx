"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { inquiryForm } from "@/lib/content";

export default function QuickInquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const { lang } = useLanguage();
  const c = inquiryForm[lang] ?? inquiryForm.en;
  const labels = c.labels;
  const placeholders = c.placeholders;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="inquiry" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-xl border border-gray-200 p-12">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">{c.successTitle}</h3>
            <p className="mt-2 text-gray-600">{c.successDesc}</p>
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
        <p className="text-coral-600 font-semibold mb-8">{c.replyNote}</p>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm"
        >
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
            className="mt-8 w-full px-8 py-4 bg-gradient-to-r from-coral-500 to-pink-500 text-white text-lg font-bold rounded-full hover:from-coral-600 hover:to-pink-600 transition shadow-xl shadow-coral-500/40"
          >
            {c.submitBtn}
          </button>
        </form>
      </div>
    </section>
  );
}
