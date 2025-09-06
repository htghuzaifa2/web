
import { notFound } from "next/navigation";
import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";
import CategoryWrapper from "./category-wrapper";
import type { Metadata } from "next";

export const dynamicParams = true;

const getCategoryData = (slug: string) => {
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

export async function generateStaticParams() {
    return categoriesData.categories.map((category) => ({
        slug: category.slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { category } = getCategoryData(params.slug);

  if (!category) {
    return {
      title: "Category Not Found"
    }
  }

  const title = category.name;
  const description = `Browse our collection of ${category.name.toLowerCase()} at huzi.pk. We deliver physical products all over Pakistan and digital products worldwide.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: category.image,
          width: 600,
          height: 400,
          alt: category.name,
        }
      ],
    }
  }
}


export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { category, allCategoryProducts } = getCategoryData(params.slug);

  if (!category) {
    notFound();
  }

  return <CategoryWrapper category={category} allProducts={allCategoryProducts} />;
}
