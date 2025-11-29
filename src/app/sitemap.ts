
import { MetadataRoute } from 'next';

const siteUrl = 'https://huzi.pk';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    '/',
    '/about',
    '/all-products',
    '/categories',
    '/contact',
    '/faq',
    '/how-to-pay',
    '/shipping-policy',
    '/return-policy',
    '/cash-on-delivery',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1 : 0.8,
  }));

  return staticPages;
}
