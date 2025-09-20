
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import categoriesData from "@/data/categories.json";
import { getCategoryData } from "@/lib/data-fetching";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PaginatedProductGrid from "@/components/paginated-product-grid";
import CategoryClient from "./category-client";

export const dynamicParams = true;

export async function generateStaticParams() {
    return categoriesData.categories.map((category) => ({
        slug: category.slug,
    }));
}

interface CategoryPageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const slug = await params.slug;
  const { category } = await getCategoryData(slug);
  
  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: category.name,
    description: `Browse our collection of ${category.name.toLowerCase()} at huzi.pk.`,
  };
}


export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const slug = await params.slug;
  
  const { category, allCategoryProducts } = await getCategoryData(slug);
  
  if (!category) {
      notFound();
  }

  return <CategoryClient category={category} allProducts={allCategoryProducts} />;
}
