
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
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

const ALL_PRODUCTS: Product[] = [...productsData].reverse();
const TOTAL_PRODUCTS = ALL_PRODUCTS.length;
const PAGE_SIZE = 20;
const TOTAL_PAGES = Math.ceil(TOTAL_PRODUCTS / PAGE_SIZE);

export const runtime = 'edge';

const getProductsForPage = (page: number) => {
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  return ALL_PRODUCTS.slice(startIndex, endIndex);
};

const getPaginationItems = (currentPage: number, totalPages: number) => {
    if (totalPages <= 1) return [];

    const pageNumbers: (number | string)[] = [];
    const pagesToShow = 5;
    
    if (totalPages <= pagesToShow) {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    }

    pageNumbers.push(1);

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
        startPage = 2;
        endPage = Math.min(totalPages - 1, 4);
    } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - 3);
        endPage = totalPages - 1;
    }

    if (startPage > 2) {
        pageNumbers.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    if (endPage < totalPages - 1) {
        pageNumbers.push('...');
    }
    
    pageNumbers.push(totalPages);

    return pageNumbers;
};

const getFeaturedProducts = () => {
    // Shuffle the array and take the first 8 products for a random selection
    const shuffled = [...ALL_PRODUCTS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 8);
}


export default function Home() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';
  const currentPage = isNaN(Number(page)) || Number(page) < 1 ? 1 : Number(page);
  
  const paginatedProducts = useMemo(() => getProductsForPage(currentPage), [currentPage]);
  const paginationItems = useMemo(() => getPaginationItems(currentPage, TOTAL_PAGES), [currentPage]);
  
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after hydration
    setIsClient(true);
    setFeaturedProducts(getFeaturedProducts());
  }, []);


  return (
    <div className="bg-background">
      <section className="w-full py-20 md:py-24 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">Discover Your Style At huzi.pk</h1>
          <p className="font-body mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Explore our curated collection of high-quality apparel and digital goods at huzi.pk.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/categories" prefetch={false}>Shop Now</Link>
          </Button>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center font-headline text-3xl font-bold text-foreground md:mb-12 md:text-4xl">
                Featured Products
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                 {!isClient ? (
                     Array.from({ length: 8 }).map((_, index) => (
                       <div key={index} className="flex flex-col gap-2">
                         <Skeleton className="aspect-square w-full" />
                         <Skeleton className="h-6 w-3/4 mx-auto" />
                         <Skeleton className="h-5 w-1/2 mx-auto" />
                       </div>
                     ))
                 ) : (
                    featuredProducts.map((product) => (
                        <ProductCard key={`featured-${product.id}`} product={product} />
                    ))
                 )}
            </div>
        </div>
      </section>

      <Separator className="my-8 md:my-12" />

      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-headline text-3xl font-bold text-foreground md:mb-12 md:text-4xl">
            All Products
          </h2>
           {paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
                            href={currentPage > 1 ? `/?page=${currentPage - 1}` : '#'}
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
                            <PaginationLink href={`/?page=${page}`} prefetch={false} isActive={page === currentPage}>
                              {page}
                            </PaginationLink>
                          ) : (
                            <PaginationEllipsis />
                          )}
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                         <Link
                            href={currentPage < TOTAL_PAGES ? `/?page=${currentPage + 1}` : '#'}
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
