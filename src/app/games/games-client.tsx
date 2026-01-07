"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GameCard from "@/components/game-card";
import gamesData from "@/data/games.json";

interface Game {
    id: number;
    name: string;
    slug: string;
    description: string;
    embedUrl: string;
    thumbnail: string;
    category: string;
}

interface GameCategory {
    id: number;
    name: string;
    slug: string;
}

const ALL_GAMES: Game[] = gamesData.games;
const ALL_CATEGORIES: GameCategory[] = gamesData.categories;

export default function GamesClient() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const filteredGames = useMemo(() => {
        let games = [...ALL_GAMES];

        // Filter by category
        if (selectedCategory !== "all") {
            games = games.filter((game) => game.category === selectedCategory);
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            games = games.filter(
                (game) =>
                    game.name.toLowerCase().includes(query) ||
                    game.description.toLowerCase().includes(query) ||
                    game.category.toLowerCase().includes(query)
            );
        }

        return games;
    }, [searchQuery, selectedCategory]);

    const clearSearch = () => {
        setSearchQuery("");
    };

    return (
        <div className="container mx-auto px-4 py-12 md:py-16 content-fade-in">
            <h1 className="mb-2 text-center font-headline text-3xl font-bold text-foreground md:text-4xl">
                Games
            </h1>
            <p className="mb-8 text-center text-muted-foreground">
                Play our collection of fun and exciting games!
            </p>

            {/* Search Bar */}
            <div className="mb-8 max-w-xl mx-auto">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search games..."
                        className="pl-10 pr-10 h-11"
                    />
                    {searchQuery && (
                        <button
                            onClick={clearSearch}
                            className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                            aria-label="Clear search"
                        >
                            <X className="h-4 w-4 text-muted-foreground" />
                        </button>
                    )}
                </div>
            </div>

            {/* Category Filter */}
            <div className="mb-8">
                <h3 className="mb-4 text-center text-lg font-semibold">
                    Filter by Category
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                    {ALL_CATEGORIES.map((category) => (
                        <Button
                            key={category.id}
                            variant={selectedCategory === category.slug ? "default" : "outline"}
                            onClick={() => setSelectedCategory(category.slug)}
                        >
                            {category.name}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Games Grid */}
            {filteredGames.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredGames.map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted-foreground py-16">
                    No games found. Try a different search or category!
                </p>
            )}
        </div>
    );
}
