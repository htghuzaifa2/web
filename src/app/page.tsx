
import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import type { Product } from '@/lib/types';
import productsData from '@/data/products.json';
import Link from 'next/link';
import Image from 'next/image';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from '@/components/ui/pagination';

const getProductsForPage = (page: number, pageSize: number) => {
  const products: Product[] = [...productsData.products].reverse(); // Reverse to show latest first
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return {
    products: products.slice(startIndex, endIndex),
    totalPages: Math.ceil(products.length / pageSize),
  };
};

const getPaginationItems = (currentPage: number, totalPages: number) => {
    const pageNumbers = [];
    const pagesToShow = 5; 
    
    // Always show the first page
    pageNumbers.push(1);

    // Determine the middle range of pages
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    if (currentPage <= 3) {
        startPage = 2;
        endPage = Math.min(totalPages - 1, pagesToShow-1);
    } else if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - (pagesToShow - 2));
        endPage = totalPages - 1;
    }

    // Add ellipsis if there's a gap after the first page
    if (startPage > 2) {
        pageNumbers.push('...');
    }

    // Add the middle page numbers
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    // Add ellipsis if there's a gap before the last page
    if (endPage < totalPages - 1) {
        pageNumbers.push('...');
    }
    
    // Always show the last page if there is more than one page
    if (totalPages > 1) {
        pageNumbers.push(totalPages);
    }

    // Remove duplicates, in case of small number of pages (e.g. totalPages=2)
    return [...new Set(pageNumbers)];
};


export default function Home({ searchParams }: { searchParams: { page?: string } }) {
  const products: Product[] = productsData.products;
  const featuredProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 10);

  const currentPage = Number(searchParams.page) || 1;
  const pageSize = 20;
  const { products: paginatedProducts, totalPages } = getProductsForPage(currentPage, pageSize);
  const paginationItems = getPaginationItems(currentPage, totalPages);

  return (
    <div className="bg-background">
       <section className="relative w-full overflow-hidden bg-muted/30 py-24 md:py-32">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="font-headline text-5xl font-bold md:text-7xl text-foreground">Discover Your Style</h1>
          <p className="font-body mt-4 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Explore our curated collection of high-quality apparel and digital goods.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/categories">Shop Now</Link>
          </Button>
        </div>
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
                <h2 className="text-[12vw] lg:text-[10vw] font-black text-foreground/5 leading-none tracking-tighter">
                    huzi.pk
                </h2>
                <p className="text-[4vw] lg:text-[3vw] font-bold text-foreground/5 leading-none tracking-wider -mt-[2vw]">
                    name build with trust
                </p>
            </div>
        </div>
      </section>
      
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-headline text-3xl font-bold text-foreground md:mb-12 md:text-4xl">
            Featured Products
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 md:gap-6 lg:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-headline text-3xl font-bold text-foreground md:mb-12 md:text-4xl">
            Our Products
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-6 lg:gap-8">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious href={`/?page=${currentPage - 1}`} />
                    </PaginationItem>
                  )}
                  
                  {paginationItems.map((page, index) => (
                    <PaginationItem key={index}>
                      {typeof page === 'number' ? (
                        <PaginationLink href={`/?page=${page}`} isActive={page === currentPage}>
                          {page}
                        </PaginationLink>
                      ) : (
                        <PaginationEllipsis />
                      )}
                    </PaginationItem>
                  ))}

                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext href={`/?page=${currentPage + 1}`} />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
