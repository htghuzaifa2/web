
"use client";

import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import type { Product } from '@/lib/types';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

interface HomeClientContentProps {
    featuredProducts: Product[];
}

export default function HomeClientContent({ featuredProducts }: HomeClientContentProps) {
  return (
    <div className="bg-background content-fade-in">
      <section className="w-full py-20 md:py-24 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">Discover Your Style At huzi.pk</h1>
          <p className="font-body mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Explore our curated collection of high-quality apparel and digital goods at huzi.pk.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/all-products">Shop Now</Link>
            </Button>
             <Button asChild size="lg" variant="outline">
              <Link href="/categories">Browse Categories</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center font-headline text-3xl font-bold text-foreground md:mb-12 md:text-4xl">
                Featured Products
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                 {featuredProducts.map((product, index) => (
                    <ProductCard key={`featured-${product.id}`} product={product} priority={index < 5} />
                 ))}
            </div>
             <div className="mt-12 text-center">
                <Button asChild size="lg">
                    <Link href="/all-products">View All Products</Link>
                </Button>
            </div>
        </div>
      </section>

      <Separator className="my-8 md:my-12" />
      
    </div>
  );
}

