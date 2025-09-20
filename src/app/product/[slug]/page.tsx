
import { notFound } from "next/navigation";
import productsData from "@/data/products.json";
import ProductDetailsWrapper from "./product-details-wrapper";
import type { Metadata } from "next";

export const dynamicParams = true;

export async function generateStaticParams() {
  return productsData.map((product) => ({
    slug: product.slug,
  }));
}

interface ProductPageProps {
  params: { slug: string };
}

// This is a generic metadata title. The actual title will be set on the client.
export const metadata: Metadata = {
  title: "Product Details",
};

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  
  // Pre-validate the slug to show a 404 if it's invalid.
  const productExists = productsData.some(p => p.slug === slug);
  if (!productExists) {
      notFound();
  }

  return <ProductDetailsWrapper slug={slug} />;
}
