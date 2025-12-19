"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Share2, Copy } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import useEmblaCarousel from "embla-carousel-react";
import { useToast } from '@/hooks/use-toast';

interface LightboxContextType {
  openLightbox: (images: string[], index: number, productName: string) => void;
  closeLightbox: () => void;
}

const LightboxContext = createContext<LightboxContextType | undefined>(undefined);

export const useLightbox = () => {
  const context = useContext(LightboxContext);
  if (!context) {
    throw new Error('useLightbox must be used within a LightboxProvider');
  }
  return context;
};

interface LightboxState {
  images: string[];
  index: number;
  productName: string;
}

export const LightboxProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<LightboxState>({ images: [], index: 0, productName: '' });

  const openLightbox = (images: string[], index: number, productName: string) => {
    setData({ images, index, productName });
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  return (
    <LightboxContext.Provider value={{ openLightbox, closeLightbox }}>
      {children}
      {isOpen && <LightboxContent {...data} closeLightbox={closeLightbox} />}
    </LightboxContext.Provider>
  );
};


const ImageSlot = ({ src, alt, priority = false, fill = false, sizes = "" }: { src: string, alt: string, priority?: boolean, fill?: boolean, sizes?: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      {isLoading && <Skeleton className="absolute inset-0" />}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes}
        priority={priority}
        className={cn(
          "object-contain transition-opacity duration-500 ease-in-out",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setIsLoading(false)}
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  );
};


const LightboxContent = ({ images, index, productName, closeLightbox }: LightboxState & { closeLightbox: () => void }) => {
  const [lightboxApi, setLightboxApi] = useState<ReturnType<typeof useEmblaCarousel>[1]>();
  const [lightboxRef, emblaLightboxApi] = useEmblaCarousel({ loop: images.length > 1, startIndex: index });
  const { toast } = useToast();

  useEffect(() => {
    setLightboxApi(emblaLightboxApi);
  }, [emblaLightboxApi]);

  const lightboxScrollPrev = useCallback(() => lightboxApi?.scrollPrev(), [lightboxApi]);
  const lightboxScrollNext = useCallback(() => lightboxApi?.scrollNext(), [lightboxApi]);

  const selectedIndex = lightboxApi?.selectedScrollSnap() ?? index;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") lightboxScrollNext();
      if (e.key === "ArrowLeft") lightboxScrollPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeLightbox, lightboxScrollNext, lightboxScrollPrev]);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const urlToShare = window.location.href;
    const shareData = {
      title: productName,
      text: `Check out this product: ${productName}`,
      url: urlToShare,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(urlToShare);
        toast({
          title: "Link Copied!",
          description: "The product link has been copied to your clipboard.",
        });
      }
    } catch (err) {
      console.error("Share failed:", err);
      // Fallback for when clipboard also fails (e.g. in sandboxed environments)
      window.prompt("Copy this link:", urlToShare);
    }
  };

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const urlToShare = window.location.href;
    try {
      await navigator.clipboard.writeText(urlToShare);
      toast({
        title: "Link Copied!",
        description: "The product link has been copied to your clipboard.",
      });
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm lightbox-zoom-in"
      onClick={closeLightbox}
      style={{ touchAction: 'none' }}
    >
      <div
        className="relative w-full h-full p-4 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden h-full w-full" ref={lightboxRef}>
          <div className="flex h-full">
            {images.map((imgSrc, i) => (
              <div className="relative w-full h-full flex-shrink-0 flex-grow-0 basis-full flex items-center justify-center" key={`lightbox-main-${i}`}>
                <ImageSlot
                  src={imgSrc}
                  alt={productName}
                  fill
                  priority={i === selectedIndex}
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute top-4 right-4 flex gap-2">
        <Button size="icon" variant="ghost" className="text-white bg-black/50 hover:bg-black/80 h-10 w-10" onClick={handleShare}>
          <Share2 className="h-5 w-5" />
        </Button>
        <Button size="icon" variant="ghost" className="text-white bg-black/50 hover:bg-black/80 h-10 w-10" onClick={handleCopyLink}>
          <Copy className="h-5 w-5" />
        </Button>
        <Button size="icon" variant="ghost" className="text-white bg-black/50 hover:bg-black/80 h-10 w-10" onClick={(e) => { e.stopPropagation(); closeLightbox(); }}><X className="h-5 w-5" /></Button>
      </div>
      {images.length > 1 && (
        <>
          <Button size="icon" variant="ghost" className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/80 md:left-4 h-11 w-11" onClick={(e) => { e.stopPropagation(); lightboxScrollPrev(); }}><ChevronLeft size={32} /></Button>
          <Button size="icon" variant="ghost" className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/80 md:right-4 h-11 w-11" onClick={(e) => { e.stopPropagation(); lightboxScrollNext(); }}><ChevronRight size={32} /></Button>
        </>
      )}
    </div>
  );
};

export const Lightbox = () => null; // This component is just a placeholder
