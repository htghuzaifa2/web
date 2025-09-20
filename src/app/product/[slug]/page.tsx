
import { notFound } from "next/navigation";
import productsData from "@/data/products.json";
import ProductDetailsClient from "./product-details-client";
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

export default async function ProductPage({ params }: ProductPageProps) {
  const slug = await params.slug;
  
  const productExists = productsData.some(p => p.slug === slug);
  if (!productExists) {
      notFound();
  }

  return <ProductDetailsClient slug={slug} />;
}
