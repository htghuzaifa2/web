
import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";
import type { Product } from "./types";

export async function getCategoryData(slug: string) {
  const category = categoriesData.categories.find((c) => c.slug === slug);
  if (!category) {
    return { category: null, allCategoryProducts: [] };
  }
  // Default sort: newest first
  const allCategoryProducts = productsData
    .filter((product) => product.category.includes(slug))
    .sort((a, b) => b.id - a.id); // Sort by ID descending for "newest"
  return { category, allCategoryProducts };
};

export const getProductData = async (slug: string) => {
  const allProducts: Product[] = productsData;
  const product = allProducts.find(p => p.slug === slug);

  if (!product) {
    return { product: null, relatedProducts: [] };
  }
  
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id) 
    .sort(() => 0.5 - Math.random()) 
    .slice(0, 8); 

  return { product, relatedProducts };
};
