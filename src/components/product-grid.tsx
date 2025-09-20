
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

const PRODUCTS_PER_PAGE = 25; 
const MAX_PAGES_IN_MEMORY = 2; // Keep a maximum of 2 pages (50 products) in the display list at once

const getRandomProducts = (products: Product[], count: number, excludeIds: Set<number>): Product[] => {
  const availableProducts = products.filter(p => !excludeIds.has(p.id));
  const shuffled = [...availableProducts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function ProductGrid({ initialProducts, allProducts }: ProductGridProps) {
  const [productPages, setProductPages] = useState<Product[][]>([initialProducts]);
  const [pageHistoryIndex, setPageHistoryIndex] = useState<number>(0);
  const fullHistoryRef = useRef<Product[][]>([initialProducts]);
  const hasLoadedFromSession = useRef(false);
  const topOfGridRef = useRef<HTMLDivElement>(null);

  // Memoize the set of all currently shown product IDs for quick lookups
  const shownProductIds = useMemo(() => {
    const ids = new Set<number>();
    productPages.flat().forEach(p => ids.add(p.id));
    return ids;
  }, [productPages]);


  // Session storage effect to restore state on back navigation
  useEffect(() => {
    if (hasLoadedFromSession.current) return;
    hasLoadedFromSession.current = true;

    const storedStateJSON = sessionStorage.getItem('home_product_grid');
    if (storedStateJSON) {
      try {
        const storedState = JSON.parse(storedStateJSON);
        if (storedState.productPages && storedState.productPages.length > 0) {
            setProductPages(storedState.productPages);
            fullHistoryRef.current = storedState.fullHistory || [initialProducts];
            setPageHistoryIndex(storedState.pageHistoryIndex || 0);

            // Restore scroll position after a short delay to allow content to render
            setTimeout(() => {
                window.scrollTo(0, storedState.scrollPosition || 0);
            }, 100);
        }
      } catch {
        // Fallback to initial state if parsing fails
        setProductPages([initialProducts]);
      }
    }

    const handleNavigation = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a');

        // Save state ONLY if clicking a product link
        if (link && link.href.includes('/product/')) {
            const stateToStore = {
                productPages,
                fullHistory: fullHistoryRef.current,
                pageHistoryIndex,
                scrollPosition: window.scrollY,
            };
            sessionStorage.setItem('home_product_grid', JSON.stringify(stateToStore));
        } else if (link && link.getAttribute('href')?.startsWith('/')) {
            // If it's another internal link (not a product), clear the storage
            // to ensure a fresh start next time the user lands on the homepage.
            sessionStorage.removeItem('home_product_grid');
        }
    };
    
    // Listen for clicks to decide when to save state
    document.addEventListener('click', handleNavigation, true);

    return () => {
      document.removeEventListener('click', handleNavigation, true);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  const handleLoadMore = () => {
    const nextPageIndex = pageHistoryIndex + 1;
    let newProducts: Product[];

    // Check if we have this page in our history already
    if (fullHistoryRef.current[nextPageIndex]) {
      newProducts = fullHistoryRef.current[nextPageIndex];
    } else {
      // Generate a new page of products and add it to our full history
      newProducts = getRandomProducts(allProducts, PRODUCTS_PER_PAGE, shownProductIds);
      if (newProducts.length === 0) return; // No more unique products to show
      fullHistoryRef.current.push(newProducts);
    }
    
    // Update the visible pages, keeping only the last MAX_PAGES_IN_MEMORY
    const updatedVisiblePages = [...productPages, newProducts].slice(-MAX_PAGES_IN_MEMORY);
    
    setProductPages(updatedVisiblePages);
    setPageHistoryIndex(nextPageIndex);
  };

  const handleLoadPrevious = () => {
    if (pageHistoryIndex <= 0) return;

    const prevPageIndex = pageHistoryIndex - 1;
    const previousPageProducts = fullHistoryRef.current[prevPageIndex];
    
    // Construct the new visible pages array from history
    const newEndIndex = prevPageIndex + 1;
    const newStartIndex = Math.max(0, newEndIndex - MAX_PAGES_IN_MEMORY);
    const updatedVisiblePages = fullHistoryRef.current.slice(newStartIndex, newEndIndex);

    setProductPages(updatedVisiblePages);
    setPageHistoryIndex(prevPageIndex);

    // Smoothly scroll to the top of the grid to show the previous content
    setTimeout(() => {
      topOfGridRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  // Determine if the "Load More" button should be visible
  const canLoadMore = allProducts.length > shownProductIds.size;
  // The "Load Previous" button should only show if we are not on the very first page
  const canLoadPrevious = pageHistoryIndex > 0;

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
                    key={`${fullHistoryRef.current.indexOf(page)}`} // Use a key based on its position in the full history
                    className={cn(
                        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6",
                        "content-fade-in"
                    )}
                 >
                    {page.map((product, productIndex) => (
                        <ProductCard key={`${product.id}-${fullHistoryRef.current.indexOf(page)}`} product={product} priority={pageIndex === 0 && productIndex < 10} />
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
