
import CategoryLoader from './category-loader';
import categoriesData from '@/data/categories.json';

// Generate static pages for all categories at build time
export function generateStaticParams() {
  return categoriesData.categories.map((category) => ({
    slug: category.slug,
  }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  return <CategoryLoader slug={params.slug} />;
}
