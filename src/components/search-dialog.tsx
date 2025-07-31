
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Search, File, History, X, Command as CommandIcon } from "lucide-react";
import { 
    CommandDialog, 
    CommandEmpty, 
    CommandGroup, 
    CommandInput, 
    CommandItem, 
    CommandList, 
    CommandSeparator
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import type { Product, Category } from "@/lib/types";
import { slugify } from "@/lib/utils";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";

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
    const [selectedValue, setSelectedValue] = React.useState<string | null>(null);
    const router = useRouter();
    const isMobile = useIsMobile();
    const inputRef = React.useRef<HTMLInputElement>(null);

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

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false);
        command();
    }, []);

    const updateSearchHistory = (newQuery: string) => {
        const trimmedQuery = newQuery.trim();
        if (!trimmedQuery) return;
        
        const newHistory = [trimmedQuery, ...searchHistory.filter(h => h.toLowerCase() !== trimmedQuery.toLowerCase())].slice(0, 5);
        setSearchHistory(newHistory);
        localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    };
    
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
    };

    const handleSearchSubmit = (searchQuery: string) => {
        const trimmedQuery = searchQuery.trim();
        if (trimmedQuery) {
            updateSearchHistory(trimmedQuery);
            runCommand(() => router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`));
        }
    };
    
    const handleSelect = (path: string) => {
        if(query) {
            updateSearchHistory(query);
        }
        runCommand(() => router.push(path));
    };
    
    const onOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            setQuery("");
            setSelectedValue(null);
        }
        setOpen(isOpen);
    };

    return (
        <>
            <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
            </Button>
            <CommandDialog open={open} onOpenChange={onOpenChange} shouldFilter={false} value={selectedValue ?? ""}>
                 <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <CommandInput
                        ref={inputRef}
                        value={query}
                        onValueChange={setQuery}
                        onKeyDown={(e: React.KeyboardEvent) => {
                             if (e.key === 'Enter' && !selectedValue) {
                                e.preventDefault();
                                handleSearchSubmit((e.target as HTMLInputElement).value);
                            }
                        }}
                        placeholder="Search products, categories, or pages..."
                        className="flex-1"
                    />
                     <Button variant="secondary" size="sm" onClick={() => handleSearchSubmit(query)} className="h-8 ml-2">
                        Search
                    </Button>
                </div>
                <CommandList onValueChange={setSelectedValue}>
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
                                    onSelect={() => handleSearchSubmit(historyItem)}
                                    value={`History: ${historyItem}`}
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
                        <CommandGroup heading="Products">
                            {products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5).map((product) => (
                                <CommandItem
                                    key={`product-${product.id}`}
                                    value={`Product: ${product.name}`}
                                    onSelect={() => handleSelect(`/product/${slugify(product.name)}`)}
                                    className="!py-2"
                                >
                                    <div className="flex items-center gap-4 w-full">
                                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-sm">{product.name}</p>
                                            <p className="text-sm text-price">{`PKR ${Math.round(product.price)}`}</p>
                                        </div>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                        
                        <CommandSeparator />

                        <CommandGroup heading="Categories">
                            {categories.filter(c => c.name.toLowerCase().includes(query.toLowerCase())).slice(0, 3).map((category) => (
                                <CommandItem
                                    key={`category-${category.id}`}
                                    value={`Category: ${category.name}`}
                                    onSelect={() => handleSelect(`/category/${category.slug}`)}
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
                                    onSelect={() => handleSelect(page.path)}
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
