import Link from "next/link";

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center">
          What Our Buyers Say
        </h2>
        <p className="text-gray-600 text-center mb-12">
          Thousands of wholesalers have grown their rod business with RodsHub
        </p>

        <div className="max-w-4xl mx-auto bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex gap-4 mb-4">
                <span className="px-3 py-1 bg-gray-100 rounded text-sm font-medium text-gray-700">Sales +180%</span>
                <span className="px-3 py-1 bg-gray-100 rounded text-sm font-medium text-gray-700">Margin +215%</span>
              </div>
              <blockquote className="text-gray-700 leading-relaxed">
                &ldquo;First year partnering with RodsHub. Their catalog and OEM support helped us launch a private-label line. 
                Reply within 24 hours every time. Highly recommend for B2B rod sourcing.&rdquo;
              </blockquote>
              <p className="mt-4 font-medium text-gray-900">— Retail Partner, North America</p>
            </div>
            <div className="relative aspect-[4/3] md:aspect-auto min-h-[200px] bg-gray-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.pexels.com/photos/18040479/pexels-photo-18040479.jpeg?auto=compress&w=600&h=400&fit=crop"
                alt="Fishing"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/inquiry"
            className="inline-flex items-center px-6 py-2 text-sm font-semibold text-gray-900 hover:text-black"
          >
            Share your success story →
          </Link>
        </div>
      </div>
    </section>
  );
}
