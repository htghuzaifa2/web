'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { Product } from '@/lib/types';
import { fetchProducts as serverFetchProducts } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import ProductCard from './product-card';
import { ArrowDown, ArrowUp } from 'lucide-react';

const BATCH_SIZE = 25;

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
      {Array.from({ length: BATCH_SIZE }).map((_, i) => (
        <ProductCard key={`skeleton-${i}`} product={null} />
      ))}
    </div>
  );
}

export function ProductGridLoader({ category, sortBy }: { category?: string, sortBy?: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);

  const fetchAndSetProducts = useCallback(
    async (page: number, keepExisting = false) => {
      setIsLoading(true);
      const { products: newProducts, total } = await serverFetchProducts({ page, limit: BATCH_SIZE, category, sortBy });

      setProducts((prev) => {
        const currentProducts = keepExisting ? prev : [];
        const allProducts = [...currentProducts, ...newProducts];
        const productMap = new Map(allProducts.map(p => [p.id, p]));
        const uniqueProducts = Array.from(productMap.values());
        
        // Keep only the latest two batches (50 products)
        if (uniqueProducts.length > BATCH_SIZE * 2) {
          return uniqueProducts.slice(-BATCH_SIZE * 2);
        }
        return uniqueProducts;
      });

      setHasMore(products.length + newProducts.length < total);
      setCurrentPage(page);
      setIsLoading(false);

      if (!keepExisting && gridRef.current) {
        gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    [category, sortBy, products.length]
  );

  useEffect(() => {
    setProducts([]);
    setCurrentPage(1);
    setHasMore(true);
    fetchAndSetProducts(1, false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, sortBy]);

  const loadMoreProducts = () => {
    if (hasMore && !isLoading) {
      fetchAndSetProducts(currentPage + 1, true);
    }
  };

  const loadPreviousProducts = () => {
    if (currentPage > 1 && !isLoading) {
      const targetPage = currentPage - 1;
       // Since we only keep 2 pages, going back more than 1 page requires a fresh fetch
      if (products.length > BATCH_SIZE) {
         setProducts(products.slice(0, BATCH_SIZE));
         setCurrentPage(targetPage);
         if (gridRef.current) {
            gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
         }
      } else {
         fetchAndSetProducts(targetPage, false);
      }
    }
  };
  
  if (isLoading && products.length === 0) {
    return (
      <div>
        <ProductGridSkeleton />
      </div>
    );
  }

  if (products.length === 0 && !isLoading) {
     return (
       <div className="text-center py-16 text-muted-foreground">
          No products found.
       </div>
     )
  }

  return (
    <div>
       <div ref={gridRef} className="scroll-mt-20" />
      {currentPage > 1 && products.length > BATCH_SIZE && (
        <div className="mb-8 flex justify-center">
          <Button onClick={loadPreviousProducts} disabled={isLoading} variant="outline" size="lg">
             <ArrowUp className="mr-2" />
            {isLoading ? 'Loading...' : 'Load Previous'}
          </Button>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {products.map((p, i) => <ProductCard key={p.id} product={p} priority={i < 10}/>)}
      </div>

      {isLoading && products.length > 0 && 
        <div className="mt-8">
            <ProductGridSkeleton/>
        </div>
      }

      {hasMore && !isLoading && (
        <div className="mt-8 flex justify-center">
          <Button onClick={loadMoreProducts} disabled={isLoading} size="lg">
            {isLoading ? 'Loading...' : 'Load More'}
            <ArrowDown className="ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
