
"use client";

import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from '@/components/product-card';

const CategoryClient = dynamic(() => import('./category-client'), {
  ssr: false,
  loading: () => (
     <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-10 w-1/2 mx-auto mb-2" />
        <Skeleton className="h-6 w-2/3 mx-auto mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <ProductCard key={`skeleton-${index}`} product={null} />
          ))}
        </div>
    </div>
  ),
});

interface CategoryWrapperProps {
  slug: string;
}

export default function CategoryWrapper({ slug }: CategoryWrapperProps) {
  return <CategoryClient slug={slug} />;
}
