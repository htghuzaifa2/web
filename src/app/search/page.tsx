
import productsData from '@/data/products.json';
import type { Product } from '@/lib/types';
import { Metadata } from 'next';
import SearchClient from './search-client';

export const runtime = 'edge';

interface SearchPageProps {
  searchParams: { q?: string; page?: string };
}

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

export default async function SearchPage({ searchParams }: SearchPageProps) {
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
