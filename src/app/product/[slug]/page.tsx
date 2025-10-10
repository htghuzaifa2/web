
import type { Metadata } from "next";
import productsData from "@/data/products.json";
import ProductDetailsClient from "./product-details-client";

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params: { slug },
}: ProductPageProps): Promise<Metadata> {
  const product = productsData.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    };
  }

  const title = `${product.name} - huzi.pk`;
  const description = product.description;
  const imageUrl = product.image;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
      url: `/product/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default function ProductPage({ params: { slug } }: ProductPageProps) {
  return <ProductDetailsClient slug={slug} />;
}
