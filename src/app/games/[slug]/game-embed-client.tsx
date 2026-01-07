"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Maximize2, Loader2, ShoppingCart, X, Globe, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Server {
    name: string;
    url: string;
}

interface Game {
    id: number;
    name: string;
    slug: string;
    description: string;
    embedUrl: string;
    thumbnail: string;
    category: string;
    servers?: Server[];
}

interface GameEmbedClientProps {
    game: Game;
}

export default function GameEmbedClient({ game }: GameEmbedClientProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [currentServer, setCurrentServer] = useState<Server | null>(null);

    // Initialize current server
    useEffect(() => {
        if (game.servers && game.servers.length > 0) {
            // Try to recover saved server from localStorage
            const savedServerName = typeof window !== 'undefined' ? localStorage.getItem(`game-server-${game.slug}`) : null;
            const savedServer = game.servers.find(s => s.name === savedServerName);

            if (savedServer) {
                setCurrentServer(savedServer);
            } else {
                setCurrentServer(game.servers[0]);
            }
        } else {
            setCurrentServer(null);
        }
    }, [game]);

    const handleServerChange = (server: Server) => {
        setIsLoading(true);
        setCurrentServer(server);
        if (typeof window !== 'undefined') {
            localStorage.setItem(`game-server-${game.slug}`, server.name);
        }
    };

    const enterFullscreen = () => {
        const container = document.getElementById("game-container");
        if (!container) return;

        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if ((container as any).webkitRequestFullscreen) {
            (container as any).webkitRequestFullscreen();
        } else if ((container as any).msRequestFullscreen) {
            (container as any).msRequestFullscreen();
        }
    };

    const exitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
            (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
            (document as any).msExitFullscreen();
        }
    };

    // Listen for fullscreen changes
    useEffect(() => {
        const handleFullscreenChange = () => {
            const isFs = !!(
                document.fullscreenElement ||
                (document as any).webkitFullscreenElement ||
                (document as any).msFullscreenElement
            );
            setIsFullscreen(isFs);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
        document.addEventListener("msfullscreenchange", handleFullscreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
            document.removeEventListener("msfullscreenchange", handleFullscreenChange);
        };
    }, []);

    const hasEmbed = (game.embedUrl && game.embedUrl.trim() !== "") || (game.servers && game.servers.length > 0);
    const isTypeMaster = game.slug === "type-master";

    // Determine the active embed URL
    const activeEmbedUrl = currentServer ? currentServer.url : game.embedUrl;

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 content-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                <Link href="/games">
                    <Button variant="ghost" className="gap-2 -ml-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Games
                    </Button>
                </Link>

                {/* Server Selector */}
                {game.servers && game.servers.length > 0 && currentServer && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full md:w-auto gap-2 justify-between">
                                <div className="flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-primary" />
                                    <span className="text-muted-foreground mr-1">Server:</span>
                                    <span className="font-medium">{currentServer.name}</span>
                                </div>
                                <ChevronDown className="h-4 w-4 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[240px] max-h-[300px] overflow-y-auto">
                            {game.servers.map((server) => (
                                <DropdownMenuItem
                                    key={server.name}
                                    onClick={() => handleServerChange(server)}
                                    className={`gap-2 cursor-pointer ${currentServer.name === server.name ? "bg-accent" : ""}`}
                                >
                                    <div className={`h-2 w-2 rounded-full ${currentServer.name === server.name ? "bg-green-500" : "bg-muted"}`} />
                                    {server.name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>

            {/* Game Title */}
            <div className="text-center mb-6">
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary capitalize mb-2 inline-block">
                    {game.category}
                </span>
                <h1 className="font-headline text-3xl md:text-4xl font-bold text-foreground mt-2">
                    {game.name}
                </h1>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                    {game.description}
                </p>
            </div>

            {/* Game Container */}
            <div
                id="game-container"
                className="relative w-full max-w-5xl mx-auto aspect-video bg-muted rounded-xl overflow-hidden shadow-xl border border-border"
            >
                {hasEmbed ? (
                    <>
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-background via-background to-muted z-10">
                                <div className="flex flex-col items-center gap-6">
                                    <div className="relative">
                                        <div className="h-20 w-20 rounded-full bg-primary/20 animate-ping absolute inset-0" />
                                        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center relative">
                                            <span className="text-4xl animate-pulse">🎮</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <p className="text-foreground font-medium">
                                            {game.servers && currentServer ? `Connecting to ${currentServer.name}...` : "Loading game..."}
                                        </p>
                                        <div className="flex gap-1">
                                            <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <iframe
                            key={activeEmbedUrl} // Force re-render when URL changes
                            src={activeEmbedUrl}
                            className="w-full h-full"
                            allowFullScreen
                            onLoad={() => setIsLoading(false)}
                            title={game.name}
                            loading="eager"
                        />
                        {/* Exit Fullscreen Button - Shows only in fullscreen mode */}
                        {isFullscreen && (
                            <button
                                onClick={exitFullscreen}
                                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 bg-black/80 hover:bg-black text-white rounded-full shadow-lg backdrop-blur-sm transition-all text-xs sm:text-sm font-medium"
                                aria-label="Exit Fullscreen"
                            >
                                <X className="h-4 w-4 sm:h-5 sm:w-5" />
                                <span className="sm:inline hidden">Exit</span>
                            </button>
                        )}
                    </>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                        <div className="text-center p-8">
                            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                <span className="text-4xl">🎮</span>
                            </div>
                            <h2 className="text-xl font-semibold text-foreground mb-2">
                                Coming Soon!
                            </h2>
                            <p className="text-muted-foreground max-w-md">
                                This game is currently being prepared. Check back soon to play {game.name}!
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Fullscreen Button - Below Game Container */}
            {hasEmbed && !isFullscreen && (
                <div className="flex justify-center mt-4">
                    <Button onClick={enterFullscreen} variant="outline" size="lg" className="gap-2">
                        <Maximize2 className="h-5 w-5" />
                        Fullscreen
                    </Button>
                </div>
            )}

            {/* Instructions */}
            <div className="mt-8 max-w-2xl mx-auto text-center">
                <h3 className="font-semibold text-lg mb-2">How to Play</h3>
                <p className="text-muted-foreground text-sm">
                    Use your keyboard arrow keys or touch controls on mobile to play.
                    Click the fullscreen button for the best gaming experience!
                </p>
            </div>

            {/* Keyboard Promotion - Only show for Type Master */}
            {isTypeMaster && (
                <div className="mt-16 max-w-4xl mx-auto">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border border-primary/20 p-8 md:p-12">
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                        <div className="relative flex flex-col md:flex-row items-center gap-8">
                            {/* Image */}
                            <div className="flex-shrink-0 w-full md:w-1/2">
                                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-background/50 backdrop-blur-sm shadow-lg border border-border">
                                    <Image
                                        src="https://i.postimg.cc/yxqsFqnD/Wireless-keyboard-KB036-for-laptop-and-mobile-smooth-silent-keys-available-in-Pakistan.png"
                                        alt="OMOTON KB036 Wireless Bluetooth Keyboard"
                                        fill
                                        className="object-contain p-4"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 text-center md:text-left">
                                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground mb-4">
                                    🔥 Recommended Gear
                                </span>
                                <h2 className="font-headline text-2xl md:text-3xl font-bold text-foreground mb-3">
                                    Level Up Your Typing Game!
                                </h2>
                                <p className="text-muted-foreground mb-6">
                                    Get the <strong>OMOTON KB036 Wireless Bluetooth Keyboard</strong> — perfect for gaming, work, and mastering your typing skills. Smooth silent keys, wireless connectivity, and compatible with PC, laptops & mobiles!
                                </p>
                                <Link
                                    href="https://kimi.pk/products/omoton-kb036-wireless-bluetooth-keyboard"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-shadow">
                                        <ShoppingCart className="h-5 w-5" />
                                        Buy Now
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
