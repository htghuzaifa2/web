
import type { Metadata } from 'next';
import CategoryClient from './category-client';
import categoriesData from "@/data/categories.json";

interface CategoryPageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = categoriesData.categories.find(c => c.slug === params.slug);

  if (!category) {
    return {
      title: 'Category not found',
      description: 'This product category does not exist.'
    }
  }

  const description = `Shop for ${category.name} at huzi.pk. Browse our collection of ${category.name.toLowerCase()} and find the perfect item for you.`;

  return {
    title: category.name,
    description: description.length > 155 ? description.substring(0, 152) + '...' : description,
    openGraph: {
      title: category.name,
      description: description.length > 155 ? description.substring(0, 152) + '...' : description,
      url: `/category/${params.slug}`,
      type: 'website',
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


export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  return <CategoryClient slug={slug} />;
}
