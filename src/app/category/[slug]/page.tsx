
import CategoryLoader from './category-loader';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  return <CategoryLoader slug={params.slug} />;
}
