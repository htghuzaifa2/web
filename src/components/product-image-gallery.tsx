
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, Share2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

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
            />
        </div>
    );
};

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mainApi, setMainApi] = useState<ReturnType<typeof useEmblaCarousel>[1]>();
  const [thumbApi, setThumbApi] = useState<ReturnType<typeof useEmblaCarousel>[1]>();
  const [lightboxApi, setLightboxApi] = useState<ReturnType<typeof useEmblaCarousel>[1]>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [mainRef, emblaMainApi] = useEmblaCarousel({ loop: images.length > 1 });
  const [thumbRef, emblaThumbApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });
  const [lightboxRef, emblaLightboxApi] = useEmblaCarousel({ loop: images.length > 1 });

  useEffect(() => setMainApi(emblaMainApi), [emblaMainApi]);
  useEffect(() => setThumbApi(emblaThumbApi), [emblaThumbApi]);
  useEffect(() => setLightboxApi(emblaLightboxApi), [emblaLightboxApi]);

  const onThumbClick = useCallback((index: number) => {
    if (!mainApi) return;
    mainApi.scrollTo(index);
  }, [mainApi]);

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbApi) return;
    const newSelectedIndex = mainApi.selectedScrollSnap();
    setSelectedIndex(newSelectedIndex);
    thumbApi.scrollTo(newSelectedIndex);
    if (lightboxApi) lightboxApi.scrollTo(newSelectedIndex, true);
  }, [mainApi, thumbApi, lightboxApi]);

  useEffect(() => {
    if (!mainApi) return;
    onSelect();
    mainApi.on("select", onSelect);
    mainApi.on("reInit", onSelect);
    return () => { mainApi.off("select", onSelect) };
  }, [mainApi, onSelect]);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
    setTimeout(() => lightboxApi?.scrollTo(index, true), 0);
  };
  
  const closeLightbox = () => setLightboxOpen(false);

  const scrollPrev = useCallback(() => mainApi?.scrollPrev(), [mainApi]);
  const scrollNext = useCallback(() => mainApi?.scrollNext(), [mainApi]);
  
  const lightboxScrollPrev = useCallback(() => lightboxApi?.scrollPrev(), [lightboxApi]);
  const lightboxScrollNext = useCallback(() => lightboxApi?.scrollNext(), [lightboxApi]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") lightboxScrollNext();
        if (e.key === "ArrowLeft") lightboxScrollPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, lightboxScrollNext, lightboxScrollPrev]);

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
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main Image Carousel */}
      <div className="relative w-full overflow-hidden rounded-lg group aspect-square bg-muted/30">
        <div className="overflow-hidden h-full" ref={mainRef}>
          <div className="flex h-full">
            {images.map((imgSrc, index) => (
              <div
                className="relative w-full flex-shrink-0 flex-grow-0 basis-full cursor-pointer h-full"
                key={index}
                onClick={() => openLightbox(index)}
              >
                <ImageSlot
                  src={imgSrc}
                  alt={`${productName} image ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 767px) 90vw, 45vw"
                />
              </div>
            ))}
          </div>
        </div>
        {images.length > 1 && (
          <>
            <Button size="icon" variant="ghost" className="absolute left-2 top-1/2 -translate-y-1/2 text-foreground bg-background/50 hover:bg-background/80" onClick={scrollPrev}><ChevronLeft size={24} /></Button>
            <Button size="icon" variant="ghost" className="absolute right-2 top-1/2 -translate-y-1/2 text-foreground bg-background/50 hover:bg-background/80" onClick={scrollNext}><ChevronRight size={24} /></Button>
          </>
        )}
      </div>

      {/* Thumbnail Carousel */}
      {images.length > 1 && (
        <div className="relative w-full">
           <div className="overflow-hidden" ref={thumbRef}>
               <div className="flex gap-2">
                   {images.map((img, index) => (
                       <button
                           key={index}
                           onClick={() => onThumbClick(index)}
                           className={cn(
                               "relative aspect-square shrink-0 basis-1/3 sm:basis-1/4 md:basis-1/5 overflow-hidden rounded-md transition-opacity duration-200",
                               selectedIndex === index ? "opacity-100 ring-2 ring-primary" : "opacity-60 hover:opacity-100"
                           )}
                       >
                           <ImageSlot
                               src={img}
                               alt={`${productName} thumbnail ${index + 1}`}
                               fill
                               sizes="80px"
                           />
                       </button>
                   ))}
               </div>
           </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm lightbox-zoom-in" onClick={closeLightbox}>
          <div
            className="relative w-full h-full p-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-hidden h-full w-full" ref={lightboxRef}>
              <div className="flex h-full">
                {images.map((imgSrc, index) => (
                  <div className="relative w-full h-full flex-shrink-0 flex-grow-0 basis-full flex items-center justify-center" key={`lightbox-main-${index}`}>
                    <ImageSlot
                      src={imgSrc}
                      alt={productName}
                      fill
                      priority={index === selectedIndex}
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
            <Button size="icon" variant="ghost" className="text-white bg-black/50 hover:bg-black/80 h-10 w-10" asChild>
              <a href={images[selectedIndex]} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                <ExternalLink className="h-5 w-5" />
              </a>
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
      )}
    </div>
  );
}

