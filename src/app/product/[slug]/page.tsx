
import { notFound } from "next/navigation";
import productsData from "@/data/products.json";
import type { Product } from "@/lib/types";
import ProductDetailsClient from "./product-details-client";
import ProductCard from "@/components/product-card";
import { Separator } from "@/components/ui/separator";
import ProductInfoTabs from "./product-info-tabs";
import { slugify } from "@/lib/utils";

// This function generates static pages for all products
export async function generateStaticParams() {
  const products: Product[] = productsData.products;
  return products.map((product) => ({
    slug: slugify(product.name),
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const products: Product[] = productsData.products;
  const product = products.find(p => slugify(p.name) === params.slug);

  if (!product) {
    return {
      title: "Product Not Found"
    }
  }

  return {
    title: `${product.name} - huzi.pk`,
    description: product.description,
    openGraph: {
      title: `${product.name} - huzi.pk`,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 1200,
          alt: product.name,
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} - huzi.pk`,
      description: product.description,
      images: [product.image],
    }
  }
}

const getProductData = (slug: string) => {
  const products: Product[] = productsData.products;
  const product = products.find(p => slugify(p.name) === slug);
  
  if (!product) {
    return { product: null, relatedProducts: [] };
  }
  
  // Find related products from the first category
  const primaryCategory = product.category[0];
  const relatedProducts = products
    .filter(p => p.category.includes(primaryCategory) && p.id !== product.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 8); 

  return { product, relatedProducts };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { product, relatedProducts } = getProductData(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
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
