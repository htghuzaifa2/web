import type { Metadata } from "next";
import GameEmbedClient from "./game-embed-client";
import gamesData from "@/data/games.json";
import Script from "next/script";
import { notFound } from "next/navigation";

type PageProps = {
    params: { slug: string };
};

export function generateStaticParams() {
    return gamesData.games.map((game) => ({
        slug: game.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const game = gamesData.games.find((g) => g.slug === params.slug);

    if (!game) {
        return {
            title: "Game Not Found",
            description: "The game you are looking for does not exist.",
        };
    }

    // SEO-optimized title - keep it concise but descriptive
    const seoTitle = game.slug === "type-master"
        ? "Type Master - Free Online Typing Speed Test | Improve WPM"
        : `${game.name} - Play Free on HTG Games`;

    const seoDescription = game.slug === "type-master"
        ? "Free online typing speed test. Improve your typing speed and accuracy, track your WPM, and master touch typing skills. Practice typing for free - perfect for students and professionals."
        : game.description;

    return {
        title: seoTitle,
        description: seoDescription,
        keywords: game.slug === "type-master"
            ? ["typing speed test", "typing test", "wpm test", "typing practice", "improve typing speed", "touch typing", "keyboard practice", "free typing test"]
            : undefined,
        openGraph: {
            title: seoTitle,
            description: seoDescription,
            url: `/games/${game.slug}`,
            images: [
                {
                    url: game.thumbnail,
                    width: 400,
                    height: 300,
                    alt: game.name,
                },
            ],
        },
    };
}

const siteConfig = {
    name: "HTG",
    url: "https://htg.com.pk",
};

export default function GamePage({ params }: PageProps) {
    const game = gamesData.games.find((g) => g.slug === params.slug);

    if (!game) {
        notFound();
    }

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "VideoGame",
        name: game.name,
        description: game.description,
        image: game.thumbnail,
        genre: game.category,
        url: `${siteConfig.url}/games/${game.slug}`,
        gamePlatform: "Web Browser",
        applicationCategory: "Game",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
        },
    };

    return (
        <>
            <Script
                id="game-structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <GameEmbedClient game={game} />
        </>
    );
}
