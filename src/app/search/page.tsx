
import type { Metadata } from 'next';
import SearchWrapper from './search-wrapper';

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = typeof params?.q === 'string' ? params.q : '';
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
