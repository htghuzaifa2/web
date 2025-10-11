
"use client";

import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ProductGridLoader } from '@/components/product-grid-loader';
import { useState, useEffect } from "react";

function HomePageSkeleton() {
  return (
    <div className="bg-background">
      <section className="w-full py-20 md:py-24 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
          <div className="mt-8 flex justify-center gap-4">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-32" />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
            <Skeleton className="h-10 w-1/2 mx-auto mb-12" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                 {Array.from({ length: 10 }).map((_, index) => (
                    <ProductCard key={`featured-skeleton-${index}`} product={null} />
                 ))}
            </div>
        </div>
      </section>
       <div className="container mx-auto px-4 text-center py-16">
          <Skeleton className="h-10 w-1/2 mx-auto mb-4" />
          <Skeleton className="h-6 w-3/4 mx-auto mb-8" />
          <Skeleton className="h-12 w-48 mx-auto" />
       </div>
    </div>
  );
}

export default function HomeClient() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <HomePageSkeleton />;
    }

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
                <Link href="/all-products" prefetch={true}>Shop Now</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                <Link href="/categories" prefetch={true}>Browse Categories</Link>
                </Button>
            </div>
            </div>
        </section>

        <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
                <h2 className="mb-8 text-center font-headline text-3xl font-bold text-foreground md:mb-12 md:text-4xl">
                    Featured Products
                </h2>
                <ProductGridLoader randomize={true} />
            </div>
        </section>

        <section className="text-center py-16">
            <div className="container mx-auto px-4">
                <h2 className="font-headline text-3xl font-bold">See Our Full Collection</h2>
                <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                    Ready to see more? Browse our entire catalog to find exactly what you're looking for.
                </p>
                <Button asChild size="lg" className="mt-8">
                    <Link href="/all-products" prefetch={true}>View All Products</Link>
                </Button>
            </div>
        </section>
        
        </div>
    );
}
