
"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import type { Category, Product } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import PaginatedProductGrid from "@/components/paginated-product-grid";

interface CategoryClientProps {
  category: Category;
  allProducts: Product[];
}

type SortOrder = "newest" | "oldest" | "price-asc" | "price-desc";

export default function CategoryClient({ category, allProducts }: CategoryClientProps) {
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const topOfProductsRef = useRef<HTMLDivElement>(null);

  const sortedProducts = useMemo(() => {
    let sorted = [...allProducts];
    switch (sortOrder) {
      case 'newest':
        return allProducts; // Default is already newest first
      case 'oldest':
        return [...allProducts].reverse();
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      default:
        return allProducts;
    }
  }, [allProducts, sortOrder]);
  
  // Effect for when sort order changes
  useEffect(() => {
    if (topOfProductsRef.current) {
        topOfProductsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [sortOrder]);

  const storageKey = `category_grid_${category.slug}_${sortOrder}`;

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
            <Select onValueChange={(value: SortOrder) => setSortOrder(value)} value={sortOrder}>
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
            key={storageKey} // Force re-mount when sort order changes
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
