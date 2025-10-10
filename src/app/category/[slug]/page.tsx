
import type { Metadata } from "next";
import categoriesData from "@/data/categories.json";
import CategoryClient from "./category-client";

interface CategoryPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return categoriesData.categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { slug } = params;
    const category = categoriesData.categories.find((c) => c.slug === slug);

    if (!category) {
        return {
            title: "Category Not Found",
            description: "The category you are looking for does not exist.",
        };
    }

    const title = `${category.name} - huzi.pk`;
    const description = `Browse products in the ${category.name} category on huzi.pk.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `/category/${slug}`,
        },
    };
}


export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  return <CategoryClient slug={slug} />;
}
