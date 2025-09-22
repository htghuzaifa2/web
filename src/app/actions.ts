'use server';

import productsData from '@/data/products.json';
import type { Product } from '@/lib/types';

export async function fetchProducts({
  page = 1,
  limit = 25,
  category,
  sortBy = 'newest',
  allProducts: providedProducts,
}: {
  page?: number;
  limit?: number;
  category?: string;
  sortBy?: string;
  allProducts?: Product[];
}) {
  let productsToProcess: Product[];

  if (providedProducts) {
    productsToProcess = [...providedProducts];
  } else {
    let allProducts: Product[] = [...productsData];
    if (category) {
      allProducts = allProducts.filter(p => p.category.includes(category));
    }
    productsToProcess = allProducts;
  }

  // Sorting logic based on sortBy parameter
  switch (sortBy) {
    case 'newest':
      productsToProcess.sort((a, b) => b.id - a.id);
      break;
    case 'oldest':
      productsToProcess.sort((a, b) => a.id - b.id);
      break;
    case 'price-asc':
      productsToProcess.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      productsToProcess.sort((a, b) => b.price - a.price);
      break;
    default:
      // Default to newest if sort is unrecognized
      productsToProcess.sort((a, b) => b.id - a.id);
      break;
  }
  
  const start = (page - 1) * limit;
  const end = start + limit;
  const products = productsToProcess.slice(start, end);

  return {
    products,
    total: productsToProcess.length
  };
}
