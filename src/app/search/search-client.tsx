
"use client";

import { useState, useMemo, useEffect } from "react";
import ProductCard from "@/components/product-card";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";

const PRODUCTS_PER_PAGE = 25;
const MAX_PRODUCTS_ON_PAGE = 50;

interface SearchClientProps {
  allProducts: Product[];
  query: string;
}

export default function SearchClient({ allProducts, query }: SearchClientProps) {
  const [page, setPage] = useState(1);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Reset page to 1 whenever the search query changes
  useEffect(() => {
    setPage(1);
  }, [query]);

  const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);

  const handleLoadMore = () => {
    setPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const handleLoadPrevious = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const visibleProducts = useMemo(() => {
    // The "window" logic: how many pages to show at once
    const pagesOnScreen = Math.ceil(MAX_PRODUCTS_ON_PAGE / PRODUCTS_PER_PAGE);
    
    // Determine the start and end page for the sliding window
    const endPage = page;
    const startPage = Math.max(1, endPage - pagesOnScreen + 1);

    const startIndex = (startPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = endPage * PRODUCTS_PER_PAGE;
    
    return allProducts.slice(startIndex, endIndex);
  }, [page, allProducts]);
  
  const showLoadPrevious = page > Math.ceil(MAX_PRODUCTS_ON_PAGE / PRODUCTS_PER_PAGE);
  const showLoadMore = page < totalPages;
  
  if (!isClient) {
      // Render a static shell on the server to avoid layout shifts
      return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="mb-4 text-center font-headline text-4xl font-bold">
                Search Results
            </h1>
            {query && (
                <h3 className="mb-8 text-center text-lg text-muted-foreground">
                Showing results for: <span className="font-semibold text-foreground">"{query}"</span>
                </h3>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {allProducts.slice(0, PRODUCTS_PER_PAGE).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            {allProducts.length > PRODUCTS_PER_PAGE && (
              <div className="text-center mt-12">
                <Button>
                    Load More <ArrowDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
        </div>
      );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-4 text-center font-headline text-4xl font-bold">
        Search Results
      </h1>
      {query ? (
        <h3 className="mb-8 text-center text-lg text-muted-foreground">
          Showing results for: <span className="font-semibold text-foreground">"{query}"</span>
        </h3>
      ) : (
         <p className="text-center text-muted-foreground">Please enter a search term to find products.</p>
      )}

      {showLoadPrevious && (
        <div className="text-center mb-8">
            <Button onClick={handleLoadPrevious}>
                <ArrowUp className="mr-2 h-4 w-4" /> Load Previous
            </Button>
        </div>
      )}

      {query && visibleProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        query && <p className="text-center text-muted-foreground">No products found matching your search.</p>
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
