
import type { Metadata } from "next";
import categoriesData from "@/data/categories.json";
import CategoryWrapper from "./category-wrapper";

export const dynamicParams = true;

export async function generateStaticParams() {
    return categoriesData.categories.map((category) => ({
        slug: category.slug,
    }));
}

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

// This is a generic metadata title. The actual title will be set on the client.
export const metadata: Metadata = {
  title: "Category",
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  return <CategoryWrapper slug={slug} />;
}
