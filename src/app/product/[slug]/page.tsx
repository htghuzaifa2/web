
import { notFound } from "next/navigation";
import productsData from "@/data/products.json";
import type { Product } from "@/lib/types";
import ProductDetailsClient from "./product-details-client";
import ProductCard from "@/components/product-card";
import { Separator } from "@/components/ui/separator";
import ProductInfoAccordion from "./product-info-tabs";
import { slugify } from "@/lib/utils";
import { Metadata } from "next";

// This function generates static pages for all products
export async function generateStaticParams() {
  const products: Product[] = productsData.products;
  return products.map((product) => ({
    slug: slugify(product.name),
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const products: Product[] = productsData.products;
  const product = products.find(p => slugify(p.name) === params.slug);

  if (!product) {
    return {
      title: "Product Not Found"
    }
  }

  const title = `${product.name} - huzi.pk`;
  const description = product.description || product.longDescription || `Shop for ${product.name} at huzi.pk. We deliver physical products all over Pakistan and digital products worldwide.`;

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

const getProductData = (slug: string) => {
  const allProducts: Product[] = productsData.products;
  const product = allProducts.find(p => slugify(p.name) === slug);
  
  if (!product) {
    return { product: null, relatedProducts: [] };
  }
  
  // Get 6 fully random products, excluding the current one.
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id) // Exclude the current product
    .sort(() => 0.5 - Math.random()) // Shuffle the array randomly
    .slice(0, 6); // Take the first 6 products

  return { product, relatedProducts };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { product, relatedProducts } = getProductData(params.slug);

  if (!product) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
    sku: product.id.toString(),
    offers: {
      '@type': 'Offer',
      price: product.price.toFixed(2),
      priceCurrency: 'PKR',
      availability: (product.stock && product.stock > 0) ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `https://huzi.pk/product/${slugify(product.name)}`,
    },
    brand: {
      '@type': 'Brand',
      name: 'huzi.pk'
    }
  };


  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailsClient product={product} />

      <div className="my-8 md:my-12">
          <Separator />
          <div className="mt-8 md:mt-12 max-w-4xl mx-auto">
            <ProductInfoAccordion
              description={product.longDescription} 
              specifications={product.specifications} 
            />
          </div>
      </div>

      {relatedProducts.length > 0 && (
         <div className="mt-16 md:mt-24">
            <h2 className="text-2xl md:text-3xl font-bold font-headline text-center mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map(relatedProduct => (
                    <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
            </div>
        </div>
      )}
    </div>
  );
}
