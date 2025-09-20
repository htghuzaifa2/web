
import { notFound } from "next/navigation";
import CategoryWrapper from "./category-wrapper";
import type { Metadata } from "next";
import categoriesData from "@/data/categories.json";

export const dynamicParams = true;

export async function generateStaticParams() {
    return categoriesData.categories.map((category) => ({
        slug: category.slug,
    }));
}

interface CategoryPageProps {
  params: { slug: string };
}

// This is a generic metadata title. The actual title will be set on the client.
export const metadata: Metadata = {
  title: "Category",
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  
  // Pre-validate the slug to show a 404 if it's invalid.
  const categoryExists = categoriesData.categories.some(c => c.slug === slug);
  if (!categoryExists) {
      notFound();
  }

  return <CategoryWrapper slug={slug} />;
}
