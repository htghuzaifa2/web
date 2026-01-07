
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from '@/context/cart-context';
import Link from 'next/link';
import { Belleza, Alegreya } from 'next/font/google';
import { ScrollToTop } from '@/components/scroll-to-top';
import { WhatsappIcon } from '@/components/whatsapp-icon';
import { SearchProvider } from '@/context/search-context';
import SearchBar from '@/components/search-bar';
import { LightboxProvider, Lightbox } from '@/context/lightbox-context';
import ExternalPrefetch from '@/components/ExternalPrefetch';
import Script from 'next/script';

const belleza = Belleza({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-headline',
  weight: ['400'],
});

const alegreya = Alegreya({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['400', '700'],
});

const siteConfig = {
  name: "HTG",
  url: "https://htg.com.pk",
  title: "HTG – Style Without Borders | Shop Premium Clothing",
  description: "Shop HTG for premium hoodies, jackets, tracksuits & gaming apparel for men, women & kids. Quality craftsmanship meets streetwear style. Shipped worldwide.",
  keywords: [
    "HTG brand",
    "premium clothing Pakistan",
    "shop hoodies Pakistan",
    "jackets Pakistan",
    "shirts Pakistan",
    "tracksuits Pakistan",
    "men's fashion",
    "women's fashion",
    "kids clothing",
    "fashion essentials",
    "streetwear Pakistan",
    "casual wear Pakistan",
    "worldwide shipping",
    "quality apparel"
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    // Template removed to disable dynamic suffix
    template: `%s`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: "HTG", url: siteConfig.url }],
  creator: "HTG",
  publisher: "HTG",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/favicon.ico`],
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/favicon.ico`],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a09" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${alegreya.variable} ${belleza.variable}`}>
      <head>
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SearchProvider>
            <CartProvider>
              <LightboxProvider>
                <div className="flex min-h-screen flex-col">
                  <Header />
                  <SearchBar />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
                <Toaster />
                <ScrollToTop />
                <Link
                  href="https://wa.me/message/BY3URMYOW3OMH1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 whatsapp-float"
                  aria-label="Chat on WhatsApp"
                >
                  <WhatsappIcon className="h-8 w-8" />
                </Link>
                <Lightbox />
              </LightboxProvider>
            </CartProvider>
          </SearchProvider>
        </ThemeProvider>

        {/* This script is a placeholder that will be populated by the page component */}
        <script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: '' }}
        />
        {/* Next.js <Link> handles internal routes. This handles external. */}
        <ExternalPrefetch />
      </body>
    </html>
  );
}
