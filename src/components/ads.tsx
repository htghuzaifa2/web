
"use client";

import Script from 'next/script';

export function AdsTxt() {
    return (
        <Script id="ads-txt" strategy="beforeInteractive">
            {`google.com, pub-3951816267285710, DIRECT, f08c47fec0942fa0`}
        </Script>
    );
}
