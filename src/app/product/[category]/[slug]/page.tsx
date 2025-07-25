import { notFound } from "next/navigation";
import productsData from "@/data/products.json";
import type { Product } from "@/lib/types";
import ProductDetailsClient from "./product-details-client";
import ProductCard from "@/components/product-card";

export async function generateStaticParams() {
  const products: Product[] = productsData;
  return products.map((product) => ({
    category: product.category,
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: { params: { category: string, slug: string } }) {
  const products: Product[] = productsData;
  const product = products.find(p => p.slug === params.slug && p.category === params.category);

  if (!product) {
    return {
      title: "Product Not Found"
    }
  }

  return {
    title: `${product.name} - huzi.pk`,
    description: product.description,
  }
}

const getProductData = (category: string, slug: string) => {
  const products: Product[] = productsData;
  const product = products.find(p => p.category === category && p.slug === slug);
  if (!product) {
    return { product: null, relatedProducts: [] };
  }
  
  const relatedProducts = products
    .filter(p => p.category === category && p.id !== product.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  return { product, relatedProducts };
}

export default function ProductPage({ params }: { params: { category: string, slug: string } }) {
  const { product, relatedProducts } = getProductData(params.category, params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <ProductDetailsClient product={product} />

      <div className="mt-16 md:mt-24">
        <h2 className="text-2xl md:text-3xl font-bold font-headline text-center mb-8">You Might Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
            {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
        </div>
      </div>
    </div>
  );
}
