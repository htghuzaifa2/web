
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import ProductCard from '@/components/product-card';

const SearchClient = dynamic(() => import('./search-client'), {
  ssr: false,
  loading: () => <SearchSkeleton />,
});


interface SearchPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export function generateMetadata({ searchParams }: SearchPageProps): Metadata {
  const query = typeof searchParams?.q === 'string' ? searchParams.q : '';
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

function SearchSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Skeleton className="h-10 w-1/2 mx-auto mb-4" />
      <Skeleton className="h-6 w-1/3 mx-auto mb-8" />
       <div className="flex justify-end mb-8">
        <Skeleton className="h-10 w-[180px]" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {Array.from({ length: 15 }).map((_, i) => (
          <ProductCard key={`skel-${i}`} product={null} />
        ))}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return <SearchClient />;
}
