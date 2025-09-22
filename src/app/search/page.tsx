
import type { Metadata } from 'next';
import SearchWrapper from './search-wrapper';

export const runtime = 'edge';

interface SearchPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export function generateMetadata({ searchParams }: SearchPageProps): Metadata {
  const query = typeof searchParams?.q === 'string' ? searchParams.q : '';

  if (!query) {
    return {
      title: "Search",
      description: "Search for products on huzi.pk.",
       robots: {
        index: false,
        follow: false,
      },
    }
  }

  const title = `Search results for "${query}"`;
  return {
    title,
    description: `Find products matching "${query}" on huzi.pk.`,
    openGraph: {
      title,
      description: `Find products matching "${query}" on huzi.pk.`,
      url: `/search?q=${query}`,
    },
    robots: {
      index: false, // Prevent search result pages from being indexed
      follow: true,
    },
  };
}


export default function SearchPage() {
  return <SearchWrapper />;
}
