
"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { slugify } from "@/lib/utils";
import ProductCardActions from "./product-card-actions";
import { useState } from "react";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";
import ProductQuickView from "./product-quick-view";
import { Button } from "./ui/button";
import { Eye, ShoppingCart } from "lucide-react";

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

  const productSlug = slugify(product.name);
  const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmMGYwZjAiLz48L3N2Zz4=";
  
  return (
    <Card className="group/card relative overflow-hidden transition-shadow duration-300 hover:shadow-lg h-full flex flex-col">
      <CardContent className="p-0 flex flex-col flex-grow">
        {/* Icons for ultra-small screens (< 300px) - Above image */}
        <div className="block xxs:hidden p-2 flex justify-between items-center bg-muted/50">
            <Button
              variant="secondary"
              size="sm"
              className="h-9 flex-1"
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
            <div className="w-2"></div>
            <Button
              variant="secondary"
              size="sm"
              className="h-9 flex-1"
              onClick={handleQuickView}
              aria-label="Quick View"
            >
              <Eye className="h-4 w-4" />
            </Button>
        </div>

        <div className="relative aspect-square w-full overflow-hidden">
           <Link href={`/product/${productSlug}`} className="group block">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              key={product.image}
              placeholder="blur"
              blurDataURL={placeholderImage}
            />
          </Link>

          {/* Icons for Mobile/Tablet - Always Visible */}
          <div className="hidden xxs:block lg:hidden absolute top-2 left-2 z-10">
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
          <div className="hidden xxs:block lg:hidden absolute top-2 right-2 z-10">
             <Button
              variant="secondary"
              size="icon"
              className="h-9 w-9 rounded-full shadow-md"
              onClick={handleQuickView}
              aria-label="Quick View"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          {/* Icons for Desktop - On Hover */}
          <div className="absolute top-2 right-2 opacity-0 lg:group-hover/card:opacity-100 transition-opacity duration-300 z-10">
              <ProductCardActions product={product} />
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
