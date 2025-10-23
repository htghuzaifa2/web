
import categoriesData from '@/data/categories.json';
import CategoryLoader from './category-loader';
import type { Metadata } from 'next';

interface PageProps {
  params: { slug: string };
}

// Generate static pages for all categories at build time
export function generateStaticParams() {
  return categoriesData.categories.map((category) => ({
    slug: category.slug,
  }));
}

// Generate metadata for each category page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = categoriesData.categories.find(c => c.slug === params.slug);

  if (!category) {
    return {
      title: 'Category Not Found',
      description: 'The category you are looking for does not exist.',
    };
  }

  const description = `Browse products in the ${category.name} category at huzi.pk. Find the best deals on ${category.name.toLowerCase()}.`;

  return {
    title: category.name,
    description: description,
    openGraph: {
      title: category.name,
      description: description,
      url: `/category/${category.slug}`,
       images: [
          {
            url: category.image,
            width: 1200,
            height: 630,
            alt: category.name,
          },
        ],
    },
     twitter: {
        card: "summary_large_image",
        title: category.name,
        description: description,
        images: [category.image],
      },
  };
}

export default function CategoryPage({ params }: PageProps) {
  return <CategoryLoader slug={params.slug} />;
}
