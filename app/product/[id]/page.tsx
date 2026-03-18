import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getProductById, getAllProductIds, getRelatedProducts, getRealProduct, isVariantSku, getFamilyId } from "@/lib/productRegistry";
import { filterDetailPageImages, applyListImageOverride } from "@/lib/realProducts";
import { getProductDetail } from "@/lib/productDetail";
import ProductDetailContent from "@/components/ProductDetailContent";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, absoluteUrl, buildOpenGraph, buildTwitter } from "@/lib/seo";

const SITE_URL_IMPORT = SITE_URL;

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getAllProductIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const familyId = getFamilyId(id);
  const product = getProductById(id);
  if (!product) return { title: "Product Not Found" };

  const title = `${product.name} | B2B Wholesale`;
  const specs = [product.material, product.length, product.power, product.fishingStyle].filter(Boolean).join(" · ");
  const desc = `B2B wholesale: ${product.name} at ${product.price}. ${specs ? specs + ". " : ""}MOQ from 30 pcs. RodsHub.`;
  const path = `/product/${familyId}`;
  const rawImgs = (product.images && product.images.length > 0 ? product.images : [product.image]) as string[];
  const filtered = getRealProduct(id) ? filterDetailPageImages(product.id, rawImgs) : rawImgs;
  const image = (filtered[0] || product.image) as string;

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
  // 变种 SKU 不单独展示：统一重定向到主 SKU
  const familyId = getFamilyId(id);
  if (familyId !== id) redirect(`/product/${familyId}`);
  const product = getProductById(id);
  if (!product) notFound();

  const detail = getProductDetail(product);
  const rawImgs = (product.images && product.images.length > 0 ? product.images : [product.image]) as string[];
  const imgList = getRealProduct(id) ? filterDetailPageImages(product.id, rawImgs) : rawImgs;
  const related = getRelatedProducts(id, 16).map(applyListImageOverride);

  const priceMatch = product.price?.match(/\$?([\d.]+)/);
  const priceNum = priceMatch ? parseFloat(priceMatch[1]) : undefined;
  const productSchema = {
    "@context": "https://schema.org" as const,
    "@type": "Product" as const,
    name: product.name,
    description: detail.description.slice(0, 500),
    image: imgList,
    brand: { "@type": "Brand" as const, name: "RodsHub" },
    sku: product.id,
    itemCondition: "https://schema.org/NewCondition" as const,
    category: product.fishingStyle || "Fishing Rods",
    offers: {
      "@type": "Offer" as const,
      price: priceNum ?? product.price,
      priceCurrency: "USD" as const,
      availability: "https://schema.org/InStock" as const,
      url: absoluteUrl(`/product/${id}`),
      priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      seller: { "@id": `${SITE_URL}/#organization` },
    },
    ...(product.material && { material: product.material }),
    ...(product.length && { size: product.length }),
    ...(product.power && { additionalProperty: [{ "@type": "PropertyValue" as const, name: "Power", value: product.power }] }),
  };

  // 面包屑：Home → Category → Product（三级结构，Rich Results 更完整）
  const categorySlug = (product.fishingStyle ?? "").toLowerCase().replace(/\s+/g, "-") || null;
  const categoryName = categorySlug
    ? categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1) + " Rods"
    : null;
  const breadcrumbSchema = {
    "@context": "https://schema.org" as const,
    "@type": "BreadcrumbList" as const,
    itemListElement: [
      { "@type": "ListItem" as const, position: 1, name: "Home", item: SITE_URL },
      ...(categorySlug && categoryName
        ? [{ "@type": "ListItem" as const, position: 2, name: categoryName, item: absoluteUrl(`/category/${categorySlug}`) }]
        : []),
      { "@type": "ListItem" as const, position: categorySlug ? 3 : 2, name: product.name, item: absoluteUrl(`/product/${id}`) },
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
