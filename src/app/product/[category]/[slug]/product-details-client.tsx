"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/lib/types";
import { Star } from "lucide-react";

interface ProductDetailsClientProps {
  product: Product;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
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
          <Button size="lg" className="w-full md:w-auto" onClick={handleAddToCart}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
}
