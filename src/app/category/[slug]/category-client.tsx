
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
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const pageRef = useRef(1);
  const scrollPositionRef = useRef(0);
  const hasLoadedFromSession = useRef(false);
  const topOfProductsRef = useRef<HTMLDivElement>(null);

  const sortedProducts = useMemo(() => {
    let sorted = [...allProducts];
    switch (sortOrder) {
      case 'newest':
        // The default is already newest first from the server
        return allProducts;
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

  // Function to load products for a given page number
  const loadProducts = (page: number): Product[] => {
    const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return sortedProducts.slice(startIndex, endIndex);
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
        setSortOrder(storedState.sortOrder || 'newest');
        
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
        sortOrder: sortOrder,
        scrollPosition: window.scrollY,
      };
      sessionStorage.setItem(`category_${category.slug}`, JSON.stringify(stateToStore));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category.slug, sortedProducts]); // Removed allProducts and visibleProducts, added sortedProducts

  // Effect for when sort order changes
  useEffect(() => {
    pageRef.current = 1;
    setVisibleProducts(loadProducts(1));
    if (topOfProductsRef.current) {
        topOfProductsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOrder, sortedProducts]);


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


  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const showLoadMore = pageRef.current < totalPages;

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
            <Select onValueChange={(value: SortOrder) => setSortOrder(value)} defaultValue={sortOrder}>
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
