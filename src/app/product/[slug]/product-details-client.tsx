
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";
import type { Product, ImageObject } from "@/lib/types";
import ProductImageGallery from "@/components/product-image-gallery";
import { Badge } from "@/components/ui/badge";
import ProductInfoAccordion from "./product-info-tabs";
import { Separator } from "@/components/ui/separator";
import { getProductData } from "@/lib/data-fetching";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/product-card";
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShoppingCart, Check } from "lucide-react";

interface ProductDetailsClientProps {
  slug: string;
}

export default function ProductDetailsClient({ slug }: ProductDetailsClientProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const { product: fetchedProduct, relatedProducts: fetchedRelated } = await getProductData(slug);

      if (!fetchedProduct) {
        console.error("Product not found on client-side");
        setIsLoading(false);
        return;
      }

      setProduct(fetchedProduct);
      setRelatedProducts(fetchedRelated);

      setIsLoading(false);
    }
    fetchData();

  }, [slug]);

  if (isLoading) {
    return null; // The loader component will handle the skeleton
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <p className="text-muted-foreground mt-2">The product you're looking for does not exist.</p>
      </div>
    );
  }

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });

    // Reset the button after 2 seconds
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const images: ImageObject[] = [product.image, ...product.additionalImages];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <style jsx>{`
        .product-fade-in {
          animation: fadeInUp 0.6s ease-out;
        }
        .price-fade {
          animation: fadeInUp 0.7s ease-out;
        }
        .button-success {
          animation: successPulse 0.5s ease-out;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes successPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>

      <div className="mb-6 product-fade-in">
        <Button variant="ghost" onClick={() => router.back()} className="text-muted-foreground hover:scale-105 transition-transform">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-start gap-8 lg:gap-12">
        <div className="lg:col-span-1 product-fade-in">
          <ProductImageGallery images={images} productName={product.name} />
        </div>
        <div className="flex flex-col justify-start lg:col-span-1 product-fade-in">
          <h1 className="font-headline text-3xl md:text-4xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-4 mt-4 price-fade">
            <div className="flex items-baseline gap-3">
              <p className="font-headline text-4xl font-bold text-price">{`PKR ${Math.round(product.price)}`}</p>
            </div>
          </div>
          <div className="mt-2">
            <Badge variant={isOutOfStock ? "destructive" : "default"} className="animate-in fade-in duration-500">
              {isOutOfStock ? "Out of Stock" : "In Stock"}
            </Badge>
          </div>
          <p className="mt-4 text-muted-foreground leading-relaxed">{product.shortDescription}</p>
          <div className="mt-6">
            <Button
              size="lg"
              className={`w-full md:w-auto min-w-[200px] transition-all duration-300 hover:scale-105 ${addedToCart ? 'button-success bg-green-600 hover:bg-green-700' : ''}`}
              onClick={handleAddToCart}
              disabled={isOutOfStock}
            >
              {addedToCart ? (
                <>
                  <Check className="mr-2 h-5 w-5" />
                  Added!
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">ID : {product.id}</p>

          <div className="mt-8">
            <ProductInfoAccordion
              description={product.description}
              specifications={product.specs || product.specifications}
              defaultOpen="description"
            />
          </div>
        </div>
      </div>
      <div className="my-8 md:my-12">
        <Separator />
      </div>
      {relatedProducts.length > 0 && (
        <div className="mt-16 md:mt-24">
          <Separator className="mb-12" />
          <h2 className="text-2xl md:text-3xl font-bold font-headline text-center mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {relatedProducts.map((relatedProduct, index) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} priority={index < 5} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
