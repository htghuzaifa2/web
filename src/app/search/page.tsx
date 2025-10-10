
import type { Metadata } from 'next';
import SearchLoader from './search-loader';

export const metadata: Metadata = {
    title: "Search Products",
    description: "Search for products at huzi.pk.",
    openGraph: {
        title: "Search Products",
        description: "Search for products at huzi.pk.",
        url: "/search",
    }
};

export default function SearchPage() {
  return <SearchLoader />;
}
