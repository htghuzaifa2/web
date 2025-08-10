
"use client";

import { useState, useMemo, useEffect } from "react";
import ProductCard from "@/components/product-card";
import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";
import type { Category, Product } from "@/lib/types";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";

const PRODUCTS_PER_PAGE = 25;
const MAX_PRODUCTS_ON_PAGE = 50;

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  // These are not stateful, they can be calculated once.
  const category = useMemo(() => categoriesData.categories.find((c) => c.slug === slug), [slug]);
  const allCategoryProducts = useMemo(() => productsData.products.filter(
    (product) => product.category.includes(slug)
  ), [slug]);

  const [page, setPage] = useState(1);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const totalPages = Math.ceil(allCategoryProducts.length / PRODUCTS_PER_PAGE);

  const handleLoadMore = () => {
    setPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const handleLoadPrevious = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const visibleProducts = useMemo(() => {
    const productsInWindow = page * PRODUCTS_PER_PAGE;
    
    // The "window" logic: how many pages to show at once
    const pagesOnScreen = Math.ceil(MAX_PRODUCTS_ON_PAGE / PRODUCTS_PER_PAGE);
    
    // Determine the start and end page for the sliding window
    const endPage = page;
    const startPage = Math.max(1, endPage - pagesOnScreen + 1);

    const startIndex = (startPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = endPage * PRODUCTS_PER_PAGE;
    
    return allCategoryProducts.slice(startIndex, endIndex);
  }, [page, allCategoryProducts]);

  if (!category) {
    notFound();
  }
  
  const showLoadPrevious = page > Math.ceil(MAX_PRODUCTS_ON_PAGE / PRODUCTS_PER_PAGE);
  const showLoadMore = page < totalPages;

  if (!isClient) {
      // Render a static shell on the server to avoid layout shifts
      return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="mb-2 text-center font-headline text-4xl font-bold">
                {category.name}
            </h1>
            <p className="mb-8 text-center text-muted-foreground">
                {`Browse our collection of ${category.name.toLowerCase()}.`}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {allCategoryProducts.slice(0, PRODUCTS_PER_PAGE).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
      );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-2 text-center font-headline text-4xl font-bold">
        {category.name}
      </h1>
      <p className="mb-8 text-center text-muted-foreground">
        {`Browse our collection of ${category.name.toLowerCase()}.`}
      </p>
      
      {showLoadPrevious && (
        <div className="text-center mb-8">
            <Button onClick={handleLoadPrevious}>
                <ArrowUp className="mr-2 h-4 w-4" /> Load Previous
            </Button>
        </div>
      )}

      {visibleProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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

// This function generates static pages for all categories defined in categories.json
export async function generateStaticParams() {
  const categories: Category[] = categoriesData.categories;
  return categories.map((category) => ({
    slug: category.slug,
  }));
}
