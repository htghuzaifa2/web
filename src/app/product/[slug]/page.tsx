
import { notFound } from "next/navigation";
import productsData from "@/data/products.json";
import type { Product } from "@/lib/types";
import ProductDetailsWrapper from "./product-details-wrapper";
import type { Metadata, ResolvingMetadata } from "next";
import { getProductData } from "@/lib/data-fetching";

export const dynamicParams = true;

export async function generateStaticParams() {
  const products: Product[] = productsData;
  return products.map((product) => ({
    slug: product.slug,
  }));
}

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata(
  { params }: ProductPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params;
  const { product } = await getProductData(slug);

  if (!product) {
    return {
      title: "Product Not Found"
    }
  }

  const title = product.name;
  let description = `Shop for ${product.name} at huzi.pk. We deliver physical products all over Pakistan and digital products worldwide.`;

  if (product.description) {
      description = product.description;
  } else if (product.longDescription) {
      description = product.longDescription.split('\n')[0]; 
  } else if (product.specifications) {
      const specs = Object.entries(product.specifications).slice(0, 2).map(([key, value]) => `${key}: ${value}`).join(', ');
      description = `Check out the ${product.name} with features like ${specs}. Available now at huzi.pk.`
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 1200,
          alt: product.name,
        }
      ],
      type: 'article',
      siteName: 'huzi.pk'
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.image],
    }
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;

  const productExists = productsData.some(p => p.slug === slug);
  if (!productExists) {
      notFound();
  }
  
  return <ProductDetailsWrapper slug={slug} />;
}
