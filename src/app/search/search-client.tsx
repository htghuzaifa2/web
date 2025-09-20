
"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import ProductCard from "@/components/product-card";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";


const PRODUCTS_PER_PAGE = 25;
type SortOrder = "relevance" | "newest" | "oldest" | "price-asc" | "price-desc";


interface SearchClientProps {
  allProducts: Product[];
  query: string;
}

export default function SearchClient({ allProducts, query }: SearchClientProps) {
  const [visibleProductsCount, setVisibleProductsCount] = useState(PRODUCTS_PER_PAGE);
  const [sortOrder, setSortOrder] = useState<SortOrder>("relevance");
  const topOfProductsRef = useRef<HTMLDivElement>(null);

  // Memoize sorted products
  const sortedProducts = useMemo(() => {
    let sorted = [...allProducts];
     switch (sortOrder) {
      case 'relevance':
        return allProducts; // Default relevance from server
      case 'newest':
        return sorted.sort((a, b) => b.id - a.id);
      case 'oldest':
        return sorted.sort((a, b) => a.id - b.id);
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      default:
        return allProducts;
    }
  }, [allProducts, sortOrder]);
  
  // Reset page to 1 whenever the search query or sort order changes
  useEffect(() => {
    setVisibleProductsCount(PRODUCTS_PER_PAGE);
    if (topOfProductsRef.current) {
        topOfProductsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [query, sortOrder]);

  const visibleProducts = useMemo(() => {
    return sortedProducts.slice(0, visibleProductsCount);
  }, [visibleProductsCount, sortedProducts]);

  const showLoadMore = visibleProductsCount < sortedProducts.length;

  const handleLoadMore = () => {
    setVisibleProductsCount(prevCount => prevCount + PRODUCTS_PER_PAGE);
  };


  return (
    <div className="container mx-auto px-4 py-12 content-fade-in">
      <div ref={topOfProductsRef} className="scroll-mt-20" />
      <h1 className="mb-4 text-center font-headline text-4xl font-bold">
        Search Results
      </h1>
      {query ? (
        <>
          <h3 className="mb-8 text-center text-lg text-muted-foreground">
            Showing results for: <span className="font-semibold text-foreground">"{query}"</span>
          </h3>
          <div className="flex justify-end mb-8">
            <div className="flex items-center gap-2">
                <Label htmlFor="sort-by" className="text-sm font-medium">Sort by</Label>
                <Select onValueChange={(value: SortOrder) => setSortOrder(value)} defaultValue={sortOrder}>
                    <SelectTrigger id="sort-by" className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="newest">Latest (New to Old)</SelectItem>
                        <SelectItem value="oldest">Oldest (Old to New)</SelectItem>
                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    </SelectContent>
                </Select>
            </div>
         </div>
        </>
      ) : (
         <p className="text-center text-muted-foreground">Please enter a search term to find products.</p>
      )}


      {query && visibleProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {visibleProducts.map((product) => (
            <ProductCard key={`${product.id}-${sortOrder}`} product={product} />
          ))}
        </div>
      ) : (
        query && <p className="text-center text-muted-foreground py-16">No products found matching your search.</p>
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
