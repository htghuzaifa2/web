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
      {Array.from({ length: 10 }).map((_, i) => (
        <ProductCard key={`skeleton-${i}`} product={null} />
      ))}
    </div>
  );
}

export function ProductGridLoader({ category, sortBy, randomize = false }: { category?: string, sortBy?: string, randomize?: boolean }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Create a unique key for session storage based on the component's context
  const storageKey = `product_grid_${category || 'all'}_${sortBy || 'default'}_${randomize ? 'random' : ''}`;


  const fetchAndSetProducts = useCallback(
    async (page: number, keepExisting = false) => {
      setIsLoading(true);
      const { products: newProducts, total } = await serverFetchProducts({ page, limit: BATCH_SIZE, category, sortBy, randomize });

      const currentProductList = keepExisting ? products : [];
      const totalProductsAfterLoad = currentProductList.length + newProducts.length;

      setProducts((prev) => {
        const currentProducts = keepExisting ? prev : [];
        const allProducts = [...currentProducts, ...newProducts];
        const productMap = new Map(allProducts.map(p => [p.id, p]));
        return Array.from(productMap.values());
      });

      setHasMore(totalProductsAfterLoad < total);
      setCurrentPage(page);
      setIsLoading(false);

      if (!keepExisting && gridRef.current) {
        // Using a timeout to ensure the scroll happens after the new content has rendered
        setTimeout(() => gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [category, sortBy, randomize, products] // products is needed for keepExisting
  );
  
  // Effect for saving state to session storage before unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      const stateToSave = {
        products,
        currentPage,
        hasMore,
        scrollPosition: window.scrollY,
      };
      sessionStorage.setItem(storageKey, JSON.stringify(stateToSave));
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [products, currentPage, hasMore, storageKey]);


  useEffect(() => {
    const savedStateJSON = sessionStorage.getItem(storageKey);
    let shouldFetchNew = true;

    // This logic runs when props (category, sortBy) change.
    // We want to fetch new data, so we clear old session storage for the new key.
    sessionStorage.removeItem(storageKey);

    setProducts([]);
    setCurrentPage(1);
    setHasMore(true);
    fetchAndSetProducts(1, false);
    
     // Clear session storage on hard reload (but not on back/forward nav)
    const handlePageShow = (event: PageTransitionEvent) => {
        if (event.persisted === false) { // event.persisted is false on first load/reload
             sessionStorage.removeItem(storageKey);
        }
    }
    window.addEventListener('pageshow', handlePageShow);


    return () => {
        // When the component unmounts, save the current state
        if (gridRef.current) {
             const stateToSave = {
                products,
                currentPage,
                hasMore,
                scrollPosition: window.scrollY,
            };
            sessionStorage.setItem(storageKey, JSON.stringify(stateToSave));
        }
        window.removeEventListener('pageshow', handlePageShow);
    };
  // The effect MUST re-run when category or sortBy change.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, sortBy, randomize]);

  const loadMoreProducts = () => {
    if (hasMore && !isLoading) {
      fetchAndSetProducts(currentPage + 1, true);
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
          No products found in this category.
       </div>
     )
  }

  return (
    <div>
       <div ref={gridRef} className="scroll-mt-20" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {products.map((p, i) => <ProductCard key={`${p.id}-${i}`} product={p} priority={i < 10}/>)}
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
