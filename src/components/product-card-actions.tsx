
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";
import { Eye, ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/types";
import ProductQuickView from "./product-quick-view";

interface ProductCardActionsProps {
  product: Product;
  variant: "button" | "icon";
}

export default function ProductCardActions({ product, variant }: ProductCardActionsProps) {
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

  if (variant === "button") {
    return (
       <>
        <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" onClick={handleQuickView}>
                <Eye className="mr-2 h-4 w-4" /> Quick View
            </Button>
            <Button variant="default" size="sm" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
        </div>
        <ProductQuickView product={product} open={quickViewOpen} onOpenChange={setQuickViewOpen} />
      </>
    )
  }

  // Icon variant
  return (
    <>
      <div className="flex flex-col gap-2">
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
      <ProductQuickView product={product} open={quickViewOpen} onOpenChange={setQuickViewOpen} />
    </>
  );
}
