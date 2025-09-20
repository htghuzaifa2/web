
"use client";

import { useState, useMemo, useRef, useEffect } from 'react';
import type { Product } from '@/lib/types';
import ProductCard from './product-card';
import { Button } from './ui/button';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductGridProps {
  initialProducts: Product[];
  allProducts: Product[];
}

const PRODUCTS_PER_PAGE = 25; // 5 lines of 5 products
const MAX_PAGES = 2; // Keep 2 pages in memory (10 lines total)

// Helper function to get random products, excluding already used IDs
const getRandomProducts = (products: Product[], count: number, excludeIds: Set<number>): Product[] => {
  const availableProducts = products.filter(p => !excludeIds.has(p.id));
  const shuffled = [...availableProducts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function ProductGrid({ initialProducts, allProducts }: ProductGridProps) {
  const [productPages, setProductPages] = useState<Product[][]>([initialProducts]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const topOfGridRef = useRef<HTMLDivElement>(null);

  // Keep track of all product IDs ever shown to avoid repeats
  const shownProductIds = useMemo(() => {
    const ids = new Set<number>();
    productPages.flat().forEach(p => ids.add(p.id));
    return ids;
  }, [productPages]);
  
  const handleLoadMore = () => {
    const newProducts = getRandomProducts(allProducts, PRODUCTS_PER_PAGE, shownProductIds);
    if (newProducts.length === 0) return; // No more unique products to show

    const updatedPages = [...productPages, newProducts];
    if (updatedPages.length > MAX_PAGES) {
      updatedPages.shift(); // Remove the first page
    } else {
      setCurrentPageIndex(prev => prev + 1);
    }
    setProductPages(updatedPages);
    
    // Smooth scroll to the top of the grid after loading
    setTimeout(() => {
        topOfGridRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleLoadPrevious = () => {
     // This logic is more complex than a simple "previous page" because of the random nature.
     // For this implementation, we will generate a fresh new set of random products.
     const newProducts = getRandomProducts(allProducts, PRODUCTS_PER_PAGE, shownProductIds);
     if (newProducts.length === 0) return;

     // Prepend the new page and remove the last one
     const updatedPages = [newProducts, ...productPages];
     updatedPages.pop();
     
     setProductPages(updatedPages);

     // Smooth scroll to the top
     setTimeout(() => {
        topOfGridRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const canLoadMore = allProducts.length > shownProductIds.size;
  // A simple way to enable "Load Previous" is if there's more than one page loaded.
  // A more robust system would track history, but for this dynamic grid, generating new content is better.
  const canLoadPrevious = productPages.length > 0;

  return (
    <div>
        <div ref={topOfGridRef} className="scroll-mt-20" />
        
        {canLoadPrevious && (
            <div className="text-center mb-12">
                <Button onClick={handleLoadPrevious} variant="outline" size="lg">
                    <ArrowUp className="mr-2" /> Load Previous
                </Button>
            </div>
        )}

        <div className="space-y-12">
            {productPages.map((page, pageIndex) => (
                 <div
                    key={pageIndex}
                    className={cn(
                        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6",
                        "transition-opacity duration-700 ease-in-out",
                    )}
                 >
                    {page.map((product, productIndex) => (
                        <ProductCard key={product.id} product={product} priority={productIndex < 10} />
                    ))}
                </div>
            ))}
        </div>
      
        {canLoadMore && (
            <div className="text-center mt-12">
                <Button onClick={handleLoadMore} size="lg">
                    Load More <ArrowDown className="ml-2" />
                </Button>
            </div>
        )}
    </div>
  );
}
