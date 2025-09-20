"use client";

import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from '@/components/ui/separator';
import type { Product } from '@/lib/types';
import ProductCard from '@/components/product-card';

const HomeClientContent = dynamic(() => import('./home-client-content'), {
  ssr: false,
  loading: () => <HomePageSkeleton />,
});

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
            <Skeleton className="h-10 w-1/2 mx-auto mb-8 md:mb-12" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                 {Array.from({ length: 10 }).map((_, index) => (
                    <ProductCard key={`featured-skeleton-${index}`} product={null} />
                 ))}
            </div>
            <div className="mt-12 flex justify-center">
                <Skeleton className="h-12 w-40" />
            </div>
        </div>
      </section>

      <Separator className="my-8 md:my-12" />
    </div>
  );
}


interface HomeClientProps {
    initialProducts: Product[];
    allProducts: Product[];
}

export default function HomeClient({ initialProducts, allProducts }: HomeClientProps) {
    return <HomeClientContent initialProducts={initialProducts} allProducts={allProducts} />
}
