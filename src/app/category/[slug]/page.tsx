
'use client';

import CategoryClient from './category-client';

interface CategoryPageProps {
  params: { slug: string };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  return <CategoryClient slug={slug} />;
}
