
import productsData from '@/data/products.json';
import type { Product } from '@/lib/types';
import type { Metadata } from 'next';
import SearchClient from './search-client';

export const runtime = 'edge';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const query = typeof searchParams.q === 'string' ? searchParams.q : '';
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

export default async function SearchPage({ searchParams }: Props) {
  const query = typeof searchParams?.q === 'string' ? searchParams.q : '';
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
