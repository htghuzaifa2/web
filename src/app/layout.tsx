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
      viewBox="0 0 48 48"
      width="48px" 
      height="48px"
      fill="currentColor"
    >
      <path fill="#fff" d="M4.868,43.313c-0.052,0-0.104-0.01-0.158-0.021C4.6,43.256,4.5,43.159,4.455,43.054 l-1.112-5.131c-0.542-2.495-0.45-5.23,0.27-7.82c1.428-5.143,4.425-9.625,8.889-12.953c4.455-3.32,9.835-5.07,15.341-5.07 c11.836,0,21.49,9.654,21.49,21.49c0,11.836-9.654,21.49-21.49,21.49c-3.414,0-6.75-0.814-9.71-2.368L4.98,43.313 C4.945,43.313,4.907,43.313,4.868,43.313z"></path><path fill="#fff" d="M28.108,31.328c-0.844-0.422-1.632-0.781-2.355-1.093c-0.643-0.276-1.24-0.41-1.766,0.51 s-1.063,1.688-1.3,1.969c-0.234,0.281-0.586,0.344-0.969,0.203c-2.734-0.992-5.125-2.617-7.148-4.828 c-1.57-1.742-2.734-3.828-3.031-4.484c-0.297-0.656-0.023-1.008,0.25-1.305c0.234-0.25,0.523-0.641,0.797-0.859 c0.273-0.219,0.547-0.438,0.734-0.766c0.188-0.328,0.094-0.656-0.102-1.078c-0.195-0.422-1.328-3.188-1.633-3.859 c-0.305-0.672-0.609-0.57-0.898-0.57c-0.258,0-0.563,0-0.859,0c-0.297,0-0.82,0.117-1.242,0.555 c-0.422,0.438-1.633,1.594-1.633,3.875c0,2.281,1.672,4.492,1.914,4.828c0.242,0.336,3.281,5.25,8.109,7.164 c3.93,1.539,5.25,1.211,6.016,1.133c1.242-0.125,2.781-1.133,3.172-2.203c0.391-1.07,0.391-1.984,0.273-2.203 C30.012,31.789,29.3,31.547,28.108,31.328z"></path><path fill="#40c351" d="M24.032,12.083c11.836,0,21.49,9.654,21.49,21.49c0,11.836-9.654,21.49-21.49,21.49 c-3.414,0-6.75-0.814-9.71-2.368L4.98,43.313c-0.035,0-0.073,0-0.112,0c-0.052,0-0.104-0.01-0.158-0.021 c-0.114-0.037-0.211-0.104-0.273-0.203s-0.078-0.219-0.047-0.336l1.112-5.131c0.542-2.495,0.45-5.23-0.27-7.82 c-1.428-5.143-4.425-9.625-8.889-12.953c-4.455-3.32-9.835-5.07-15.341-5.07h0.008c0.003-0.001,0.007-0.001,0.01-0.001 C12.232,12.083,24.032,12.083,24.032,12.083z"></path><path fill="#fff" d="M33.472,21.183c-1.398-2.375-3.344-4.344-5.727-5.766c-2.383-1.422-5.047-2.18-7.773-2.18 c-8.742,0-15.844,7.102-15.844,15.844c0,2.734,0.695,5.461,2.094,7.852l-1.3,6.016l6.164-1.617 c2.359,1.258,4.984,1.914,7.688,1.914h0.008c8.742,0,15.844-7.102,15.844-15.844C35.66,26.214,34.887,23.565,33.472,21.183z M28.108,31.328c-0.844-0.422-1.632-0.781-2.355-1.093c-0.643-0.276-1.24-0.41-1.766,0.51s-1.063,1.688-1.3,1.969 c-0.234,0.281-0.586,0.344-0.969,0.203c-2.734-0.992-5.125-2.617-7.148-4.828c-1.57-1.742-2.734-3.828-3.031-4.484 c-0.297-0.656-0.023-1.008,0.25-1.305c0.234-0.25,0.523-0.641,0.797-0.859c0.273-0.219,0.547-0.438,0.734-0.766 c0.188-0.328,0.094-0.656-0.102-1.078c-0.195-0.422-1.328-3.188-1.633-3.859c-0.305-0.672-0.609-0.57-0.898-0.57 c-0.258,0-0.563,0-0.859,0c-0.297,0-0.82,0.117-1.242,0.555c-0.422,0.438-1.633,1.594-1.633,3.875 c0,2.281,1.672,4.492,1.914,4.828c0.242,0.336,3.281,5.25,8.109,7.164c3.93,1.539,5.25,1.211,6.016,1.133 c1.242-0.125,2.781-1.133,3.172-2.203c0.391-1.07,0.391-1.984,0.273-2.203C30.012,31.789,29.3,31.547,28.108,31.328z"></path>
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
