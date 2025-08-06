"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";
import ProductQuickView from "./product-quick-view";
import { Button } from "./ui/button";
import { Eye, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
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

  const productSlug = product.slug;

  return (
    <Card className="group/card relative overflow-hidden transition-shadow duration-300 hover:shadow-lg h-full flex flex-col">
      <CardContent className="p-0 flex flex-col flex-grow">
        <div className="relative aspect-square w-full overflow-hidden">
          <Link href={`/product/${productSlug}`} className="group block h-full w-full">
            <ImageWithSkeleton
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain"
            />
          </Link>

          {/* Icons for Mobile - Always Visible */}
          <div
            className={cn(
                "absolute top-2 right-2 z-10 flex flex-col gap-2 transition-opacity duration-300",
                "lg:opacity-0 lg:group-hover/card:opacity-100"
            )}
          >
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
        </div>
        <div className="p-3 text-center flex-grow flex flex-col justify-between items-center">
          <h3 className="font-headline text-base font-semibold leading-tight mb-2 break-words flex items-center justify-center min-h-[2.5rem]">
            <Link href={`/product/${productSlug}`} className="hover:underline">
              {product.name}
            </Link>
          </h3>
          <p className="text-base font-bold text-price mt-auto">{`PKR ${Math.round(product.price)}`}</p>
        </div>
      </CardContent>
      <ProductQuickView product={product} open={quickViewOpen} onOpenChange={setQuickViewOpen} />
    </Card>
  );
}
