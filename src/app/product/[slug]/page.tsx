
import { notFound } from "next/navigation";
import productsData from "@/data/products.json";
import type { Product } from "@/lib/types";
import ProductDetailsClient from "./product-details-client";
import ProductCard from "@/components/product-card";
import { Separator } from "@/components/ui/separator";
import type { Metadata, ResolvingMetadata } from "next";

export const dynamicParams = true;

export async function generateStaticParams() {
  const products: Product[] = productsData;
  return products.map((product) => ({
    slug: product.slug,
  }));
}

const getProductData = async (slug: string) => {
  const allProducts: Product[] = productsData;
  const product = allProducts.find(p => p.slug === slug);

  if (!product) {
    return { product: null, relatedProducts: [] };
  }
  
  // Get 8 fully random products, excluding the current one.
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id) // Exclude the current product
    .sort(() => 0.5 - Math.random()) // Shuffle the array randomly
    .slice(0, 8); // Take the first 8 products

  return { product, relatedProducts };
};

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata(
  { params }: ProductPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params;
  const { product } = await getProductData(slug);

  if (!product) {
    return {
      title: "Product Not Found"
    }
  }

  const title = product.name;
  let description = `Shop for ${product.name} at huzi.pk. We deliver physical products all over Pakistan and digital products worldwide.`;

  if (product.description) {
      description = product.description;
  } else if (product.longDescription) {
      description = product.longDescription.split('\n')[0]; // Take first line of long description
  } else if (product.specifications) {
      const specs = Object.entries(product.specifications).slice(0, 2).map(([key, value]) => `${key}: ${value}`).join(', ');
      description = `Check out the ${product.name} with features like ${specs}. Available now at huzi.pk.`
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 1200,
          alt: product.name,
        }
      ],
      type: 'article',
      siteName: 'huzi.pk'
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.image],
    }
  }
}

export default async function ProductPage({ params: { slug } }: ProductPageProps) {
  const { product, relatedProducts } = await getProductData(slug);

  if (!product) {
    notFound();
  }
  
  const isProductInStock = product.stock !== undefined && product.stock > 0;

  const jsonLd: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
    sku: product.id.toString(),
    offers: {
      '@type': 'Offer',
      price: product.price.toFixed(2),
      priceCurrency: 'PKR',
      priceValidUntil: '2026-12-31',
      availability: isProductInStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `https://huzi.pk/product/${product.slug}`,
    },
  };

  if (isProductInStock) {
    jsonLd.offers.shippingDetails = {
      '@type': 'OfferShippingDetails',
      shippingRate: {
        '@type': 'MonetaryAmount',
        value: '250',
        currency: 'PKR',
      },
      shippingDestination: {
        '@type': 'DefinedRegion',
        addressCountry: 'PK',
      },
    };
    jsonLd.offers.hasMerchantReturnPolicy = {
      '@type': 'MerchantReturnPolicy',
      applicableCountry: 'PK',
      returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
      merchantReturnDays: 3,
      returnMethod: 'https://schema.org/ReturnByMail',
      returnFees: 'https://schema.org/ReturnFeesCustomerResponsibility',
    };
  }


  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailsClient key={product.id} product={product} />

      {relatedProducts.length > 0 && (
         <div className="mt-16 md:mt-24">
            <Separator className="mb-12"/>
            <h2 className="text-2xl md:text-3xl font-bold font-headline text-center mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {relatedProducts.map(relatedProduct => (
                    <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
            </div>
        </div>
      )}
    </div>
  );
}
