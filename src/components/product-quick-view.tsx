
"use client";

import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/lib/types";
import ProductImageGallery from "@/components/product-image-gallery";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { slugify } from "@/lib/utils";

interface ProductQuickViewProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProductQuickView({ product, open, onOpenChange }: ProductQuickViewProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  if (!product) return null;
  
  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const images = [product.image, ...(product.additionalImages || [])];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[90vw] p-0">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-1 p-4">
            <ProductImageGallery images={images} productName={product.name} />
          </div>
          <div className="flex flex-col justify-start md:col-span-1 p-6">
            <h1 className="font-headline text-2xl md:text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-4 mt-3">
              <p className="font-headline text-3xl font-bold text-price">{`PKR ${Math.round(product.price)}`}</p>
              <Badge variant={isOutOfStock ? "destructive" : "default"}>
                {isOutOfStock ? "Out of Stock" : "In Stock"}
              </Badge>
            </div>
            <p className="mt-4 text-muted-foreground text-sm">{product.description}</p>
            <div className="mt-6 flex flex-col gap-3">
              <Button 
                size="lg" 
                onClick={handleAddToCart}
                disabled={isOutOfStock}
              >
                Add to Cart
              </Button>
               <Button size="lg" variant="outline" asChild>
                  <Link href={`/product/${slugify(product.name)}`} onClick={() => onOpenChange(false)}>
                    View Full Details
                  </Link>
                </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">ID : {product.id}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
