import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, getAllProductIds } from "@/lib/productRegistry";
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
          {/* 图片区域 - 固定尺寸 480x480 */}
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
      </div>
    </main>
  );
}
