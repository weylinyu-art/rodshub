import Link from "next/link";

const QUOTES = [
  {
    quote: "First year partnering with RodsHub. Their catalog and OEM support helped us launch a private-label line. Reply within 24 hours every time. Highly recommend for B2B rod sourcing.",
    author: "Retail Partner, North America",
    tags: ["Sales +180%", "Margin +215%"],
  },
  {
    quote: "We needed a reliable supplier for surf and casting rods. RodsHub delivered on quality and lead time. Their packaging is export-ready, which saved us a lot of hassle.",
    author: "Wholesale Buyer, Europe",
    tags: ["Quality", "On-time"],
  },
  {
    quote: "OEM customization was smooth from prototype to production. Custom branding and specs handled professionally. Will definitely reorder.",
    author: "Brand Owner, Southeast Asia",
    tags: ["OEM", "Flexible"],
  },
  {
    quote: "Competitive prices and a wide range of rod types. We now source spinning, telescopic, and ice rods from one place. Logistics support is solid.",
    author: "Distributor, Middle East",
    tags: ["Value", "Variety"],
  },
  {
    quote: "The 200+ SKU catalog and category filters made it easy to find exactly what we needed. Customer service is responsive and helpful.",
    author: "Retail Chain, Australia",
    tags: ["Catalog", "Service"],
  },
];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {QUOTES.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex gap-2 mb-4">
                {item.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
              <blockquote className="text-gray-700 text-sm leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <p className="mt-4 font-medium text-gray-900 text-sm">— {item.author}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
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
