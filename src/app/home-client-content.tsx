
"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ProductGridLoader } from '@/components/product-grid-loader';

export default function HomeClientContent() {
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
            <ProductGridLoader />
        </div>
      </section>

      <section className="text-center py-16">
         <div className="container mx-auto px-4">
             <h2 className="font-headline text-3xl font-bold">See Our Full Collection</h2>
             <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                 Ready to see more? Browse our entire catalog to find exactly what you're looking for.
             </p>
             <Button asChild size="lg" className="mt-8">
                 <Link href="/all-products">View All Products</Link>
             </Button>
         </div>
      </section>
      
    </div>
  );
}
