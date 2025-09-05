
import productsData from '@/data/products.json';
import type { Product } from '@/lib/types';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import ProductCard from '@/components/product-card';

export const runtime = 'edge';

type SearchPageProps = {
  searchParams: { q?: string; page?: string };
};

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const query = searchParams.q || '';
  if (!query) {
    return {
      title: "Search",
      description: "Search for products on huzi.pk.",
    }
  }

  return {
    title: `Search results for "${query}"`,
    description: `Find products matching "${query}" on huzi.pk.`,
    robots: {
      index: false,
      follow: true,
    },
  };
}

const SearchClient = dynamic(() => import('./search-client'), {
  ssr: false,
  loading: () => (
    <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-10 w-1/2 mx-auto mb-4" />
        <Skeleton className="h-7 w-1/3 mx-auto mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {Array.from({ length: 20 }).map((_, index) => (
                <ProductCard key={`skeleton-${index}`} product={null} />
            ))}
        </div>
        <div className="text-center mt-12">
            <Button disabled>
                Load More <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
        </div>
    </div>
  ),
});

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const allProducts: Product[] = productsData;

  const filteredProducts = query
    ? allProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(query.toLowerCase())) ||
        product.id.toString().includes(query)
      )
    : [];

  return (
    <SearchClient allProducts={filteredProducts} query={query} />
  );
}
