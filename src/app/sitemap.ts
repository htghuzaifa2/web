
import { MetadataRoute } from 'next';

const siteUrl = 'https://huzi.pk';

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemaps = ['/pages.xml', '/product.xml', '/categories.xml'].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  return sitemaps;
}
