
import type { Metadata } from 'next';
import ProductDetailsLoader from './product-details-loader';
import productsData from '@/data/products.json';

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return productsData.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = productsData.find((p) => p.slug === params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      url: `/product/${product.slug}`,
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export default function ProductPage({ params }: PageProps) {
  const product = productsData.find((p) => p.slug === params.slug);
  
  if (!product) {
      // This should ideally not be reached due to generateStaticParams,
      // but it's good practice for robustness.
      return <ProductDetailsLoader slug={params.slug} structuredData={null} />;
  }

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;
  const availability = isOutOfStock ? "https://schema.org/OutOfStock" : "https://schema.org/InStock";

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.id.toString(),
    offers: {
      '@type': 'Offer',
      price: product.price.toFixed(2),
      priceCurrency: 'PKR',
      availability: availability,
    },
  };

  return <ProductDetailsLoader slug={params.slug} structuredData={structuredData} />;
}
