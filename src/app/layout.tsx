
import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from '@/context/cart-context';
import Link from 'next/link';
import { SVGProps } from 'react';
import { Alegreya, Belleza } from 'next/font/google';
import { ScrollToTop } from '@/components/scroll-to-top';

const belleza = Belleza({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-headline',
  weight: "400",
});

const alegreya = Alegreya({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

const siteConfig = {
  name: "huzi.pk",
  url: "https://huzi.pk",
  title: "huzi.pk | Premium Lawn Suits & Modern Fashion in Pakistan",
  description: "Discover the latest trends at huzi.pk. Shop our curated collection of high-quality lawn suits, women's fashion, and digital goods with fast, reliable delivery across Pakistan.",
  keywords: [
    "huzi.pk online shopping",
    "trusted online store in Pakistan",
    "online shopping in Pakistan",
    "buy electronics online Pakistan",
    "fashion & clothing online Pakistan",
    "lawn suits online shopping Pakistan",
    "home & kitchen appliances Pakistan",
    "mobile & computer accessories Pakistan",
    "cheap online store Pakistan",
    "digital goods online store",
    "worldwide digital downloads",
    "premium software Pakistan",
    "affordable online marketplace Pakistan",
    "Pakistan eCommerce platform",
    "best online store in Pakistan"
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
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/logo.webp`],
  },
};

export function WhatsappIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24"
    >
      <path 
        d="M16.6,14.2l-1.5-0.7c-0.3-0.1-0.5-0.1-0.7,0.1l-0.6,0.8c-1.4-0.8-2.6-2-3.4-3.4l0.8-0.6c0.2-0.2,0.3-0.5,0.1-0.7l-0.7-1.5 c-0.2-0.3-0.5-0.5-0.8-0.5h-1C7.6,7.5,7.3,7.7,7.2,8C7,8.8,7.3,9.8,8,11.1c1.1,2.1,2.9,3.9,5,5c1.3,0.7,2.2,1,3.1,0.8 c0.3-0.1,0.5-0.4,0.5-0.7v-1C17.1,14.7,16.9,14.3,16.6,14.2z M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10c5.5,0,10-4.5,10-10S17.5,2,12,2 M12,20.5c-4.7,0-8.5-3.8-8.5-8.5S7.3,3.5,12,3.5s8.5,3.8,8.5,8.5S16.7,20.5,12,20.5"
        fill="currentColor"
      />
    </svg>
  );
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${alegreya.variable} ${belleza.variable}`}>
      <head />
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
            <ScrollToTop />
            <Link
                href="https://wa.me/message/BY3URMYOW3OMH1"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:bg-[#128C7E] whatsapp-float"
                aria-label="Chat on WhatsApp"
            >
                <WhatsappIcon className="h-8 w-8" />
            </Link>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
