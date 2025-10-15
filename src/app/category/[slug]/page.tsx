
import type { Metadata } from 'next';
import CategoryLoader from './category-loader';
import categoriesData from "@/data/categories.json";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = categoriesData.categories.find(c => c.slug === params.slug);

  if (!category) {
    return {
      title: 'Category not found',
      description: 'This product category does not exist.'
    }
  }

  const description = `Shop for ${category.name} at huzi.pk. Browse our collection of ${category.name.toLowerCase()} and find the perfect item for you.`.substring(0, 155);

  return {
    title: category.name,
    description: description,
    openGraph: {
      title: category.name,
      description: description,
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


export default function CategoryPage({ params }: Props) {
  const { slug } = params;
  return <CategoryLoader slug={slug} />;
}
