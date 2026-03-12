import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-black transition">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Privacy Policy</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Privacy Policy</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Information We Collect</h2>
            <p>We collect information you provide when submitting an inquiry, including name, email, company, and message content. This is used solely to respond to your requests and facilitate B2B transactions.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">How We Use Your Data</h2>
            <p>Your information is used to process inquiries, communicate with you about products and orders, and improve our services. We do not sell or share your personal data with third parties for marketing purposes.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, or disclosure.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Contact</h2>
            <p>For privacy-related questions, contact us at <a href="mailto:hello@rodshub.com" className="text-black hover:underline">hello@rodshub.com</a>.</p>
          </section>
          <p className="text-sm text-gray-500">Last updated: 2025</p>
        </div>
      </div>
    </main>
  );
}
