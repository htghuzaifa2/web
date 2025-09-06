
"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import ProductCard from "@/components/product-card";
import type { Category, Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const PRODUCTS_PER_PAGE = 25;

interface CategoryClientProps {
  category: Category;
  allProducts: Product[];
}

export default function CategoryClient({ category, allProducts }: CategoryClientProps) {
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const pageRef = useRef(1);
  const scrollPositionRef = useRef(0);
  const hasLoadedFromSession = useRef(false);

  // Function to load products for a given page number
  const loadProducts = (page: number): Product[] => {
    const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return allProducts.slice(startIndex, endIndex);
  };
  
  // Effect to handle initial load and session storage restoration
  useEffect(() => {
    if (hasLoadedFromSession.current) return;
    hasLoadedFromSession.current = true;

    const storedStateJSON = sessionStorage.getItem(`category_${category.slug}`);
    if (storedStateJSON) {
      try {
        const storedState = JSON.parse(storedStateJSON);
        setVisibleProducts(storedState.products || loadProducts(1));
        pageRef.current = storedState.page || 1;
        
        // Restore scroll position after a short delay to allow content to render
        setTimeout(() => {
          window.scrollTo(0, storedState.scrollPosition || 0);
        }, 100);
      } catch {
        setVisibleProducts(loadProducts(1));
      }
    } else {
      setVisibleProducts(loadProducts(1));
    }

    // Save state on navigation away from the page
    const handleBeforeUnload = () => {
      const stateToStore = {
        products: visibleProducts,
        page: pageRef.current,
        scrollPosition: window.scrollY,
      };
      sessionStorage.setItem(`category_${category.slug}`, JSON.stringify(stateToStore));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [category.slug, allProducts, visibleProducts]); // Added visibleProducts dependency

  const handleLoadMore = () => {
    const nextPage = pageRef.current + 1;
    const newProducts = loadProducts(nextPage);
    setVisibleProducts(prevProducts => [...prevProducts, ...newProducts]);
    pageRef.current = nextPage;
    scrollPositionRef.current = window.scrollY; // Save scroll position before new content loads
  };
  
  // Effect to restore scroll position after more products are loaded
  useEffect(() => {
      if (scrollPositionRef.current > 0) {
        window.scrollTo(0, scrollPositionRef.current);
        scrollPositionRef.current = 0; // Reset after scroll
      }
  }, [visibleProducts.length]);


  const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);
  const showLoadMore = pageRef.current < totalPages;

  return (
    <div className="container mx-auto px-4 py-12 content-fade-in">
      <h1 className="mb-2 text-center font-headline text-4xl font-bold">
        {category.name}
      </h1>
      <p className="mb-8 text-center text-muted-foreground">
        {`Browse our collection of ${category.name.toLowerCase()}.`}
      </p>
      
      {visibleProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
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
