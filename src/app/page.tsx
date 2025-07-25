import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import type { Product } from '@/lib/types';
import productsData from '@/data/products.json';
import Link from 'next/link';
import Image from 'next/image';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from '@/components/ui/pagination';

const getProductsForPage = (page: number, pageSize: number) => {
  const products: Product[] = [...productsData].reverse(); // Reverse to show latest first
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
  const halfPages = Math.floor(pagesToShow / 2);

  if (totalPages <= pagesToShow) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else if (currentPage <= halfPages + 1) {
    for (let i = 1; i <= pagesToShow - 1; i++) {
      pageNumbers.push(i);
    }
    pageNumbers.push('...');
    pageNumbers.push(totalPages);
  } else if (currentPage >= totalPages - halfPages) {
    pageNumbers.push(1);
    pageNumbers.push('...');
    for (let i = totalPages - (pagesToShow - 2); i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    pageNumbers.push(1);
    pageNumbers.push('...');
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      pageNumbers.push(i);
    }
    pageNumbers.push('...');
    pageNumbers.push(totalPages);
  }

  return pageNumbers;
};


export default function Home({ searchParams }: { searchParams: { page?: string } }) {
  const products: Product[] = productsData;
  const featuredProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 10);

  const currentPage = Number(searchParams.page) || 1;
  const pageSize = 20;
  const { products: paginatedProducts, totalPages } = getProductsForPage(currentPage, pageSize);
  const paginationItems = getPaginationItems(currentPage, totalPages);

  return (
    <div className="bg-background">
      <section className="relative h-[60vh] w-full text-white">
        <Image
          src="https://placehold.co/1600x900"
          alt="Stylish model wearing modern clothing in a vibrant city setting"
          layout="fill"
          objectFit="cover"
          className="absolute z-0"
          data-ai-hint="fashion clothes"
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-center bg-black/50 p-4 text-center">
          <h1 className="font-headline text-5xl font-bold md:text-7xl">Discover Your Style</h1>
          <p className="font-body mt-4 max-w-2xl text-lg md:text-xl">
            Explore our curated collection of high-quality apparel and digital goods.
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/categories">Shop Now</Link>
          </Button>
        </div>
      </section>
      
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center font-headline text-3xl font-bold text-foreground md:mb-12 md:text-4xl">
            Featured Products
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 md:gap-6 lg:gap-8">
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
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6 lg:gap-8">
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
