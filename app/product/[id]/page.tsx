import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, getAllProductIds, getRelatedProducts } from "@/lib/productRegistry";
import { getProductDetail } from "@/lib/productDetail";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductDetailRecommend from "@/components/ProductDetailRecommend";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getAllProductIds().map((id) => ({ id }));
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const detail = getProductDetail(product);
  const imgList = (product.images && product.images.length > 0 ? product.images : [product.image]) as string[];
  const related = getRelatedProducts(id, 8);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-black transition">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* 左侧：图片 */}
          <ProductImageGallery images={imgList} alt={product.name} />

          {/* 右侧：产品信息 + 服务保证 */}
          <div className="space-y-6">
            {product.badge && (
              <span className="inline-block px-2 py-1 bg-emerald-600 text-white text-xs font-medium rounded">
                {product.badge}
              </span>
            )}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>
            <p className="text-xl font-bold text-gray-900">{product.price}</p>

            {/* 规格摘要 */}
            <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {product.length && (
                <div>
                  <dt className="text-gray-500">Length</dt>
                  <dd className="font-medium text-gray-900">{product.length}</dd>
                </div>
              )}
              {product.material && (
                <div>
                  <dt className="text-gray-500">Material</dt>
                  <dd className="font-medium text-gray-900">{product.material}</dd>
                </div>
              )}
              {product.power && (
                <div>
                  <dt className="text-gray-500">Power</dt>
                  <dd className="font-medium text-gray-900">{product.power}</dd>
                </div>
              )}
            </dl>

            {/* 询价按钮 */}
            <Link
              href="/inquiry"
              className="inline-flex items-center justify-center w-full sm:w-auto px-10 py-3.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition"
            >
              Inquiry Now
            </Link>

            {/* 服务与保证（物流、24h、质量） */}
            <div className="pt-6 border-t border-gray-200 space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Logistics</h3>
                  <p className="text-sm text-gray-600">Supporting air freight and sea shipping, with delivery within 6–9 business days at the fastest.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">24-Hour Service</h3>
                  <p className="text-sm text-gray-600">If you have any problems, please contact customer service. We reply within 24 hours.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-700">High Quality Guaranteed</h3>
                  <p className="text-sm text-gray-600">All products manufactured by RodsHub meet the highest quality standards. Please read the specifications before ordering.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 下方：描述、规格、卖点、Packaging & Delivery */}
        <div className="mt-12 lg:mt-16 space-y-8">
          {/* 描述 */}
          <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-600 leading-relaxed">{detail.description}</p>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              {product.material && (
                <div className="flex gap-2">
                  <span className="text-gray-500">Material:</span>
                  <span className="font-medium">{product.material}</span>
                </div>
              )}
              {product.length && (
                <div className="flex gap-2">
                  <span className="text-gray-500">Length:</span>
                  <span className="font-medium">{product.length}</span>
                </div>
              )}
              {product.power && (
                <div className="flex gap-2">
                  <span className="text-gray-500">Power:</span>
                  <span className="font-medium">{product.power}</span>
                </div>
              )}
            </div>
          </section>

          {/* Specifications */}
          <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Specifications</h2>
            <table className="w-full text-sm">
              <tbody>
                {detail.specifications.map(({ label, value }) => (
                  <tr key={label} className="border-b border-gray-100 last:border-0">
                    <td className="py-3 pr-4 text-gray-500">{label}</td>
                    <td className="py-3 font-medium text-gray-900">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Key Features */}
          <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Key Features</h2>
            <ul className="space-y-2">
              {detail.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600">
                  <span className="text-emerald-600 mt-1">•</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Packaging & Delivery */}
          <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Packaging & Delivery</h2>
            <div className="space-y-4 text-gray-600">
              <p className="leading-relaxed">
                Each rod is carefully packaged in individual protective sleeves and sturdy tubes to prevent damage during transit. Bulk orders are palletized and wrapped for sea freight compatibility.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600">✓</span>
                  Standard export carton packaging; OEM branding available
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600">✓</span>
                  Air freight: 6–9 business days; Sea freight: 20–35 days
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600">✓</span>
                  FOB/CIF available; documentation included
                </li>
              </ul>
            </div>
          </section>

          {/* Recommend */}
          {related.length > 0 && (
            <ProductDetailRecommend products={related} />
          )}
        </div>
      </div>
    </main>
  );
}
