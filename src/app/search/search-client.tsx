
"use client";

import { useMemo, useRef } from "react";
import ProductCard from "@/components/product-card";
import type { Product } from "@/lib/types";
import { useSearchParams, useRouter } from "next/navigation";
import productsData from '@/data/products.json';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationEllipsis } from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PAGE_SIZE = 25;
type SortOrder = "relevance" | "newest" | "oldest" | "price-asc" | "price-desc";

const getPaginationItems = (currentPage: number, totalPages: number) => {
    if (totalPages <= 1) return [];
    const pageNumbers: (number | string)[] = [];
    pageNumbers.push(1);
    if (currentPage > 3) {
        pageNumbers.push('...');
    }
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        if (i > 1 && i < totalPages) {
            pageNumbers.push(i);
        }
    }
    if (currentPage < totalPages - 2) {
        pageNumbers.push('...');
    }
    if (totalPages > 1) {
        pageNumbers.push(totalPages);
    }
    return [...new Set(pageNumbers)];
};

export default function SearchClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topOfProductsRef = useRef<HTMLDivElement>(null);

  const query = searchParams.get('q') || '';
  const pageParam = searchParams.get('page') || '1';
  const sortParam = searchParams.get('sort') || 'relevance';

  const currentPage = useMemo(() => {
    const page = Number(pageParam);
    return isNaN(page) || page < 1 ? 1 : page;
  }, [pageParam]);

  const sortOrder = useMemo<SortOrder>(() => {
    const validSorts: SortOrder[] = ["relevance", "newest", "oldest", "price-asc", "price-desc"];
    return validSorts.includes(sortParam as SortOrder) ? sortParam as SortOrder : "relevance";
  }, [sortParam]);

  const allFoundProducts = useMemo(() => {
    if (!query) return [];
    const allProductsData: Product[] = productsData;
    return allProductsData.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(query.toLowerCase())) ||
      product.id.toString().includes(query)
    );
  }, [query]);

  const sortedProducts = useMemo(() => {
    let sorted = [...allFoundProducts];
    switch (sortOrder) {
      case 'newest':
        return sorted.sort((a, b) => b.id - a.id);
      case 'oldest':
        return sorted.sort((a, b) => a.id - b.id);
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'relevance':
      default:
        return sorted;
    }
  }, [allFoundProducts, sortOrder]);

  const TOTAL_PAGES = Math.ceil(sortedProducts.length / PAGE_SIZE);
  
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return sortedProducts.slice(startIndex, startIndex + PAGE_SIZE);
  }, [currentPage, sortedProducts]);

  const paginationItems = useMemo(() => getPaginationItems(currentPage, TOTAL_PAGES), [currentPage, TOTAL_PAGES]);

  const createUrl = (page: number, newSortOrder?: SortOrder) => {
      const finalSortOrder = newSortOrder || sortOrder;
      const params = new URLSearchParams();
      params.set('q', query);
      if (page > 1) params.set('page', page.toString());
      if (finalSortOrder !== 'relevance') params.set('sort', finalSortOrder);
      return `/search?${params.toString()}`;
  };

  const scrollToTop = () => {
    topOfProductsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSortChange = (value: SortOrder) => {
    router.push(createUrl(1, value));
    scrollToTop();
  };

  const handlePageChange = (page: number) => {
    router.push(createUrl(page));
    scrollToTop();
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
                <Select onValueChange={(value: SortOrder) => handleSortChange(value)} value={sortOrder}>
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

      {query && paginatedProducts.length > 0 ? (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {paginatedProducts.map((product) => (
                    <ProductCard key={`${product.id}-${sortOrder}`} product={product} />
                ))}
            </div>
            
            {TOTAL_PAGES > 1 && (
            <div className="mt-12">
                <Pagination>
                <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                          <a
                          href={createUrl(currentPage - 1)}
                          onClick={(e) => {e.preventDefault(); handlePageChange(currentPage-1)}}
                          className={cn(
                              buttonVariants({ variant: 'ghost', size: 'default' }),
                              'gap-1 pl-2.5'
                          )}
                          >
                          <ChevronLeft className="h-4 w-4" />
                          <span>Previous</span>
                      </a>
                      </PaginationItem>
                    )}
                    
                    {paginationItems.map((page, index) => (
                    <PaginationItem key={index}>
                        {typeof page === 'number' ? (
                        <a href={createUrl(page)} 
                            onClick={(e) => {e.preventDefault(); handlePageChange(page)}}
                            className={cn(buttonVariants({ variant: page === currentPage ? 'default' : 'ghost', size: 'icon' }))}
                        >
                            {page}
                        </a>
                        ) : (
                        <PaginationEllipsis />
                        )}
                    </PaginationItem>
                    ))}

                    {currentPage < TOTAL_PAGES && (
                      <PaginationItem>
                          <a
                          href={createUrl(currentPage + 1)}
                          onClick={(e) => {e.preventDefault(); handlePageChange(currentPage+1)}}
                          className={cn(
                              buttonVariants({ variant: 'ghost', size: 'default' }),
                              'gap-1 pr-2.5'
                          )}
                          >
                          <span>Next</span>
                          <ChevronRight className="h-4 w-4" />
                      </a>
                      </PaginationItem>
                    )}
                </PaginationContent>
                </Pagination>
            </div>
            )}
        </>
      ) : (
        query && <p className="text-center text-muted-foreground py-16">No products found matching your search.</p>
      )}
    </div>
  );
}
