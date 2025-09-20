
"use client";

import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import ProductCard from '@/components/product-card';

const CategoryClient = dynamic(() => import('./category-client'), {
  ssr: false,
  loading: () => <CategoryPageSkeleton />,
});

function CategoryPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Skeleton className="h-10 w-1/2 mx-auto mb-2" />
      <Skeleton className="h-6 w-3/4 mx-auto mb-8" />
      <div className="flex justify-end mb-8">
        <Skeleton className="h-10 w-[180px]" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard key={`skeleton-${index}`} product={null} />
        ))}
      </div>
    </div>
  );
}


export default function CategoryWrapper({ slug }: { slug: string }) {
  return <CategoryClient slug={slug} />;
}
