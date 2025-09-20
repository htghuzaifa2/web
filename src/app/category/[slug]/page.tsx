
import { notFound } from "next/navigation";
import CategoryWrapper from "./category-wrapper";
import type { Metadata, ResolvingMetadata } from "next";
import { getCategoryData } from "@/lib/data-fetching";
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

export async function generateMetadata(
  { params }: CategoryPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
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

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  
  // This page now only serves as a wrapper to pass the slug to a client component.
  // The client component will handle the actual data fetching.
  // We can pre-validate the slug to show a 404 if it's invalid.
  const categoryExists = categoriesData.categories.some(c => c.slug === slug);
  if (!categoryExists) {
      notFound();
  }

  return <CategoryWrapper slug={slug} />;
}
