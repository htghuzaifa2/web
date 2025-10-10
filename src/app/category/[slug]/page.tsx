
"use client";

import type { Metadata } from "next";
import categoriesData from "@/data/categories.json";
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

// Note: generateMetadata and generateStaticParams are server-side functions.
// They cannot be used in a client component. If dynamic metadata is needed,
// this page would need to be a server component that wraps the client component.
// For this simplified structure, we'll rely on the client to set the title.

export default function CategoryPage({ params }: { params: { slug: string } }) {
  return <CategoryClient slug={params.slug} />;
}
