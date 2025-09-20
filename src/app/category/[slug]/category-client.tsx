
"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import type { Category, Product } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import PaginatedProductGrid from "@/components/paginated-product-grid";
import { useRouter, useSearchParams } from "next/navigation";
import { getCategoryData } from "@/lib/data-fetching";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/product-card";

interface CategoryClientProps {
  slug: string;
}

type SortOrder = "newest" | "oldest" | "price-asc" | "price-desc";

export default function CategoryClient({ slug }: CategoryClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topOfProductsRef = useRef<HTMLDivElement>(null);

  const [category, setCategory] = useState<Category | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const { category: fetchedCategory, allCategoryProducts } = await getCategoryData(slug);
      setCategory(fetchedCategory);
      setAllProducts(allCategoryProducts);
      setIsLoading(false);

      if (fetchedCategory) {
        document.title = `${fetchedCategory.name} - huzi.pk`;
      }
    }
    fetchData();
  }, [slug]);

  const sortParam = searchParams.get('sort') || 'newest';

  const sortOrder = useMemo<SortOrder>(() => {
    const validSortOrders: SortOrder[] = ["newest", "oldest", "price-asc", "price-desc"];
    return validSortOrders.includes(sortParam as SortOrder) ? sortParam as SortOrder : "newest";
  }, [sortParam]);

  const sortedProducts = useMemo(() => {
    if (!allProducts) return [];
    let sorted = [...allProducts];
    switch (sortOrder) {
      case 'newest':
        return sorted.sort((a, b) => b.id - a.id);
      case 'oldest':
        return sorted.sort((a, b) => a.id - b.id);
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      default:
        return sorted;
    }
  }, [allProducts, sortOrder]);

  const handleSortChange = (value: SortOrder) => {
    if (!category) return;
    const newUrl = `/category/${category.slug}${value !== 'newest' ? `?sort=${value}` : ''}`;
    router.push(newUrl);
    if (topOfProductsRef.current) {
        topOfProductsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const storageKey = `category_grid_${slug}_${sortOrder}`;
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
          <Skeleton className="h-10 w-1/2 mx-auto mb-2" />
          <Skeleton className="h-6 w-2/3 mx-auto mb-8" />
           <div className="flex justify-end mb-8">
            <Skeleton className="h-10 w-[180px]" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {Array.from({ length: 10 }).map((_, index) => (
              <ProductCard key={`skeleton-${index}`} product={null} />
            ))}
          </div>
      </div>
    )
  }

  if (!category) {
    return (
       <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Category not found</h1>
        <p className="mt-2 text-muted-foreground">The category you are looking for does not exist.</p>
      </div>
    )
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
      
      {sortedProducts.length > 0 ? (
         <PaginatedProductGrid 
            key={storageKey} 
            allProducts={sortedProducts} 
            storageKey={storageKey} 
        />
      ) : (
        <p className="text-center text-muted-foreground py-16">
          No products found in this category yet.
        </p>
      )}
    </div>
  );
}
