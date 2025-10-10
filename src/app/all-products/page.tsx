
"use client";

import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import ProductCard from '@/components/product-card';

// Metadata can't be exported from a client component, but we can define it here.
// Note: This is a static metadata object. For dynamic metadata, you'd use the generateMetadata function in a server component.
export const metadata: Metadata = {
    title: "All Products",
    description: "Browse the complete collection of products available at huzi.pk. We deliver physical products all over Pakistan and digital products worldwide.",
    openGraph: {
        title: "All Products",
        description: "Browse the complete collection of products available at huzi.pk. We deliver physical products all over Pakistan and digital products worldwide.",
        url: "/all-products",
    }
};

const AllProductsClient = dynamic(() => import('./all-products-client'), {
  ssr: false,
  loading: () => <AllProductsSkeleton />,
});

function AllProductsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Skeleton className="h-10 w-1/2 mx-auto mb-2" />
      <Skeleton className="h-6 w-3/4 mx-auto mb-8" />
      <div className="flex justify-end mb-8">
        <Skeleton className="h-10 w-[180px]" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {Array.from({ length: 20 }).map((_, index) => (
          <ProductCard key={`skeleton-${index}`} product={null} />
        ))}
      </div>
    </div>
  );
}

export default function AllProductsPage() {
    return <AllProductsClient />;
}
