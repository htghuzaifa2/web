
import type { Metadata } from "next";
import productsData from "@/data/products.json";
import ProductDetailsWrapper from "./product-details-wrapper";
import { notFound } from "next/navigation";

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

  const description = product.description || product.longDescription || "Discover high-quality products at huzi.pk";

  return {
    title: product.name,
    description: description,
    openGraph: {
      type: 'article',
      title: product.name,
      description: description,
      url: `/product/${product.slug}`,
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
      description: description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  
  const product = productsData.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailsWrapper slug={slug} />;
}
