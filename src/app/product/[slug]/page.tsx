
import type { Metadata } from 'next';
import { getProductData } from "@/lib/data-fetching";
import ProductDetailsLoader from './product-details-loader';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: { slug: string };
}

function generateMetaDescription(product: any): string {
    if (product.description && product.description.length > 10) {
        let cleanDescription = product.description.replace(/price in pakistan/i, '').replace(/202\d/g, '').trim();
        if (cleanDescription.length > 155) {
            return cleanDescription.substring(0, 152) + "...";
        }
        return cleanDescription;
    }
    return `Buy ${product.name} at huzi.pk. Discover a wide range of quality products with delivery across Pakistan.`;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { product } = await getProductData(params.slug);

  if (!product) {
    return {
      title: 'Product not found',
      description: 'The product you are looking for does not exist.'
    }
  }

  const description = generateMetaDescription(product);

  return {
    title: product.name,
    description: description,
    openGraph: {
      title: product.name,
      description: description,
      url: `/product/${params.slug}`,
      type: 'product',
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

export default async function ProductPage({ params }: ProductPageProps) {
  // We can still fetch data here to check if the product exists server-side
  // to show a 404 page immediately if it doesn't.
  const { product } = await getProductData(params.slug);
  if (!product) {
    notFound();
  }
  return <ProductDetailsLoader slug={params.slug} />;
}
