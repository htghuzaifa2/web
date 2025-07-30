
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

const staticPages = [
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Shipping Policy", path: "/shipping-policy" },
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
        const trimmedQuery = newQuery.trim();
        if (!trimmedQuery) return;
        
        const newHistory = [trimmedQuery, ...searchHistory.filter(h => h.toLowerCase() !== trimmedQuery.toLowerCase())].slice(0, 5);
        setSearchHistory(newHistory);
        localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    };
    
    const removeFromHistory = (e: React.MouseEvent<HTMLButtonElement>, itemToRemove: string) => {
        e.preventDefault();
        e.stopPropagation();
        const newHistory = searchHistory.filter(item => item !== itemToRemove);
        setSearchHistory(newHistory);
        localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    }

    const handleSelect = (path: string) => {
        updateSearchHistory(query);
        router.push(path);
        setOpen(false);
    };

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false)
        command()
    }, [])

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
                    onValuechange={setQuery}
                />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    
                    {query.length === 0 && searchHistory.length > 0 && (
                        <CommandGroup heading="Recent Searches">
                            {searchHistory.map((historyItem) => (
                                <CommandItem 
                                    key={historyItem} 
                                    onSelect={() => runCommand(() => setQuery(historyItem))}
                                    className="group flex justify-between items-center"
                                >
                                    <div className="flex items-center">
                                       <History className="mr-2 h-4 w-4" />
                                       <span>{historyItem}</span>
                                    </div>
                                    <Button 
                                       variant="ghost" 
                                       size="icon" 
                                       className="h-6 w-6 opacity-0 group-hover:opacity-100" 
                                       onClick={(e) => removeFromHistory(e, historyItem)}
                                    >
                                       <X className="h-3 w-3" />
                                    </Button>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}
                    
                    {query.length > 0 && (
                      <>
                        <CommandGroup heading="Products">
                            {products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5).map((product) => (
                                <CommandItem
                                    key={`product-${product.id}`}
                                    value={`Product: ${product.name}`}
                                    onSelect={() => runCommand(() => handleSelect(`/product/${slugify(product.name)}`))}
                                >
                                    <ShoppingBag className="mr-2 h-4 w-4" />
                                    <span>{product.name}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                        
                        <CommandSeparator />

                        <CommandGroup heading="Categories">
                            {categories.filter(c => c.name.toLowerCase().includes(query.toLowerCase())).slice(0, 3).map((category) => (
                                <CommandItem
                                    key={`category-${category.id}`}
                                    value={`Category: ${category.name}`}
                                    onSelect={() => runCommand(() => handleSelect(`/category/${category.slug}`))}
                                >
                                    <File className="mr-2 h-4 w-4" />
                                    <span>{category.name}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                        
                        <CommandSeparator />

                        <CommandGroup heading="Pages">
                            {staticPages.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 3).map((page) => (
                                <CommandItem
                                    key={`page-${page.path}`}
                                    value={`Page: ${page.name}`}
                                    onSelect={() => runCommand(() => handleSelect(page.path))}
                                >
                                    <File className="mr-2 h-4 w-4" />
                                    <span>{page.name}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                      </>
                    )}
                </CommandList>
            </CommandDialog>
        </>
    );
}
