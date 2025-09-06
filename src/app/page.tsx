
import HomeClient from './home-client';
import type { Product } from '@/lib/types';
import productsData from '@/data/products.json';


const ALL_PRODUCTS: Product[] = [...productsData].reverse();

const getFeaturedProducts = () => {
    const shuffled = [...ALL_PRODUCTS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
}


export default function Home() {
  const featuredProducts = getFeaturedProducts();
  return <HomeClient featuredProducts={featuredProducts} />;
}
