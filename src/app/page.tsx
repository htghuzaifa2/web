
import { Suspense } from 'react';
import HomeClient from './home-client';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import type { Product } from '@/lib/types';
import productsData from '@/data/products.json';


const ALL_PRODUCTS: Product[] = [...productsData].reverse();

function HomePageSkeleton() {
  return (
    <div className="bg-background">
      <section className="w-full py-20 md:py-24 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
          <Skeleton className="h-12 w-32 mx-auto mt-8" />
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
            <Skeleton className="h-10 w-1/2 mx-auto mb-8 md:mb-12" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                 {Array.from({ length: 8 }).map((_, index) => (
                    <div key={`featured-skeleton-${index}`} className="flex flex-col gap-2">
                        <Skeleton className="aspect-square w-full" />
                        <Skeleton className="h-6 w-3/4 mx-auto" />
                        <Skeleton className="h-5 w-1/2 mx-auto" />
                    </div>
                 ))}
            </div>
        </div>
      </section>

      <Separator className="my-8 md:my-12" />

      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-1/2 mx-auto mb-8 md:mb-12" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {Array.from({ length: 20 }).map((_, index) => (
              <div key={`paginated-skeleton-${index}`} className="flex flex-col gap-2">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="h-6 w-3/4 mx-auto" />
                <Skeleton className="h-5 w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const getFeaturedProducts = () => {
    const shuffled = [...ALL_PRODUCTS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 8);
}


export default function Home() {
  const featuredProducts = getFeaturedProducts();
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomeClient featuredProducts={featuredProducts} />
    </Suspense>
  );
}
