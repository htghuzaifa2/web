import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from '@/context/cart-context';
import Link from 'next/link';
import { SVGProps } from 'react';

const siteConfig = {
  name: "huzi.pk",
  url: "https://huzi.pk", // Replace with your actual domain
  description: "huzi.pk is a premier e-commerce store in Pakistan, delivering physical products nationwide and digital products worldwide. Shop for modern clothing, accessories, and more.",
  ogImage: "/logo.webp", // Place your logo.webp in the public folder
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/logo.webp",
    shortcut: "/logo.webp",
    apple: "/logo.webp",
  },
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

function WhatsappIcon(props: SVGProps<SVGSVGElement>) {
  return (
      <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
      >
         <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.38 1.25 4.85L2 22l5.25-1.38c1.47.79 3.1 1.25 4.85 1.25 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m.01 1.67c4.56 0 8.25 3.69 8.25 8.25 0 4.56-3.69 8.25-8.25 8.25-1.53 0-2.98-.42-4.29-1.16l-.3-.18-3.18.83.85-3.1-.19-.32a8.19 8.19 0 0 1-1.2-4.38c0-4.56 3.69-8.25 8.25-8.25m4.52 10.29c-.28-.14-1.65-.81-1.9-.91s-.44-.14-.62.14-.72.91-.88 1.09-.32.21-.6.07a7.73 7.73 0 0 1-2.28-1.4c-.6-.66-1-1.48-.9-1.68s.14-.17.28-.28l.24-.28c.1-.11.02-.28-.05-.42a1.68 1.68 0 0 0-.62-1.5c-.17-.18-.34-.2-.52-.2h-.5c-.18 0-.46.07-.7.35-.24.28-.92.9-1.12 2.18s-.2 2.41.05 2.78c.25.37 1.13 1.8 2.73 2.58.38.18.69.29.92.37.5.18.96.16 1.32.1.4-.07 1.25-.51 1.42-1s.17-.92.12-1-.18-.28-.44-.42Z"></path>
      </svg>
  )
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&family=Belleza&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
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
            <Link
                href="https://wa.me/message/BY3URMYOW3OMH1"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 whatsapp-float"
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
