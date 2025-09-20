
"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import ProductCard from "@/components/product-card";
import type { Category, Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const PRODUCTS_PER_PAGE = 25;

interface CategoryClientProps {
  category: Category;
  allProducts: Product[];
}

type SortOrder = "newest" | "oldest" | "price-asc" | "price-desc";

export default function CategoryClient({ category, allProducts }: CategoryClientProps) {
  const [visibleProductsCount, setVisibleProductsCount] = useState(PRODUCTS_PER_PAGE);
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
    setVisibleProductsCount(PRODUCTS_PER_PAGE);
    if (topOfProductsRef.current) {
        topOfProductsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [sortOrder]);


  const handleLoadMore = () => {
    setVisibleProductsCount(prevCount => prevCount + PRODUCTS_PER_PAGE);
  };
  
  const visibleProducts = useMemo(() => sortedProducts.slice(0, visibleProductsCount), [sortedProducts, visibleProductsCount]);
  
  const showLoadMore = visibleProductsCount < sortedProducts.length;

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
      
      {visibleProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {visibleProducts.map((product) => (
            <ProductCard key={`${product.id}-${sortOrder}`} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-16">
          No products found in this category yet.
        </p>
      )}

      {showLoadMore && (
        <div className="text-center mt-12">
            <Button onClick={handleLoadMore}>
                Load More <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
        </div>
      )}
    </div>
  );
}
