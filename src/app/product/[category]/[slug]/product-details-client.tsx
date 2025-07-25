"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/lib/types";
import ProductImageGallery from "@/components/product-image-gallery";
import { Badge } from "@/components/ui/badge";

interface ProductDetailsClientProps {
  product: Product;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const images = [product.image, ...product.additionalImages].filter(Boolean);

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      <ProductImageGallery images={images} productName={product.name} />
      <div className="flex flex-col justify-center">
        <h1 className="font-headline text-3xl md:text-4xl font-bold">{product.name}</h1>
        <div className="flex items-center gap-4 mt-4">
            <p className="font-headline text-3xl">PKR {product.price.toFixed(2)}</p>
            <Badge variant={isOutOfStock ? "destructive" : "default"}>
                {isOutOfStock ? "Out of Stock" : "In Stock"}
            </Badge>
        </div>
        <p className="mt-4 text-muted-foreground">{product.description}</p>
        <div className="mt-6">
          <Button 
            size="lg" 
            className="w-full md:w-auto" 
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
