"use client";

import { useState } from "react";

export default function OEMInquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-xl border border-gray-200 p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900">OEM Inquiry Sent!</h3>
        <p className="mt-2 text-gray-600">Our team will contact you within 24 hours to discuss your customization needs.</p>
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
