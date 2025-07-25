import Image from "next/image";
import { notFound } from "next/navigation";
import productsData from "@/data/products.json";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
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
    title: `${product.name} - Huzi Pakistan`,
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
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            data-ai-hint={`${product.category} product`}
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="font-headline text-3xl md:text-4xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.round(product.rating.rate) ? 'text-primary fill-current' : 'text-muted-foreground'}`} />
              ))}
            </div>
            <span className="text-muted-foreground text-sm">({product.rating.count} reviews)</span>
          </div>
          <p className="font-headline text-3xl mt-4">${product.price.toFixed(2)}</p>
          <p className="mt-4 text-muted-foreground">{product.description}</p>
          <div className="mt-6">
            <Button size="lg" className="w-full md:w-auto">Add to Cart</Button>
          </div>
        </div>
      </div>

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
