import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById, getAllProductIds, getRelatedProducts, getRealProduct, isVariantSku } from "@/lib/productRegistry";
import { getProductDetail } from "@/lib/productDetail";
import ProductDetailContent from "@/components/ProductDetailContent";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, absoluteUrl, buildOpenGraph, buildTwitter } from "@/lib/seo";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getAllProductIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Product Not Found" };

  const title = `${product.name} | B2B Wholesale`;
  const desc = `${product.name} - ${product.price}${product.moq ? `, MOQ ${product.moq}` : ""}. ${product.material || ""} ${product.length || ""} ${product.power || ""}. RodsHub B2B fishing rod sourcing.`;
  const path = `/product/${id}`;
  const image = (product.images?.[0] || product.image) as string;

  return {
    title,
    description: desc.slice(0, 160),
    keywords: [product.name, product.fishingStyle, "wholesale", "B2B", "fishing rod"].filter((x): x is string => !!x),
    openGraph: buildOpenGraph(title, desc, path, image),
    twitter: buildTwitter(title, desc, image),
    alternates: { canonical: absoluteUrl(path) },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const detail = getProductDetail(product);
  const imgList = (product.images && product.images.length > 0 ? product.images : [product.image]) as string[];
  const related = getRelatedProducts(id, 8);

  const productSchema = {
    "@context": "https://schema.org" as const,
    "@type": "Product" as const,
    name: product.name,
    description: detail.description.slice(0, 500),
    image: imgList,
    brand: { "@type": "Brand" as const, name: "RodsHub" },
    sku: product.id,
    offers: {
      "@type": "Offer" as const,
      price: product.price,
      priceCurrency: "USD" as const,
      availability: "https://schema.org/InStock" as const,
      url: absoluteUrl(`/product/${id}`),
    },
    ...(product.material && { material: product.material }),
    ...(product.length && { size: product.length }),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org" as const,
    "@type": "BreadcrumbList" as const,
    itemListElement: [
      { "@type": "ListItem" as const, position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem" as const, position: 2, name: product.name, item: absoluteUrl(`/product/${id}`) },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <JsonLd data={[productSchema, breadcrumbSchema]} />
      <ProductDetailContent
        product={product}
        detail={detail}
        imgList={imgList}
        related={related}
        realProduct={getRealProduct(id)}
        initialVariantSku={isVariantSku(id) ? id : undefined}
      />
    </main>
  );
}
