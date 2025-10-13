
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
import '@/lib/prefetch.js';
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
  name: "huzi.pk",
  url: "https://huzi.pk",
  title: "huzi.pk | Your Destination for Quality & Variety in Pakistan",
  description: "huzi.pk brings together quality, style, and innovation in one platform. From electronics and fashion to home essentials and digital goods, discover products that fit your lifestyle.",
  keywords: [
    "online shopping in Pakistan",
    "huzi.pk online store",
    "buy electronics online Pakistan",
    "fashion & clothing Pakistan",
    "lawn suits online shopping",
    "home & kitchen appliances",
    "mobile accessories Pakistan",
    "digital products worldwide",
    "e-commerce Pakistan",
    "best online store Pakistan"
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s - huzi.pk`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: "huzi.pk", url: siteConfig.url }],
  creator: "huzi.pk",
  publisher: "huzi.pk",
  icons: {
    icon: '/logo.webp',
    shortcut: '/logo.webp',
    apple: '/logo.webp',
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/logo.webp`],
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/logo.webp`],
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
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-WHDRXHH8');
        `}
      </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WHDRXHH8"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
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
        
        {/* External Libraries */}
        <script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
        <script defer src="https://js.stripe.com/v3/"></script>
        <script defer src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js"></script>
      </body>
    </html>
  );
}
