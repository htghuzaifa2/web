
"use client";

import { useState, useMemo, useRef, useEffect, useReducer } from 'react';
import type { Product } from '@/lib/types';
import ProductCard from './product-card';
import { Button } from './ui/button';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const PRODUCTS_PER_PAGE = 25; // 5 rows of 5 products
const MAX_PAGES_IN_MEMORY = 2; // Keep a maximum of 2 pages (5 rows * 2) = 10 rows in the display list at once

interface GridState {
  productPages: Product[][];
  currentPageIndex: number;
  allShownProductIds: Set<number>;
}

type GridAction =
  | { type: 'LOAD_MORE'; newProducts: Product[] }
  | { type: 'LOAD_PREVIOUS' }
  | { type: 'RESTORE_STATE'; state: GridState };

function gridReducer(state: GridState, action: GridAction): GridState {
  switch (action.type) {
    case 'LOAD_MORE': {
      const newPages = [...state.productPages, action.newProducts];
      const newPageIndex = newPages.length > MAX_PAGES_IN_MEMORY 
        ? state.currentPageIndex + 1 
        : state.currentPageIndex;
      
      const newAllIds = new Set(state.allShownProductIds);
      action.newProducts.forEach(p => newAllIds.add(p.id));

      return {
        productPages: newPages,
        currentPageIndex: newPageIndex,
        allShownProductIds: newAllIds,
      };
    }
    case 'LOAD_PREVIOUS': {
       if (state.currentPageIndex <= 0) return state;
       return {
        ...state,
        currentPageIndex: state.currentPageIndex - 1,
      };
    }
    case 'RESTORE_STATE':
        const restoredIds = new Set<number>();
        action.state.productPages.flat().forEach(p => restoredIds.add(p.id));
        return {
            ...action.state,
            allShownProductIds: restoredIds
        };
    default:
      return state;
  }
}

const getRandomProducts = (products: Product[], count: number, excludeIds: Set<number>): Product[] => {
  const availableProducts = products.filter(p => !excludeIds.has(p.id));
  const shuffled = [...availableProducts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};


export default function PaginatedProductGrid({ allProducts, storageKey }: { allProducts: Product[], storageKey: string }) {
  const initialProducts = useMemo(() => getRandomProducts(allProducts, PRODUCTS_PER_PAGE, new Set()), [allProducts]);
  
  const initialState: GridState = {
    productPages: [initialProducts],
    currentPageIndex: 0,
    allShownProductIds: new Set(initialProducts.map(p => p.id)),
  };

  const [state, dispatch] = useReducer(gridReducer, initialState);
  const hasLoadedFromSession = useRef(false);
  const topOfGridRef = useRef<HTMLDivElement>(null);
  
  // Session storage effect to restore state on back navigation
  useEffect(() => {
    if (hasLoadedFromSession.current) return;
    hasLoadedFromSession.current = true;

    const storedStateJSON = sessionStorage.getItem(storageKey);
    if (storedStateJSON) {
      try {
        const storedState = JSON.parse(storedStateJSON);
        if (storedState.productPages && storedState.productPages.length > 0) {
          dispatch({ type: 'RESTORE_STATE', state: storedState });
            
            setTimeout(() => {
                window.scrollTo(0, storedState.scrollPosition || 0);
            }, 100);
        }
      } catch {
        // Fallback to initial state if parsing fails
      }
    }

    const handleNavigation = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a');

        if (link && (link.href.includes('/product/') || link.href.includes('/category/'))) {
            const stateToStore = {
                ...state,
                scrollPosition: window.scrollY,
            };
            sessionStorage.setItem(storageKey, JSON.stringify(stateToStore));
        } else if (link && (link.getAttribute('href')?.startsWith('/') || link.getAttribute('href')?.startsWith('#'))) {
            if (!link.href.includes('/product/') && !link.href.includes('/category/')) {
                 sessionStorage.removeItem(storageKey);
            }
        }
    };
    
    document.addEventListener('click', handleNavigation, true);

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
       if (e.persisted) return; // Ignore bfcache navigations
       if (!sessionStorage.getItem(storageKey)) {
          // If we are navigating away for real, clear the storage
          sessionStorage.removeItem(storageKey);
       }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('click', handleNavigation, true);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [state, storageKey]);

  const handleLoadMore = () => {
    const newProducts = getRandomProducts(allProducts, PRODUCTS_PER_PAGE, state.allShownProductIds);
    if (newProducts.length === 0) return;
    dispatch({ type: 'LOAD_MORE', newProducts });
  };
  
  const handleLoadPrevious = () => {
    dispatch({ type: 'LOAD_PREVIOUS' });
    topOfGridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const visiblePages = state.productPages.slice(state.currentPageIndex, state.currentPageIndex + MAX_PAGES_IN_MEMORY);

  const canLoadMore = allProducts.length > state.allShownProductIds.size;
  const canLoadPrevious = state.currentPageIndex > 0;

  return (
    <div>
        <div ref={topOfGridRef} className="scroll-mt-20" />
        
        {canLoadPrevious && (
            <div className="text-center mb-12">
                <Button onClick={handleLoadPrevious} size="lg" variant="outline">
                    <ArrowUp className="mr-2" /> Load Previous
                </Button>
            </div>
        )}

        <div className="space-y-12">
            {visiblePages.map((page, pageIndex) => (
                 <div
                    key={page.map(p => p.id).join('-')}
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
