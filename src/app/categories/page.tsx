
import type { Metadata } from 'next';
import CategoryCard from "@/components/category-card";
import categoriesData from "@/data/categories.json";
import type { Category } from "@/lib/types";

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
  const categories: Category[] = categoriesData.categories;

  return (
    <div className="container mx-auto px-4 py-12 content-fade-in">
      <h1 className="mb-8 text-center font-headline text-4xl font-bold">
        All Categories
      </h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
