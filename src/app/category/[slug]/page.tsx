'use client';

import { use } from 'react';
import CategoryClient from './category-client';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export const runtime = 'edge';

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = use(params);
  return <CategoryClient slug={slug} />;
}
