"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import type { Category } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ProductGridLoader } from "@/components/product-grid-loader";
import { useRouter, useSearchParams } from "next/navigation";
import categoriesData from "@/data/categories.json";
import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/product-card";


interface CategoryClientProps {
  slug: string;
}

type SortOrder = "newest" | "oldest" | "price-asc" | "price-desc";

const getCategoryData = (slug: string) => {
  const category = categoriesData.categories.find((c) => c.slug === slug);
  if (!category) {
    return { category: null };
  }
  return { category };
};

function CategoryPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Skeleton className="h-10 w-1/2 mx-auto mb-2" />
      <Skeleton className="h-6 w-3/4 mx-auto mb-8" />
      <div className="flex justify-end mb-8">
        <Skeleton className="h-10 w-[180px]" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard key={`skeleton-${index}`} product={null} />
        ))}
      </div>
    </div>
  );
}

export default function CategoryClient({ slug }: CategoryClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topOfProductsRef = useRef<HTMLDivElement>(null);
  
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { category: fetchedCategory } = getCategoryData(slug);
    
    if (!fetchedCategory) {
      notFound();
    }
    
    setCategory(fetchedCategory);
    setIsLoading(false);
    
    document.title = `${fetchedCategory.name} - huzi.pk`;
  }, [slug]);

  const sortParam = searchParams.get('sort') || 'newest';

  const sortOrder = useMemo<SortOrder>(() => {
    const validSortOrders: SortOrder[] = ["newest", "oldest", "price-asc", "price-desc"];
    return validSortOrders.includes(sortParam as SortOrder) ? sortParam as SortOrder : "newest";
  }, [sortParam]);

  const handleSortChange = (value: SortOrder) => {
    if (!category) return;
    const newUrl = `/category/${category.slug}${value !== 'newest' ? `?sort=${value}` : ''}`;
    router.push(newUrl);
    if (topOfProductsRef.current) {
        topOfProductsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading || !category) {
      return <CategoryPageSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-12 content-fade-in">
      <h1 className="mb-2 text-center font-headline text-4xl font-bold">
        {category.name}
      </h1>
      <p className="mb-8 text-center text-muted-foreground">
        {`Browse our collection of ${category.name.toLowerCase()}.`}
      </p>

      <div ref={topOfProductsRef} className="scroll-mt-20" />
      
      <div className="flex justify-end mb-8">
        <div className="flex items-center gap-2">
            <Label htmlFor="sort-by" className="text-sm font-medium">Sort by</Label>
            <Select onValueChange={(value: SortOrder) => handleSortChange(value)} value={sortOrder}>
                <SelectTrigger id="sort-by" className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="newest">Latest (New to Old)</SelectItem>
                    <SelectItem value="oldest">Oldest (Old to New)</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </div>
      
       <ProductGridLoader key={`${slug}-${sortOrder}`} category={slug} sortBy={sortOrder} />
    </div>
  );
}
