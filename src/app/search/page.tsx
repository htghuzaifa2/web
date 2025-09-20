
import type { Metadata } from 'next';
import SearchWrapper from './search-wrapper';

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

export default function SearchPage() {
  return <SearchWrapper />;
}
