
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, History, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MAX_RECENT_SEARCHES = 5;

export function SearchDialog() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Load recent searches from localStorage on client-side mount
        const storedSearches = localStorage.getItem("recentSearches");
        if (storedSearches) {
            setRecentSearches(JSON.parse(storedSearches));
        }
    }, []);

    const updateRecentSearches = (searchTerm: string) => {
        const updatedSearches = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, MAX_RECENT_SEARCHES);
        setRecentSearches(updatedSearches);
        localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    };

    const handleSearchSubmit = (searchTerm: string) => {
        const trimmedQuery = searchTerm.trim();
        if (trimmedQuery) {
            updateRecentSearches(trimmedQuery);
            setOpen(false);
            router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
        }
    };
    
    const onOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            setQuery("");
        }
        setOpen(isOpen);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearchSubmit(query);
        }
    };
    
    const removeRecentSearch = (e: React.MouseEvent, searchTerm: string) => {
        e.stopPropagation();
        const updatedSearches = recentSearches.filter(s => s !== searchTerm);
        setRecentSearches(updatedSearches);
        localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    };

    const clearAllRecentSearches = () => {
        setRecentSearches([]);
        localStorage.removeItem("recentSearches");
    };

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);


    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                 <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Search className="h-5 w-5" />
                        <span className="sr-only">Search</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="top-0 sm:top-[10%] translate-y-0 sm:max-w-xl rounded-t-none sm:rounded-lg border-t-0 p-0 data-[state=closed]:slide-out-to-top-[5%] data-[state=open]:slide-in-from-top-[5%]">
                    <DialogHeader className="p-4 pb-0 sr-only">
                        <DialogTitle>Search Products</DialogTitle>
                    </DialogHeader>
                    <div className="p-4">
                        <div className="flex items-center space-x-2">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    ref={inputRef}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Search products..."
                                    className="pl-10 h-11"
                                />
                            </div>
                            <Button type="submit" onClick={() => handleSearchSubmit(query)} size="lg">
                                Search
                            </Button>
                        </div>

                        {recentSearches.length > 0 && (
                            <div className="mt-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                        <History className="h-4 w-4" />
                                        Recent Searches
                                    </h3>
                                    <Button variant="link" size="sm" className="h-auto p-0 text-sm" onClick={clearAllRecentSearches}>
                                        Clear all
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {recentSearches.map((searchTerm) => (
                                        <button
                                            key={searchTerm}
                                            onClick={() => handleSearchSubmit(searchTerm)}
                                            className="relative flex items-center gap-1.5 bg-muted hover:bg-muted/80 text-muted-foreground text-sm rounded-full py-1 pr-7 pl-3"
                                        >
                                            {searchTerm}
                                            <div
                                                onClick={(e) => removeRecentSearch(e, searchTerm)}
                                                className="absolute top-1/2 right-1 -translate-y-1/2 h-4 w-4 flex items-center justify-center rounded-full hover:bg-background"
                                                aria-label="Remove search term"
                                            >
                                                <X className="h-3 w-3" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
