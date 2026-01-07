
import HomeLoader from './home-loader';
import type { Metadata } from 'next';
import productsData from '@/data/products.json';
import Script from 'next/script';

const siteConfig = {
  name: "HTG",
  url: "https://htg.com.pk",
  title: "HTG – Style Without Borders | Shop Premium Clothing",
  description: "Shop HTG for premium hoodies, jackets, tracksuits & gaming apparel for men, women & kids. Quality craftsmanship meets streetwear style. Shipped worldwide.",
};

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function Home() {
  const featuredProducts = productsData.slice(0, 5);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": siteConfig.url,
    "name": siteConfig.name,
    "description": siteConfig.description,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteConfig.url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "mainEntity": [
      ...featuredProducts.map(product => ({
        "@type": "Product",
        "name": product.name,
        "image": product.image.url,
        "description": product.description,
        "url": `${siteConfig.url}/product/${product.slug}`,
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "PKR"
        }
      }))
    ]
  };

  return (
    <>
      <Script
        id="home-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeLoader />
    </>
  );
}
