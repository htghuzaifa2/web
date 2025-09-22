
import type { Metadata } from "next";
import productsData from "@/data/products.json";
import ProductDetailsWrapper from "./product-details-wrapper";
import { calculateOriginalPrice } from "@/lib/utils";

interface ProductPageProps {
  params: { slug: string };
}

export const dynamicParams = true;

export async function generateStaticParams() {
  return productsData.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const slug = params.slug;
  const product = productsData.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    };
  }
  
  const originalPrice = calculateOriginalPrice(product.price);
  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      type: 'article',
      title: product.name,
      description: product.description,
      url: `/product/${slug}`,
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.name,
        },
        ...(product.additionalImages || []).map(img => ({
          url: img,
          width: 800,
          height: 800,
          alt: `${product.name} additional image`,
        }))
      ],
      siteName: 'huzi.pk'
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  return <ProductDetailsWrapper slug={slug} />;
}
