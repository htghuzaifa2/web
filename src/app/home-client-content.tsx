
"use client";

import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import type { Product } from '@/lib/types';
import productsData from '@/data/products.json';
import Link from 'next/link';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationEllipsis } from '@/components/ui/pagination';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
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
    const pagesToShow = 3; 
    
    if (totalPages <= pagesToShow + 2) {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    } else {
        pageNumbers.push(1);
        if (currentPage > 2) {
            pageNumbers.push('...');
        }
        
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);

        for (let i = startPage; i <= endPage; i++) {
             if(i > 1 && i < totalPages) pageNumbers.push(i);
        }

        if (currentPage < totalPages - 1) {
            pageNumbers.push('...');
        }
        pageNumbers.push(totalPages);
    }
    return [...new Set(pageNumbers)];
};


interface HomeClientContentProps {
    featuredProducts: Product[];
}

export default function HomeClientContent({ featuredProducts }: HomeClientContentProps) {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const sortParam = searchParams.get('sort');

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const topOfProductsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = Number(pageParam);
    setCurrentPage(isNaN(page) || page < 1 ? 1 : page);
    
    const validSortOrders: SortOrder[] = ["newest", "oldest", "price-asc", "price-desc"];
    if (sortParam && validSortOrders.includes(sortParam as SortOrder)) {
      setSortOrder(sortParam as SortOrder);
    } else {
      setSortOrder("newest");
    }
  }, [pageParam, sortParam]);

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
  const paginationItems = useMemo(() => getPaginationItems(currentPage, TOTAL_PAGES), [currentPage]);

  const handleSortChange = (value: SortOrder) => {
    const newUrl = `/?page=1${value !== 'newest' ? `&sort=${value}` : ''}`;
    window.history.pushState({}, '', newUrl);
    setSortOrder(value);
    setCurrentPage(1); // Reset to page 1 on sort change
    if (topOfProductsRef.current) {
      topOfProductsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const createPageUrl = (page: number) => {
    if (page < 1 || page > TOTAL_PAGES) return '#';
    let url = `/?page=${page}`;
    if (sortOrder !== 'newest') {
      url += `&sort=${sortOrder}`;
    }
    return url;
  };

  return (
    <div className="bg-background content-fade-in">
      <section className="w-full py-20 md:py-24 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">Discover Your Style At huzi.pk</h1>
          <p className="font-body mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Explore our curated collection of high-quality apparel and digital goods at huzi.pk.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/categories">Shop Now</Link>
          </Button>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center font-headline text-3xl font-bold text-foreground md:mb-12 md:text-4xl">
                Featured Products
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                 {featuredProducts.map((product, index) => (
                    <ProductCard key={`featured-${product.id}`} product={product} priority={index < 5} />
                 ))}
            </div>
        </div>
      </section>

      <Separator className="my-8 md:my-12" />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-2 text-center font-headline text-3xl font-bold text-foreground md:text-4xl">
            All Products
          </h2>

          <div ref={topOfProductsRef} className="scroll-mt-20" />

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
                      <PaginationItem>
                         <Link
                            href={createPageUrl(currentPage - 1)}
                            prefetch={false}
                            aria-disabled={currentPage <= 1}
                            className={cn(
                                buttonVariants({ variant: 'ghost', size: 'default' }),
                                'gap-1 pl-2.5',
                                currentPage <= 1 && 'cursor-not-allowed opacity-50'
                            )}
                            >
                            <ChevronLeft className="h-4 w-4" />
                            <span>Previous</span>
                        </Link>
                      </PaginationItem>
                      
                      {paginationItems.map((page, index) => (
                        <PaginationItem key={index}>
                          {typeof page === 'number' ? (
                            <PaginationLink href={createPageUrl(page)} prefetch={false} isActive={page === currentPage}>
                              {page}
                            </PaginationLink>
                          ) : (
                            <PaginationEllipsis />
                          )}
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                         <Link
                            href={createPageUrl(currentPage + 1)}
                            prefetch={false}
                            aria-disabled={currentPage >= TOTAL_PAGES}
                            className={cn(
                                buttonVariants({ variant: 'ghost', size: 'default' }),
                                'gap-1 pr-2.5',
                                currentPage >= TOTAL_PAGES && 'cursor-not-allowed opacity-50'
                            )}
                            >
                            <span>Next</span>
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-muted-foreground">The store is currently empty. Check back later!</p>
          )}
        </div>
      </section>
    </div>
  );
}
