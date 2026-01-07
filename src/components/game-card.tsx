"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

interface Game {
    id: number;
    name: string;
    slug: string;
    description: string;
    embedUrl: string;
    thumbnail: string;
    category: string;
}

interface GameCardProps {
    game: Game;
}

export default function GameCard({ game }: GameCardProps) {
    const [isImageLoading, setIsImageLoading] = useState(true);

    return (
        <Card
            className="group/card relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-border/50 bg-card text-card-foreground shadow-md transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 hover:-translate-y-1"
            style={{ transform: "translateZ(0)" }}
        >
            <Link
                href={`/games/${game.slug}`}
                className="flex flex-col h-full"
                prefetch={true}
            >
                {/* Thumbnail */}
                <div className="relative w-full overflow-hidden bg-gradient-to-b from-background to-muted/30 aspect-video">
                    {isImageLoading && <Skeleton className="absolute inset-0" />}
                    <Image
                        src={game.thumbnail}
                        alt={game.name}
                        width={400}
                        height={300}
                        className={cn(
                            "object-cover transition-transform duration-500 ease-out group-hover/card:scale-110 w-full h-full",
                            isImageLoading ? "opacity-0" : "opacity-100"
                        )}
                        style={{ willChange: "transform" }}
                        onLoad={() => setIsImageLoading(false)}
                        loading="lazy"
                    />
                    {/* Play overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="h-16 w-16 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg transform scale-75 group-hover/card:scale-100 transition-transform duration-300">
                            <Play className="h-8 w-8 text-primary-foreground ml-1" fill="currentColor" />
                        </div>
                    </div>
                    {/* Category badge */}
                    <div className="absolute top-3 left-3 z-10">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-background/80 backdrop-blur-sm text-foreground capitalize">
                            {game.category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-4 bg-gradient-to-t from-card via-card to-transparent">
                    <h3 className="font-headline text-base sm:text-lg font-semibold leading-tight mb-2 group-hover/card:text-primary transition-colors duration-300 line-clamp-1">
                        {game.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {game.description}
                    </p>
                </div>
            </Link>
        </Card>
    );
}
