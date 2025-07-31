
import ProductCard from '@/components/product-card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationEllipsis } from '@/components/ui/pagination';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import productsData from '@/data/products.json';
import type { Product } from '@/lib/types';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Metadata } from 'next';

const PRODUCTS_PER_PAGE = 20;

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

export async function generateMetadata({ searchParams }: { searchParams: { q?: string } }): Promise<Metadata> {
  const query = searchParams.q || '';
  if (!query) {
    return {
      title: "Search - huzi.pk"
    }
  }

  return {
    title: `Search results for "${query}" - huzi.pk`,
    description: `Find products matching "${query}" on huzi.pk.`,
    robots: {
      index: false, // No need to index search results pages
      follow: true,
    },
  };
}

export default function SearchPage({ searchParams }: { searchParams: { q?: string; page?: string } }) {
  const query = searchParams.q || '';
  const currentPage = Number(searchParams.page) || 1;

  const allProducts: Product[] = productsData.products;

  const filteredProducts = query
    ? allProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const paginationItems = getPaginationItems(currentPage, totalPages);

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

      {query && paginatedProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {paginatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <Link
                      href={currentPage > 1 ? `/search?q=${query}&page=${currentPage - 1}` : '#'}
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
                        <PaginationLink href={`/search?q=${query}&page=${page}`} isActive={page === currentPage}>
                          {page}
                        </PaginationLink>
                      ) : (
                        <PaginationEllipsis />
                      )}
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <Link
                      href={currentPage < totalPages ? `/search?q=${query}&page=${currentPage + 1}` : '#'}
                      aria-disabled={currentPage >= totalPages}
                      className={cn(
                        buttonVariants({ variant: 'ghost', size: 'default' }),
                        'gap-1 pr-2.5',
                        currentPage >= totalPages && 'cursor-not-allowed opacity-50'
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
        query && <p className="text-center text-muted-foreground">No products found matching your search.</p>
      )}
    </div>
  );
}
