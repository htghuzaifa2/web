
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Command as CommandPrimitive } from "cmdk"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchDialog() {
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const router = useRouter();
    const inputRef = React.useRef<HTMLInputElement>(null);

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

    const handleSearchSubmit = () => {
        const trimmedQuery = query.trim();
        if (trimmedQuery) {
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
            handleSearchSubmit();
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                 <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
                        <Search className="h-5 w-5" />
                        <span className="sr-only">Search</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md p-0">
                    <DialogHeader className="p-4 pb-0">
                        <DialogTitle>Search Products</DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center space-x-2 p-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                ref={inputRef}
                                value={query}
                                onValueChange={setQuery}
                                onKeyDown={handleKeyDown}
                                placeholder="Search products..."
                                className="pl-10"
                            />
                        </div>
                        <Button type="submit" onClick={handleSearchSubmit}>
                            Search
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
