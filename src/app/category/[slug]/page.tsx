import CategoryLoader from './category-loader';
import categoriesData from '@/data/categories.json';

export function generateStaticParams() {
  return categoriesData.categories.map((category) => ({
    slug: category.slug,
  }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  return <CategoryLoader slug={params.slug} />;
}
