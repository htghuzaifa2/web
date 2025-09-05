
import { notFound } from "next/navigation";
import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";
import CategoryClient from "./category-client";

const getCategoryData = (slug: string) => {
  const category = categoriesData.categories.find((c) => c.slug === slug);
  if (!category) {
    return { category: null, allCategoryProducts: [] };
  }
  const allCategoryProducts = productsData
    .filter((product) => product.category.includes(slug))
    .reverse(); // Reverse to show latest products first
  return { category, allCategoryProducts };
};

export async function generateStaticParams() {
    return categoriesData.categories.map((category) => ({
        slug: category.slug,
    }));
}

export default function CategoryPage({ params }: { params: { slug:string } }) {
  const { category, allCategoryProducts } = getCategoryData(params.slug);

  if (!category) {
    notFound();
  }

  return <CategoryClient category={category} allProducts={allCategoryProducts} />;
}
