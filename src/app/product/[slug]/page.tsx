
import ProductDetailsLoader from './product-details-loader';
import productsData from '@/data/products.json';

// Generate static pages for all products at build time
export function generateStaticParams() {
  return productsData.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  return <ProductDetailsLoader slug={params.slug} />;
}
