
import { notFound } from "next/navigation";
import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";
import type { Category, Product } from "@/lib/types";
import CategoryClient from "./category-client";

// This function generates static pages for all categories defined in categories.json
export async function generateStaticParams() {
  const categories: Category[] = categoriesData.categories;
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

const getCategoryData = (slug: string) => {
  const category = categoriesData.categories.find((c) => c.slug === slug);
  if (!category) {
    return { category: null, allCategoryProducts: [] };
  }
  const allCategoryProducts = productsData.products.filter((product) =>
    product.category.includes(slug)
  );
  return { category, allCategoryProducts };
};

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { category, allCategoryProducts } = getCategoryData(params.slug);

  if (!category) {
    notFound();
  }

  return <CategoryClient category={category} allProducts={allCategoryProducts} />;
}
