
import productsData from "@/data/products.json";
import type { Product } from "./types";

export async function getProductData(slug: string) {
  await new Promise(resolve => setTimeout(resolve, 0)); // Simulate async fetch

  const allProducts: Product[] = productsData;
  const product = allProducts.find((p) => p.slug === slug) || null;

  if (!product) {
    return { product: null, relatedProducts: [] };
  }

  const relatedProducts = allProducts
    .filter(p => 
      p.id !== product.id && 
      p.category.some(cat => product.category.includes(cat))
    )
    .sort(() => 0.5 - Math.random()) // Shuffle related products
    .slice(0, 5);

  return { product, relatedProducts };
}
