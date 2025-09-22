
"use client";

import ProductCard from '@/components/product-card';
import type { Product } from '@/lib/types';
import productsData from '@/data/products.json';
import Link from 'next/link';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationEllipsis } from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useMemo, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ALL_PRODUCTS: Product[] = [...productsData];
const TOTAL_PRODUCTS = ALL_PRODUCTS.length;
const PAGE_SIZE = 20;
const TOTAL_PAGES = Math.ceil(TOTAL_PRODUCTS / PAGE_SIZE);

type SortOrder = "newest" | "oldest" | "price-asc" | "price-desc";

const getProductsForPage = (page: number, products: Product[]) => {
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  return products.slice(startIndex, endIndex);
};

const getPaginationItems = (currentPage: number, totalPages: number) => {
    if (totalPages <= 1) return [];

    const pageNumbers: (number | string)[] = [];
    const delta = 1; // pages to show around current page
    const left = currentPage - delta;
    const right = currentPage + delta + 1;
    let range: number[] = [];
    let rangeWithDots: (number|string)[] = [];
    
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= left && i < right)) {
            range.push(i);
        }
    }

    let l: number | null = null;
    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        l = i;
    }

    return rangeWithDots;
};


export default function AllProductsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const topOfProductsRef = useRef<HTMLDivElement>(null);

  const pageParam = searchParams.get('page') || '1';
  const sortParam = searchParams.get('sort') || 'newest';

  const currentPage = useMemo(() => {
    const page = Number(pageParam);
    return isNaN(page) || page < 1 ? 1 : page;
  }, [pageParam]);

  const sortOrder = useMemo<SortOrder>(() => {
    const validSortOrders: SortOrder[] = ["newest", "oldest", "price-asc", "price-desc"];
    return validSortOrders.includes(sortParam as SortOrder) ? sortParam as SortOrder : "newest";
  }, [sortParam]);

  const sortedProducts = useMemo(() => {
    let sorted = [...ALL_PRODUCTS];
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
        return sorted.sort((a, b) => b.id - a.id);
    }
  }, [sortOrder]);
  
  const paginatedProducts = useMemo(() => getProductsForPage(currentPage, sortedProducts), [currentPage, sortedProducts]);
  const paginationItems = useMemo(() => getPaginationItems(currentPage, TOTAL_PAGES), [currentPage, TOTAL_PAGES]);

  const handleSortChange = (value: SortOrder) => {
    const newUrl = `/all-products?page=1${value !== 'newest' ? `&sort=${value}` : ''}`;
    router.push(newUrl);
    scrollToTop();
  };
  
  const createPageUrl = (page: number) => {
    if (page < 1 || page > TOTAL_PAGES) return '#';
    let url = `/all-products?page=${page}`;
    if (sortOrder !== 'newest') {
      url += `&sort=${sortOrder}`;
    }
    return url;
  };
  
  const scrollToTop = () => {
    if (topOfProductsRef.current) {
        topOfProductsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePageChange = (page: number) => {
    const url = createPageUrl(page);
    router.push(url);
    scrollToTop();
  };


  return (
    <div className="container mx-auto px-4 py-12 md:py-16 content-fade-in">
        <div ref={topOfProductsRef} className="scroll-mt-20" />
        <h1 className="mb-2 text-center font-headline text-3xl font-bold text-foreground md:text-4xl">
            All Products
        </h1>
        <p className="mb-8 text-center text-muted-foreground">
            Browse our entire collection.
        </p>

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
        {paginatedProducts.length > 0 ? (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {paginatedProducts.map((product) => (
                <ProductCard key={`paginated-${product.id}`} product={product} />
            ))}
            </div>
            {TOTAL_PAGES > 1 && (
            <div className="mt-12">
                <Pagination>
                <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                          <Link
                          href={createPageUrl(currentPage - 1)}
                          onClick={(e) => {e.preventDefault(); handlePageChange(currentPage-1)}}
                          className={cn(
                              buttonVariants({ variant: 'ghost', size: 'default' }),
                              'gap-1 pl-2.5'
                          )}
                          >
                          <ChevronLeft className="h-4 w-4" />
                          <span>Previous</span>
                      </Link>
                      </PaginationItem>
                    )}
                    
                    {paginationItems.map((page, index) => (
                    <PaginationItem key={index}>
                        {typeof page === 'number' ? (
                        <Link href={createPageUrl(page)}
                            onClick={(e) => {e.preventDefault(); handlePageChange(page)}}
                            className={cn(buttonVariants({ variant: page === currentPage ? 'default' : 'ghost', size: 'icon' }))}
                        >
                            {page}
                        </Link>
                        ) : (
                        <PaginationEllipsis />
                        )}
                    </PaginationItem>
                    ))}

                    {currentPage < TOTAL_PAGES && (
                      <PaginationItem>
                          <Link
                          href={createPageUrl(currentPage + 1)}
                          onClick={(e) => {e.preventDefault(); handlePageChange(currentPage+1)}}
                          className={cn(
                              buttonVariants({ variant: 'ghost', size: 'default' }),
                              'gap-1 pr-2.5'
                          )}
                          >
                          <span>Next</span>
                          <ChevronRight className="h-4 w-4" />
                      </Link>
                      </PaginationItem>
                    )}
                </PaginationContent>
                </Pagination>
            </div>
            )}
        </>
        ) : (
        <p className="text-center text-muted-foreground">The store is currently empty. Check back later!</p>
        )}
    </div>
  );
}
