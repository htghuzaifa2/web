
"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";
import ProductQuickView from "./product-quick-view";
import { Button } from "./ui/button";
import { Eye, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product | null;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  if (!product) {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="aspect-square w-full" />
        <Skeleton className="h-6 w-3/4 mx-auto" />
        <Skeleton className="h-5 w-1/2 mx-auto" />
      </div>
    );
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setQuickViewOpen(true);
  };

  const productSlug = product.slug || '';
  const originalPrice = Math.round(product.price * 1.39);

  return (
    <>
      <Card 
        className="group/card relative flex h-full w-full flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow duration-300 hover:shadow-lg"
        style={{ transform: 'translateZ(0)' }}
      >
        <Link href={`/product/${productSlug}`} className="flex flex-col h-full">
            <div className="relative w-full overflow-hidden bg-background aspect-square">
              {isImageLoading && <Skeleton className="absolute inset-0" />}
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority={priority}
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 15vw"
                className={cn(
                  "object-contain transition-transform duration-500 ease-in-out group-hover/card:scale-105",
                   isImageLoading ? 'opacity-0' : 'opacity-100'
                )}
                style={{ willChange: 'transform' }}
                 onLoad={() => setIsImageLoading(false)}
                 loading={priority ? 'eager' : 'lazy'}
              />
            </div>
            
            <div className="flex flex-1 flex-col p-3 text-center">
              <h3 className="font-headline text-base font-semibold leading-tight mb-2 break-words min-h-[2.5rem] flex items-center justify-center">
                  {product.name}
              </h3>
              <div className="mt-auto flex items-baseline justify-center gap-2 pt-2">
                <p className="text-base font-bold text-price">{`PKR ${Math.round(product.price)}`}</p>
                <p className="text-sm text-muted-foreground line-through">{`PKR ${originalPrice}`}</p>
              </div>
            </div>
        </Link>
        
        <div className="absolute top-2 right-2 z-10 flex flex-col gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
          <Button
            variant="secondary"
            size="icon"
            className="h-9 w-9 rounded-full shadow-md"
            onClick={handleQuickView}
            aria-label="Quick View"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-9 w-9 rounded-full shadow-md"
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </Card>
      <ProductQuickView product={product} open={quickViewOpen} onOpenChange={setQuickViewOpen} />
    </>
  );
}
