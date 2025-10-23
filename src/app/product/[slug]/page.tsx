
import ProductDetailsLoader from './product-details-loader';

export default function ProductPage({ params }: { params: { slug: string } }) {
  return <ProductDetailsLoader slug={params.slug} />;
}
