'use client';

import { use } from 'react';
import ProductDetailsClient from './product-details-client';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const runtime = 'edge';

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = use(params);
  return <ProductDetailsClient slug={slug} />;
}
