
'use client';

import ProductDetailsClient from './product-details-client';

interface ProductPageProps {
  params: { slug: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  return <ProductDetailsClient slug={slug} />;
}
