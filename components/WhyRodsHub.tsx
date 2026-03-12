import Link from "next/link";

export default function WhyRodsHub() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-12 text-center">
          Why Choose RodsHub?
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Global Logistics */}
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Global Logistics Integration</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our supply chain spans key manufacturing regions. We offer strategic warehousing, 
              rapid production cycles, and reliable shipping to North America, Europe, Asia, and Oceania. 
              Export-ready packaging and documentation included.
            </p>
            <div className="flex flex-wrap gap-2">
              {["China", "USA", "EU", "Middle East", "Southeast Asia"].map((r) => (
                <span key={r} className="px-3 py-1 bg-white border border-gray-200 rounded text-sm text-gray-700">
                  {r}
                </span>
              ))}
            </div>
          </div>

          {/* Manufacturing & Design */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 flex gap-6">
              <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=200&h=200&fit=crop"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Precision Manufacturing</h3>
                <p className="text-sm text-gray-600">
                  Carbon, graphite & fiberglass blanks. Stringent QC. Spinning, casting, surf, telescopic & travel rods at scale.
                </p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 flex gap-6">
              <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1559827260-dc66d43bef33?w=200&h=200&fit=crop"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">OEM & Custom Design</h3>
                <p className="text-sm text-gray-600">
                  Custom specs, branding, packaging. Prototype in days. High standards for performance and aesthetics.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/oem"
            className="inline-flex items-center px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
          >
            Start OEM Inquiry
          </Link>
        </div>
      </div>
    </section>
  );
}
