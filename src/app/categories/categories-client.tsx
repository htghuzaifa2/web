
"use client";

import CategoryCard from "@/components/category-card";
import categoriesData from "@/data/categories.json";
import type { Category } from "@/lib/types";
import { useEffect, useRef } from "react";

export default function CategoriesClient() {
  const categories: Category[] = categoriesData.categories;
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('category-card-visible');
            }, index * 100); // Stagger by 100ms
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const cards = document.querySelectorAll('.category-card-animate');
    cards.forEach((card) => observerRef.current?.observe(card));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <style jsx>{`
        .title-animate {
          animation: fadeInUp 0.7s ease-out;
        }
        .category-card-animate {
          opacity: 0;
          transform: translateY(30px) scale(0.95);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .category-card-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
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

      <h1 className="mb-8 text-center font-headline text-4xl font-bold title-animate">
        All Categories
      </h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div key={category.id} className="category-card-animate">
            <CategoryCard category={category} />
          </div>
        ))}
      </div>
    </div>
  );
}
