
import HomeClient from './home-client';
import type { Product } from '@/lib/types';
import productsData from '@/data/products.json';

const ALL_PRODUCTS: Product[] = [...productsData];
const PRODUCTS_PER_PAGE = 25; // 5 rows of 5 products

// Function to get a shuffled slice of products
const getRandomProducts = (products: Product[], count: number): Product[] => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};


export default function Home() {
  const initialProducts = getRandomProducts(ALL_PRODUCTS, PRODUCTS_PER_PAGE);
  return <HomeClient initialProducts={initialProducts} allProducts={ALL_PRODUCTS} />;
}
