
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Search, ShoppingBag, File, History, X } from "lucide-react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import type { Product, Category } from "@/lib/types";

const staticPages = [
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Shipping Policy", path: "/shipping-policy" },
    { name: "Terms of Service", path: "/terms-of-service" },
    { name: "All Categories", path: "/categories" },
];

export function SearchDialog() {
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const [searchHistory, setSearchHistory] = React.useState<string[]>([]);
    const router = useRouter();
    const products: Product[] = productsData.products;
    const categories: Category[] = categoriesData.categories;

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

    const updateSearchHistory = (newQuery: string) => {
        if (!newQuery.trim() || searchHistory.includes(newQuery)) return;
        
        const newHistory = [newQuery, ...searchHistory.filter(h => h !== newQuery)].slice(0, 5);
        setSearchHistory(newHistory);
        localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    };
    
    const removeFromHistory = (itemToRemove: string) => {
        const newHistory = searchHistory.filter(item => item !== itemToRemove);
        setSearchHistory(newHistory);
        localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    }

    const handleSelect = (path: string) => {
        updateSearchHistory(query);
        setOpen(false);
        setQuery("");
        router.push(path);
    };

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
                        <CommandGroup heading="Recent Searches">
                            {searchHistory.map((historyItem) => (
                                <CommandItem 
                                    key={historyItem} 
                                    onSelect={() => setQuery(historyItem)}
                                    className="flex justify-between items-center"
                                >
                                    <div className="flex items-center">
                                       <History className="mr-2 h-4 w-4" />
                                       <span>{historyItem}</span>
                                    </div>
                                    <Button 
                                       variant="ghost" 
                                       size="icon" 
                                       className="h-6 w-6" 
                                       onClick={(e) => { e.stopPropagation(); removeFromHistory(historyItem); }}
                                    >
                                       <X className="h-3 w-3" />
                                    </Button>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}

                    <CommandGroup heading="Products">
                        {products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5).map((product) => (
                            <CommandItem
                                key={`product-${product.id}`}
                                value={product.name}
                                onSelect={() => handleSelect(`/product/${product.category}/${product.slug}`)}
                            >
                                <ShoppingBag className="mr-2 h-4 w-4" />
                                <span>{product.name}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    
                    <CommandGroup heading="Categories">
                        {categories.filter(c => c.name.toLowerCase().includes(query.toLowerCase())).slice(0, 3).map((category) => (
                            <CommandItem
                                key={`category-${category.id}`}
                                value={category.name}
                                onSelect={() => handleSelect(`/category/${category.slug}`)}
                            >
                                <File className="mr-2 h-4 w-4" />
                                <span>{category.name}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>

                    <CommandGroup heading="Pages">
                        {staticPages.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 3).map((page) => (
                            <CommandItem
                                key={`page-${page.path}`}
                                value={page.name}
                                onSelect={() => handleSelect(page.path)}
                            >
                                <File className="mr-2 h-4 w-4" />
                                <span>{page.name}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}

