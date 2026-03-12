import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, getAllProductIds } from "@/lib/productRegistry";
import { getProductDetail } from "@/lib/productDetail";
import ProductImageGallery from "@/components/ProductImageGallery";

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

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-black transition">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* 图片区域 - 固定尺寸 */}
          <ProductImageGallery images={imgList} alt={product.name} />

          {/* 产品信息 */}
          <div>
            {product.badge && (
              <span className="inline-block px-2 py-0.5 bg-black text-white text-xs font-medium rounded mb-3">
                {product.badge}
              </span>
            )}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-xl font-bold text-gray-900 mb-4">{product.price}</p>
            {product.moq && (
              <p className="text-gray-600 mb-6">MOQ: {product.moq}</p>
            )}

            {/* 规格摘要 */}
            <dl className="space-y-2 mb-8">
              {product.length && (
                <div>
                  <dt className="text-sm text-gray-500">Length</dt>
                  <dd className="font-medium">{product.length}</dd>
                </div>
              )}
              {product.material && (
                <div>
                  <dt className="text-sm text-gray-500">Material</dt>
                  <dd className="font-medium">{product.material}</dd>
                </div>
              )}
              {product.power && (
                <div>
                  <dt className="text-sm text-gray-500">Power</dt>
                  <dd className="font-medium">{product.power}</dd>
                </div>
              )}
            </dl>

            <Link
              href="/#inquiry"
              className="inline-flex items-center justify-center px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
            >
              Send Inquiry
            </Link>
          </div>
        </div>

        {/* 详情区域：描述、规格表、卖点 */}
        <div className="mt-12 lg:mt-16 space-y-12">
          <section className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Product Description</h2>
            <p className="text-gray-600 leading-relaxed">{detail.description}</p>
          </section>

          <section className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8">
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

          <section className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Key Features</h2>
            <ul className="space-y-2">
              {detail.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600">
                  <span className="text-black mt-1">•</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
