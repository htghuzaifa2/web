import { MetadataRoute } from 'next';
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';
import { slugify } from '@/lib/utils';

const siteUrl = 'https://huzi.pk';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '/',
    '/about',
    '/categories',
    '/contact',
    '/faq',
    '/how-to-pay',
    '/shipping-policy',
    '/return-policy',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1 : 0.8,
  }));

  const productPages = productsData.products.map((product) => ({
    url: `${siteUrl}/product/${slugify(product.name)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const categoryPages = categoriesData.categories.map((category) => ({
    url: `${siteUrl}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...productPages, ...categoryPages];
}
