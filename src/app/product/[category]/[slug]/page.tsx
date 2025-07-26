
import { notFound } from "next/navigation";
import productsData from "@/data/products.json";
import type { Product } from "@/lib/types";
import ProductDetailsClient from "./product-details-client";
import ProductCard from "@/components/product-card";
import { Separator } from "@/components/ui/separator";
import ProductInfoTabs from "./product-info-tabs";

export async function generateStaticParams() {
  const products: Product[] = productsData.products;
  return products.map((product) => ({
    category: product.category,
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: { params: { category: string, slug: string } }) {
  const products: Product[] = productsData.products;
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
  const products: Product[] = productsData.products;
  const product = products.find(p => p.category === category && p.slug === slug);
  if (!product) {
    return { product: null, relatedProducts: [] };
  }
  
  const relatedProducts = products
    .filter(p => p.category === category && p.id !== product.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 8); 

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

      {(product.longDescription || (product.specifications && Object.keys(product.specifications).length > 0)) && (
        <div className="my-12 md:my-16">
            <Separator />
            <div className="mt-12 md:mt-16">
              <ProductInfoTabs 
                description={product.longDescription} 
                specifications={product.specifications} 
              />
            </div>
        </div>
      )}

      {relatedProducts.length > 0 && (
         <div className="mt-16 md:mt-24">
            <h2 className="text-2xl md:text-3xl font-bold font-headline text-center mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                {relatedProducts.map(relatedProduct => (
                    <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
            </div>
        </div>
      )}
    </div>
  );
}
