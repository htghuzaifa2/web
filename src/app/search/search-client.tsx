
"use client";

import { useState, useMemo, useEffect, useCallback, ChangeEvent } from "react";
import ProductCard from "@/components/product-card";
import { useSearchParams } from "next/navigation";
import type { Product } from "@/lib/types";
import productsData from "@/data/products.json";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/use-debounce";

const ALL_PRODUCTS: Product[] = [...productsData];
const PAGE_SIZE = 25;

export default function SearchClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(true);

  const debouncedQuery = useDebounce(query, 150);

  const filteredProducts = useMemo(() => {
    const trimmedQuery = debouncedQuery.trim();

    if (!trimmedQuery) {
      return [];
    }

    // Rule a: ID search for digits-only input
    if (/^\d+$/.test(trimmedQuery)) {
      const productId = parseInt(trimmedQuery, 10);
      return ALL_PRODUCTS.filter(p => p.id === productId);
    }

    // Rule b: Title search for other inputs
    const lowercasedQuery = trimmedQuery.toLowerCase();
    return ALL_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(lowercasedQuery)
    );
  }, [debouncedQuery]);

  useEffect(() => {
    setIsLoading(true);
    setVisibleCount(PAGE_SIZE);
    setDisplayedProducts(filteredProducts.slice(0, PAGE_SIZE));
    setIsLoading(false);
  }, [filteredProducts]);

  const loadMore = useCallback(() => {
    const newVisibleCount = visibleCount + PAGE_SIZE;
    setVisibleCount(newVisibleCount);
    setDisplayedProducts(filteredProducts.slice(0, newVisibleCount));
  }, [visibleCount, filteredProducts]);

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  const hasMore = visibleCount < filteredProducts.length;

  // This is a bit of a workaround to keep the input in sync with the URL
  // on initial load and back/forward navigation.
   useEffect(() => {
    if (initialQuery !== query) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);


  return (
    <div className="container mx-auto px-4 py-12 content-fade-in">
      <h1 className="mb-4 text-center font-headline text-4xl font-bold">
        Search Products
      </h1>
      
      {/* We keep the original search bar component logic in the header for consistency */}
      {/* This client component now primarily handles displaying the results */}

      {initialQuery ? (
        <>
          <h3 className="mb-8 text-center text-lg text-muted-foreground">
            Showing results for: <span className="font-semibold text-foreground">"{initialQuery}"</span>
          </h3>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {Array.from({ length: 10 }).map((_, i) => <ProductCard key={`skel-${i}`} product={null} />)}
            </div>
          ) : displayedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {hasMore && (
                <div className="mt-8 flex justify-center">
                  <Button onClick={loadMore} size="lg">
                    Load More
                  </Button>
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-muted-foreground py-16">No products found</p>
          )}
        </>
      ) : (
         <p className="text-center text-muted-foreground">Please enter a search term to find products.</p>
      )}
    </div>
  );
}

// A hook for debouncing value changes
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
