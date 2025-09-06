
import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";

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
