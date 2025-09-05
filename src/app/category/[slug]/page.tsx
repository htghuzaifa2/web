
import { notFound } from "next/navigation";
import dynamic from 'next/dynamic';
import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";
import type { Category } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import ProductCard from "@/components/product-card";

const getCategoryData = (slug: string) => {
  const category = categoriesData.categories.find((c) => c.slug === slug);
  if (!category) {
    return { category: null, allCategoryProducts: [] };
  }
  const allCategoryProducts = productsData
    .filter((product) => product.category.includes(slug))
    .reverse(); // Reverse to show latest products first
  return { category, allCategoryProducts };
};

export async function generateStaticParams() {
    return categoriesData.categories.map((category) => ({
        slug: category.slug,
    }));
}

const CategoryClient = dynamic(() => import('./category-client'), {
  ssr: false,
  loading: () => (
    <div className="container mx-auto px-4 py-12">
      <Skeleton className="h-10 w-1/2 mx-auto mb-2" />
      <Skeleton className="h-6 w-2/3 mx-auto mb-8" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {Array.from({ length: 20 }).map((_, index) => (
          <ProductCard key={`skeleton-${index}`} product={null} />
        ))}
      </div>
      <div className="text-center mt-12">
        <Button disabled>
            Load More <ArrowDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
});


export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { category, allCategoryProducts } = getCategoryData(params.slug);

  if (!category) {
    notFound();
  }

  return <CategoryClient category={category} allProducts={allCategoryProducts} />;
}
