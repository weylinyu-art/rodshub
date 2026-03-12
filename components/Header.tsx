"use client";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600">RodsHub</span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#categories" className="text-gray-600 hover:text-blue-600 transition">
              Categories
            </a>
            <a href="#trending" className="text-gray-600 hover:text-blue-600 transition">
              Trending
            </a>
            <a href="#wholesale" className="text-gray-600 hover:text-blue-600 transition">
              Wholesale
            </a>
            <a href="#oem" className="text-gray-600 hover:text-blue-600 transition">
              OEM
            </a>
            <a href="#inquiry" className="text-gray-600 hover:text-blue-600 transition">
              Inquiry
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <a
              href="#inquiry"
              className="hidden sm:inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium"
            >
              Send Inquiry
            </a>
            <a
              href="#trending"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Browse Rods
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
