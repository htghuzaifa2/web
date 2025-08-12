
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
import { ImageWithSkeleton } from "./image-with-skeleton";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quickViewOpen, setQuickViewOpen] = useState(false);

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
      <Card className="group/card relative flex h-full w-full flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow duration-300 hover:shadow-lg">
        <Link href={`/product/${productSlug}`} className="group block">
          <div className="relative w-full overflow-hidden bg-muted/30 aspect-square">
            <ImageWithSkeleton
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-2 transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
          </div>
        </Link>
        
        <div className="absolute top-2 right-2 z-10 flex flex-col gap-2 transition-opacity duration-300 lg:opacity-0 lg:group-hover/card:opacity-100">
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

        <div className="flex flex-1 flex-col p-3 text-center">
          <h3 className="font-headline text-base font-semibold leading-tight mb-2 break-words flex-grow">
            <Link href={`/product/${productSlug}`} className="hover:underline">
              {product.name}
            </Link>
          </h3>
          <div className="mt-auto flex items-baseline justify-center gap-2">
            <p className="text-base font-bold text-price">{`PKR ${Math.round(product.price)}`}</p>
            <p className="text-sm text-muted-foreground line-through">{`PKR ${originalPrice}`}</p>
          </div>
        </div>
      </Card>
      <ProductQuickView product={product} open={quickViewOpen} onOpenChange={setQuickViewOpen} />
    </>
  );
}
