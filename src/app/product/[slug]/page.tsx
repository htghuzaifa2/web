
import productsData from '@/data/products.json';
import ProductDetailsLoader from './product-details-loader';
import type { Metadata } from 'next';

interface PageProps {
  params: { slug: string };
}

// Generate static pages for all products at build time
export function generateStaticParams() {
  return productsData.map((product) => ({
    slug: product.slug,
  }));
}

// Generate metadata for each product page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = productsData.find(p => p.slug === params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    };
  }
  
  const description = `Buy ${product.name} at huzi.pk. ${product.description}`;

  return {
    title: `${product.name}`,
    description: description.substring(0, 160),
     openGraph: {
        title: product.name,
        description: description.substring(0, 160),
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
       twitter: {
        card: "summary_large_image",
        title: product.name,
        description: description.substring(0, 160),
        images: [product.image],
      },
  };
}


export default function ProductPage({ params }: PageProps) {
  return <ProductDetailsLoader slug={params.slug} />;
}
