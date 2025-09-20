
import type { Metadata } from "next";
import productsData from "@/data/products.json";
import ProductDetailsWrapper from "./product-details-wrapper";

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
  const { slug } = params;
  return <ProductDetailsWrapper slug={slug} />;
}
