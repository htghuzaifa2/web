
"use client";

import { useMemo, useRef } from "react";
import ProductCard from "@/components/product-card";
import { useSearchParams, useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ProductGridLoader } from "@/components/product-grid-loader";

type SortOrder = "relevance" | "newest" | "oldest" | "price-asc" | "price-desc";

export default function SearchClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topOfProductsRef = useRef<HTMLDivElement>(null);

  const query = searchParams.get('q') || '';
  const sortParam = searchParams.get('sort') || 'relevance';

  const sortOrder = useMemo<SortOrder>(() => {
    const validSorts: SortOrder[] = ["relevance", "newest", "oldest", "price-asc", "price-desc"];
    return validSorts.includes(sortParam as SortOrder) ? sortParam as SortOrder : "relevance";
  }, [sortParam]);
  
  const handleSortChange = (value: SortOrder) => {
    const params = new URLSearchParams();
    params.set('q', query);
    if (value !== 'relevance') {
      params.set('sort', value);
    }
    router.push(`/search?${params.toString()}`);
    topOfProductsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-12 content-fade-in">
      <div ref={topOfProductsRef} className="scroll-mt-20" />
      <h1 className="mb-4 text-center font-headline text-4xl font-bold">
        Search Results
      </h1>
      {query ? (
        <>
          <h3 className="mb-8 text-center text-lg text-muted-foreground">
            Showing results for: <span className="font-semibold text-foreground">"{query}"</span>
          </h3>
          <div className="flex justify-end mb-8">
            <div className="flex items-center gap-2">
                <Label htmlFor="sort-by" className="text-sm font-medium">Sort by</Label>
                <Select onValueChange={(value: SortOrder) => handleSortChange(value)} value={sortOrder}>
                    <SelectTrigger id="sort-by" className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="newest">Latest (New to Old)</SelectItem>
                        <SelectItem value="oldest">Oldest (Old to New)</SelectItem>
                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    </SelectContent>
                </Select>
            </div>
         </div>
         <ProductGridLoader key={`${query}-${sortOrder}`} searchQuery={query} sortBy={sortOrder} />
        </>
      ) : (
         <p className="text-center text-muted-foreground">Please enter a search term to find products.</p>
      )}
    </div>
  );
}
