
import { notFound } from "next/navigation";
import CategoryWrapper from "./category-wrapper";
import type { Metadata } from "next";
import { getCategoryData } from "@/lib/data-fetching";
import categoriesData from "@/data/categories.json";


export const dynamicParams = true;

export async function generateStaticParams() {
    return categoriesData.categories.map((category) => ({
        slug: category.slug,
    }));
}

type CategoryPageProps = {
    params: { slug: string };
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await getCategoryData(params.slug);

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


export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category, allCategoryProducts } = await getCategoryData(params.slug);

  if (!category) {
    notFound();
  }

  return <CategoryWrapper category={category} allProducts={allCategoryProducts} />;
}
