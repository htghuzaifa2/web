
import type { Metadata } from 'next';
import CategoriesWrapper from './categories-wrapper';

export const metadata: Metadata = {
  title: 'All Categories',
  description: 'Explore all product categories at huzi.pk, from fashion and apparel to digital goods and essentials. Find exactly what you are looking for.',
  openGraph: {
      title: 'All Categories',
      description: 'Explore all product categories at huzi.pk, from fashion and apparel to digital goods and essentials. Find exactly what you are looking for.',
      url: '/categories',
  }
};

export default function CategoriesPage() {
  return <CategoriesWrapper />;
}
