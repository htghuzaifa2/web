
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Search, ShoppingBag, File, History, X } from "lucide-react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import type { Product, Category } from "@/lib/types";
import { slugify } from "@/lib/utils";

const products: Product[] = productsData.products;
const categories: Category[] = categoriesData.categories;

const staticPages = [
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Shipping Policy", path: "/shipping-policy" },
    { name: "All Categories", path: "/categories" },
    { name: "FAQ", path: "/faq"},
    { name: "How to Pay", path: "/how-to-pay"}
];

export function SearchDialog() {
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const [searchHistory, setSearchHistory] = React.useState<string[]>([]);
    const router = useRouter();
    

    React.useEffect(() => {
        const storedHistory = localStorage.getItem("searchHistory");
        if (storedHistory) {
            setSearchHistory(JSON.parse(storedHistory));
        }
    }, []);

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const updateSearchHistory = React.useCallback((newQuery: string) => {
        const trimmedQuery = newQuery.trim();
        if (!trimmedQuery) return;
        
        setSearchHistory(prevHistory => {
            const newHistory = [trimmedQuery, ...prevHistory.filter(h => h.toLowerCase() !== trimmedQuery.toLowerCase())].slice(0, 5);
            localStorage.setItem("searchHistory", JSON.stringify(newHistory));
            return newHistory;
        });
    }, []);
    
    const removeFromHistory = (e: React.MouseEvent, itemToRemove: string) => {
        e.preventDefault();
        e.stopPropagation();
        const newHistory = searchHistory.filter(item => item !== itemToRemove);
        setSearchHistory(newHistory);
        localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    };

    const clearHistory = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setSearchHistory([]);
        localStorage.removeItem("searchHistory");
    }

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false);
        command();
    }, []);

    const handleSelect = (path: string, currentQuery?: string) => {
        if (currentQuery) {
            updateSearchHistory(currentQuery);
        }
        runCommand(() => router.push(path));
    };

    const filteredProducts = React.useMemo(() => {
        if (query.trim().length === 0) return [];
        return products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
    }, [query]);

    const filteredCategories = React.useMemo(() => {
        if (query.trim().length === 0) return [];
        return categories.filter(c => c.name.toLowerCase().includes(query.toLowerCase())).slice(0, 3);
    }, [query]);
    
    const filteredPages = React.useMemo(() => {
        if (query.trim().length === 0) return [];
        return staticPages.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 3);
    }, [query]);

    return (
        <>
            <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput 
                    placeholder="Search products, categories, or pages..." 
                    value={query}
                    onValueChange={setQuery}
                />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    
                    {query.length === 0 && searchHistory.length > 0 && (
                        <CommandGroup heading={
                            <div className="flex justify-between items-center">
                                <span>Recent Searches</span>
                                <Button variant="link" className="text-xs p-0 h-auto" onClick={clearHistory}>
                                    Clear
                                </Button>
                            </div>
                        }>
                            {searchHistory.map((historyItem) => (
                                <CommandItem 
                                    key={historyItem} 
                                    onSelect={() => runCommand(() => setQuery(historyItem))}
                                    className="group"
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center">
                                            <History className="mr-2 h-4 w-4" />
                                            <span>{historyItem}</span>
                                        </div>
                                        <button 
                                            className="h-6 w-6 opacity-0 group-hover:opacity-100 p-1 rounded-full hover:bg-muted"
                                            onClick={(e) => removeFromHistory(e, historyItem)}
                                            aria-label="Remove from history"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}
                    
                    {query.trim().length > 0 && (
                      <>
                        {filteredProducts.length > 0 && (
                            <CommandGroup heading="Products">
                                {filteredProducts.map((product) => (
                                    <CommandItem
                                        key={`product-${product.id}`}
                                        value={`Product: ${product.name}`}
                                        onSelect={() => handleSelect(`/product/${slugify(product.name)}`, query)}
                                    >
                                        <ShoppingBag className="mr-2 h-4 w-4" />
                                        <span>{product.name}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                        
                        {filteredCategories.length > 0 && <CommandSeparator />}

                        {filteredCategories.length > 0 && (
                            <CommandGroup heading="Categories">
                                {filteredCategories.map((category) => (
                                    <CommandItem
                                        key={`category-${category.id}`}
                                        value={`Category: ${category.name}`}
                                        onSelect={() => handleSelect(`/category/${category.slug}`, query)}
                                    >
                                        <File className="mr-2 h-4 w-4" />
                                        <span>{category.name}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                        
                        {filteredPages.length > 0 && <CommandSeparator />}

                        {filteredPages.length > 0 && (
                            <CommandGroup heading="Pages">
                                {filteredPages.map((page) => (
                                    <CommandItem
                                        key={`page-${page.path}`}
                                        value={`Page: ${page.name}`}
                                        onSelect={() => handleSelect(page.path, query)}
                                    >
                                        <File className="mr-2 h-4 w-4" />
                                        <span>{page.name}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                      </>
                    )}
                </CommandList>
            </CommandDialog>
        </>
    );
}
