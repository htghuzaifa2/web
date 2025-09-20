
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
const MAX_PAGES = 2; // Keep 2 pages in memory (50 products total)

const getRandomProducts = (products: Product[], count: number, excludeIds: Set<number>): Product[] => {
  const availableProducts = products.filter(p => !excludeIds.has(p.id));
  const shuffled = [...availableProducts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function ProductGrid({ initialProducts, allProducts }: ProductGridProps) {
  const [productPages, setProductPages] = useState<Product[][]>([initialProducts]);
  const [pageHistory, setPageHistory] = useState<number>(0); // 0 for initial, 1 after first load more, etc.
  const hasLoadedFromSession = useRef(false);
  const topOfGridRef = useRef<HTMLDivElement>(null);

  const shownProductIds = useMemo(() => {
    const ids = new Set<number>();
    productPages.flat().forEach(p => ids.add(p.id));
    return ids;
  }, [productPages]);

  // Effect to handle session storage restoration
  useEffect(() => {
    if (hasLoadedFromSession.current) return;
    hasLoadedFromSession.current = true;

    const storedStateJSON = sessionStorage.getItem('home_product_grid');
    if (storedStateJSON) {
      try {
        const storedState = JSON.parse(storedStateJSON);
        if (storedState.productPages && Array.isArray(storedState.productPages) && storedState.productPages.length > 0) {
            setProductPages(storedState.productPages);
            setPageHistory(storedState.pageHistory || 0);
        }
        setTimeout(() => {
          window.scrollTo(0, storedState.scrollPosition || 0);
        }, 100);
      } catch {
        // Fallback to initial state if parsing fails
        setProductPages([initialProducts]);
      }
    }

    const handleNavigation = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Save state if clicking on a link that navigates away from the homepage
      const isProductLink = target.closest('a[href^="/product/"]');
      if (isProductLink) {
        const stateToStore = {
          productPages,
          pageHistory,
          scrollPosition: window.scrollY,
        };
        sessionStorage.setItem('home_product_grid', JSON.stringify(stateToStore));
      } else {
        // Clear session storage if navigating elsewhere on the site (e.g., header links) to ensure a fresh start on next visit
        const isInternalLink = target.closest('a[href^="/"]');
        if (isInternalLink && !isProductLink) {
            sessionStorage.removeItem('home_product_grid');
        }
      }
    };

    document.addEventListener('click', handleNavigation, true);

    return () => {
      document.removeEventListener('click', handleNavigation, true);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleLoadMore = () => {
    const newProducts = getRandomProducts(allProducts, PRODUCTS_PER_PAGE, shownProductIds);
    if (newProducts.length === 0) return;

    let updatedPages = [...productPages, newProducts];
    if (updatedPages.length > MAX_PAGES) {
      updatedPages.shift(); // Remove the oldest page
    }
    
    setProductPages(updatedPages);
    setPageHistory(prev => prev + 1);
  };

  const handleLoadPrevious = () => {
     // This generates a fresh set of products, simulating a "previous" random set
     const newProducts = getRandomProducts(allProducts, PRODUCTS_PER_PAGE, shownProductIds);
     if (newProducts.length === 0) return;

     let updatedPages = [newProducts, ...productPages];
     updatedPages.pop(); // Remove the last page
     
     setProductPages(updatedPages);
     setPageHistory(prev => Math.max(0, prev - 1));
     
     setTimeout(() => {
        topOfGridRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const canLoadMore = allProducts.length > shownProductIds.size;
  const canLoadPrevious = pageHistory > 0;

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
                    key={`${page[0]?.id}-${pageIndex}`} // More stable key
                    className={cn(
                        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6",
                        "content-fade-in"
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
