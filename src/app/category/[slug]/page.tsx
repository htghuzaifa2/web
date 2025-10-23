
import type { Metadata } from 'next';
import CategoryLoader from './category-loader';
import categoriesData from '@/data/categories.json';

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return categoriesData.categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = categoriesData.categories.find(c => c.slug === params.slug);
  
  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The category you are looking for does not exist.',
    };
  }

  return {
    title: category.name,
    description: `Explore products in the ${category.name} category at huzi.pk.`,
    openGraph: {
      title: category.name,
      description: `Explore products in the ${category.name} category at huzi.pk.`,
      url: `/category/${category.slug}`,
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

export default function CategoryPage({ params }: { params: { slug: string } }) {
  return <CategoryLoader slug={params.slug} />;
}
