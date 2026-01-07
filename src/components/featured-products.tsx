
"use client";

import React, { useRef, useEffect, useState } from 'react';
import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { useWindowedProducts } from '@/hooks/use-windowed-products';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';
import { ArrowDown, ArrowUp } from 'lucide-react';

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <ProductCard key={`skeleton-${i}`} product={null} />
      ))}
    </div>
  );
}

export default function FeaturedProducts() {
  const {
    products,
    isLoading,
    loadMore,
    loadPrevious,
    canLoadMore,
    canLoadPrevious,
    gridRef,
    isLoadPreviousVisible,
    setIsLoadPreviousVisible,
    isRestoring,
  } = useWindowedProducts();

  const loadPreviousBarRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleMouseEnter = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    setIsLoadPreviousVisible(true);
  };

  const handleMouseLeave = () => {
    hideTimerRef.current = setTimeout(() => {
      setIsLoadPreviousVisible(false);
    }, 5000);
  };

  useEffect(() => {
    if (canLoadPrevious) {
      handleMouseLeave(); // Start timer on initial show
    }

    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [canLoadPrevious]);

  // Stagger animation for product cards
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('product-card-visible');
            }, index * 50); // Stagger by 50ms
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const cards = document.querySelectorAll('.product-card-animate');
    cards.forEach((card) => observerRef.current?.observe(card));

    return () => observerRef.current?.disconnect();
  }, [products]);

  if (isRestoring) {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-4xl font-bold">Featured Products</h2>
            <p className="mt-4 text-lg text-muted-foreground">Hand-picked just for you.</p>
          </div>
          <div
            id="featured-grid-container"
            className="relative"
          >
            <div ref={gridRef} id="featured-grid" className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} priority={true} />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24">
      <style jsx>{`
        .product-card-animate {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .product-card-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .section-title-animate {
          animation: fadeInUp 0.8s ease-out;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="container mx-auto px-4">
        <div
          ref={loadPreviousBarRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={cn(
            'sticky top-20 z-40 flex justify-center py-2 transition-all duration-300',
            canLoadPrevious && isLoadPreviousVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
          )}
        >
          <Button onClick={loadPrevious} variant="secondary" className="shadow-lg hover:scale-105 transition-transform">
            <ArrowUp className="mr-2" />
            Load Previous 25
          </Button>
        </div>

        <div className="text-center mb-12 section-title-animate">
          <h2 className="font-headline text-4xl font-bold">Featured Products</h2>
          <p className="mt-4 text-lg text-muted-foreground">A selection of our finest items, just for you.</p>
        </div>

        {isLoading && products.length === 0 ? (
          <ProductGridSkeleton />
        ) : (
          <div
            id="featured-grid-container"
            className="relative"
          >
            <div ref={gridRef} id="featured-grid" className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {products.map((p, i) => (
                <div key={p.id} className="product-card-animate">
                  <ProductCard product={p} priority={i < 10} />
                </div>
              ))}
            </div>

            {isLoading && products.length > 0 &&
              <div className="mt-8"><ProductGridSkeleton /></div>
            }
          </div>
        )}

        {canLoadMore && !isLoading && (
          <div className="mt-12 flex justify-center">
            <Button onClick={loadMore} size="lg" className="hover:scale-105 transition-transform duration-300">
              <ArrowDown className="mr-2" />
              Load More
            </Button>
          </div>
        )}

      </div>
    </section>
  );
}
