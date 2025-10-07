
import type { Metadata } from "next";
import categoriesData from "@/data/categories.json";
import CategoryWrapper from "./category-wrapper";

interface CategoryPageProps {
  params: { slug: string };
}

export const dynamicParams = true;

export async function generateStaticParams() {
    return categoriesData.categories.map((category) => ({
        slug: category.slug,
    }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const slug = params.slug;
  const category = categoriesData.categories.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The category you are looking for does not exist.",
    };
  }

  const description = `Shop the latest ${category.name.toLowerCase()} collection at huzi.pk. Discover trendy and high-quality products with delivery across Pakistan.`;

  return {
    title: `${category.name} Collection`,
    description: description,
    openGraph: {
      title: `${category.name} Collection`,
      description: description,
      url: `/category/${slug}`,
      images: [
        {
          url: category.image,
          width: 600,
          height: 400,
          alt: category.name,
        },
      ],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  return <CategoryWrapper params={params} />;
}
