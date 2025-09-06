
import HomeClient from './home-client';
import type { Product } from '@/lib/types';
import productsData from '@/data/products.json';

const ALL_PRODUCTS: Product[] = [...productsData];

const getFeaturedProducts = () => {
    // Sort by ID descending to get newest first, then take top 10 as a stable base for "featured"
    const sorted = [...ALL_PRODUCTS].sort((a,b) => b.id - a.id);
    const topTen = sorted.slice(0, 10);
    // Shuffle the top 10 to make the order dynamic on each load
    return topTen.sort(() => 0.5 - Math.random());
}


export default function Home() {
  const featuredProducts = getFeaturedProducts();
  return <HomeClient featuredProducts={featuredProducts} />;
}
