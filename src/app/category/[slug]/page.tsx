
import { notFound } from "next/navigation";
import CategoryClient from "./category-client";
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

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  
  const categoryExists = categoriesData.categories.some(c => c.slug === slug);
  if (!categoryExists) {
      notFound();
  }

  return <CategoryClient slug={slug} />;
}
