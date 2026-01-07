import type { Metadata } from "next";
import GamesClient from "./games-client";
import Script from "next/script";

export const metadata: Metadata = {
    title: "HTG Games Arcade - Play Free Online Games",
    description:
        "Play free online games at HTG Arcade. Enjoy action, puzzle, racing, strategy, and casual games right in your browser! No downloads required.",
    openGraph: {
        title: "HTG Games Arcade - Play Free Online Games",
        description:
            "Play free online games at HTG Arcade. Enjoy action, puzzle, racing, strategy, and casual games right in your browser! No downloads required.",
        url: "/games",
    },
};

const siteConfig = {
    name: "HTG",
    url: "https://htg.com.pk",
};

export default function GamesPage() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Games",
        description:
            "Play free online games at HTG. Enjoy action, puzzle, racing, strategy, and casual games right in your browser!",
        url: `${siteConfig.url}/games`,
        isPartOf: {
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteConfig.url,
        },
    };

    return (
        <>
            <Script
                id="games-structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <GamesClient />
        </>
    );
}
