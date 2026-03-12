import Link from "next/link";

const EMAIL = "hello@rodshub.com";
const WHATSAPP = "+8613800138000";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-white mb-4">RodsHub</h3>
            <p className="text-sm">The global B2B marketplace for fishing rod sourcing.</p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Contact Us</h3>
            <a href={`mailto:${EMAIL}`} className="block text-sm hover:text-white transition">
              {EMAIL}
            </a>
            <a href={`https://wa.me/${WHATSAPP.replace(/\+/g, "")}`} target="_blank" rel="noopener noreferrer" className="block text-sm mt-2 hover:text-white transition">
              WhatsApp: {WHATSAPP}
            </a>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Company</h3>
            <Link href="/about" className="block text-sm hover:text-white transition">About Us</Link>
            <Link href="/contact" className="block text-sm mt-2 hover:text-white transition">Contact</Link>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Legal</h3>
            <Link href="/privacy" className="block text-sm hover:text-white transition">Privacy Policy</Link>
            <Link href="/faq" className="block text-sm mt-2 hover:text-white transition">FAQ</Link>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} RodsHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
