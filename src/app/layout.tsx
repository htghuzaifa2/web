import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from '@/context/cart-context';
import Link from 'next/link';
import { WhatsappIcon } from '@/components/whatsapp-icon';

export const metadata: Metadata = {
  title: 'huzi.pk - Modern Clothing & More',
  description: 'huzi.pk is a premier e-commerce store in Pakistan, delivering physical products nationwide and digital products worldwide. Shop for modern clothing, accessories, and more.',
};

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
