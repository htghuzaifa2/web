
import HomeClient from './home-client';
import type { Product } from '@/lib/types';
import productsData from '@/data/products.json';

const ALL_PRODUCTS: Product[] = [...productsData];

export default function Home() {
  return <HomeClient allProducts={ALL_PRODUCTS} />;
}
