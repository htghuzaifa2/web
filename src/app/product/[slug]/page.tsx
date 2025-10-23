import ProductDetailsLoader from './product-details-loader';
import productsData from '@/data/products.json';

export function generateStaticParams() {
  return productsData.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  return <ProductDetailsLoader slug={params.slug} />;
}
