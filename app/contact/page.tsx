import Link from "next/link";

const EMAIL = "hello@rodshub.com";
const WHATSAPP = "+8613800138000";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-black transition">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Contact Us</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Contact Us</h1>
          <p className="mt-1 text-gray-600">Reach us by email or WhatsApp. We reply within 24 hours.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-2">Email</h2>
            <a href={`mailto:${EMAIL}`} className="text-gray-600 hover:text-black transition">
              {EMAIL}
            </a>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-2">WhatsApp</h2>
            <a href={`https://wa.me/${WHATSAPP.replace(/\+/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition">
              {WHATSAPP}
            </a>
            <p className="mt-2 text-sm text-gray-500">Click to chat on WhatsApp. Business hours: Mon–Fri 9:00–18:00 (UTC+8)</p>
          </div>
          <Link href="/inquiry" className="inline-flex items-center px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition">
            Send Inquiry Form
          </Link>
        </div>
      </div>
    </main>
  );
}
