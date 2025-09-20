
"use client";

import { useState, useMemo, useRef, useEffect } from 'react';
import type { Product } from '@/lib/types';
import ProductCard from './product-card';
import { Button } from './ui/button';
import { ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductGridProps {
  initialProducts: Product[];
  allProducts: Product[];
}

const PRODUCTS_PER_PAGE = 25; // 5 rows of 5 products
const MAX_PAGES_IN_MEMORY = 2; // Keep a maximum of 2 pages (10 rows) in the display list at once

const getRandomProducts = (products: Product[], count: number, excludeIds: Set<number>): Product[] => {
  const availableProducts = products.filter(p => !excludeIds.has(p.id));
  const shuffled = [...availableProducts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function ProductGrid({ initialProducts, allProducts }: ProductGridProps) {
  const [productPages, setProductPages] = useState<Product[][]>([initialProducts]);
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

    // On a manual refresh, browsers sometimes try to restore scroll position.
    // This ensures we start at the top unless session storage is used.
    const handleBeforeUnload = () => {
      if (!sessionStorage.getItem('home_product_grid')) {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('click', handleNavigation, true);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  const handleLoadMore = () => {
    const newProducts = getRandomProducts(allProducts, PRODUCTS_PER_PAGE, shownProductIds);
    if (newProducts.length === 0) return; // No more unique products to show
    
    // Add the new page and then slice to keep only the last `MAX_PAGES_IN_MEMORY` pages.
    // This creates the cycling effect of keeping a maximum of 10 rows.
    setProductPages(prevPages => [...prevPages, newProducts].slice(-MAX_PAGES_IN_MEMORY));
  };
  
  // Determine if the "Load More" button should be visible
  const canLoadMore = allProducts.length > shownProductIds.size;

  return (
    <div>
        <div ref={topOfGridRef} className="scroll-mt-20" />

        <div className="space-y-12">
            {productPages.map((page, pageIndex) => (
                 <div
                    key={page.map(p => p.id).join('-')} // A stable key based on the content of the page
                    className={cn(
                        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6",
                        "content-fade-in"
                    )}
                 >
                    {page.map((product, productIndex) => (
                        <ProductCard key={product.id} product={product} priority={pageIndex === 0 && productIndex < 10} />
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
