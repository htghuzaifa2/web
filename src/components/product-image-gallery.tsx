
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, Share2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import { ImageWithSkeleton } from "./image-with-skeleton";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const [mainCarouselRef, mainCarouselApi] = useEmblaCarousel({ loop: images.length > 1 });
  const [thumbCarouselRef, thumbCarouselApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const [lightboxEmblaRef, lightboxEmblaApi] = useEmblaCarousel({ loop: images.length > 1 });

  const openLightbox = useCallback((index: number) => {
    setMainImageIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = () => setLightboxOpen(false);

  const handleThumbnailClick = useCallback((index: number) => {
    mainCarouselApi?.scrollTo(index);
  }, [mainCarouselApi]);

  const onMainCarouselSelect = useCallback(() => {
    if (!mainCarouselApi || !thumbCarouselApi) return;
    const selectedIndex = mainCarouselApi.selectedScrollSnap();
    setMainImageIndex(selectedIndex);
    thumbCarouselApi.scrollTo(selectedIndex);
  }, [mainCarouselApi, thumbCarouselApi]);

  useEffect(() => {
    if (!mainCarouselApi) return;
    mainCarouselApi.on("select", onMainCarouselSelect);
    return () => { mainCarouselApi.off("select", onMainCarouselSelect); };
  }, [mainCarouselApi, onMainCarouselSelect]);
  
  const onLightboxSelect = useCallback(() => {
    if (!lightboxEmblaApi) return;
    const selectedIndex = lightboxEmblaApi.selectedScrollSnap();
    setMainImageIndex(selectedIndex);
  }, [lightboxEmblaApi]);

  useEffect(() => {
    if (lightboxOpen && lightboxEmblaApi) {
        onLightboxSelect(); // Initial sync
        lightboxEmblaApi.on('select', onLightboxSelect);
        lightboxEmblaApi.scrollTo(mainImageIndex, true); // Go to correct image on open
        return () => { lightboxEmblaApi.off('select', onLightboxSelect) };
    }
  }, [lightboxOpen, lightboxEmblaApi, mainImageIndex, onLightboxSelect]);

  const showNextLightboxImage = useCallback(() => lightboxEmblaApi?.scrollNext(), [lightboxEmblaApi]);
  const showPrevLightboxImage = useCallback(() => lightboxEmblaApi?.scrollPrev(), [lightboxEmblaApi]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") showNextLightboxImage();
        if (e.key === "ArrowLeft") showPrevLightboxImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, showNextLightboxImage, showPrevLightboxImage]);

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
        <div className="overflow-hidden h-full" ref={mainCarouselRef}>
          <div className="flex h-full">
            {images.map((imgSrc, index) => (
              <div
                className="relative w-full flex-shrink-0 flex-grow-0 basis-full cursor-pointer h-full"
                key={index}
                onClick={() => openLightbox(index)}
              >
                <ImageWithSkeleton
                  src={imgSrc}
                  alt={`${productName} image ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-2"
                />
              </div>
            ))}
          </div>
        </div>
        {images.length > 1 && (
          <>
            <Button size="icon" variant="ghost" className="absolute left-2 top-1/2 -translate-y-1/2 text-foreground bg-background/50 hover:bg-background/80" onClick={() => mainCarouselApi?.scrollPrev()}><ChevronLeft size={24} /></Button>
            <Button size="icon" variant="ghost" className="absolute right-2 top-1/2 -translate-y-1/2 text-foreground bg-background/50 hover:bg-background/80" onClick={() => mainCarouselApi?.scrollNext()}><ChevronRight size={24} /></Button>
          </>
        )}
      </div>

      {/* Thumbnail Carousel */}
      {images.length > 1 && (
        <div className="relative w-full">
           <div className="overflow-hidden" ref={thumbCarouselRef}>
               <div className="flex gap-2">
                   {images.map((img, index) => (
                       <button
                           key={index}
                           onClick={() => handleThumbnailClick(index)}
                           className={cn(
                               "relative aspect-square shrink-0 basis-1/3 sm:basis-1/4 md:basis-1/5 overflow-hidden rounded-md transition-opacity duration-200",
                               mainImageIndex === index ? "opacity-100 ring-2 ring-primary" : "opacity-60 hover:opacity-100"
                           )}
                       >
                           <ImageWithSkeleton
                               src={img}
                               alt={`${productName} thumbnail ${index + 1}`}
                               fill
                               sizes="80px"
                               className="object-contain bg-muted/30 p-1"
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
            <div className="overflow-hidden h-full w-full" ref={lightboxEmblaRef}>
              <div className="flex h-full">
                {images.map((imgSrc, index) => (
                  <div className="relative w-full h-full flex-shrink-0 flex-grow-0 basis-full flex items-center justify-center" key={`lightbox-main-${index}`}>
                    <ImageWithSkeleton
                      src={imgSrc}
                      alt={productName}
                      fill
                      priority={index === mainImageIndex}
                      sizes="100vw"
                      className="object-contain"
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
              <a href={images[mainImageIndex]} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                <ExternalLink className="h-5 w-5" />
              </a>
            </Button>
            <Button size="icon" variant="ghost" className="text-white bg-black/50 hover:bg-black/80 h-10 w-10" onClick={(e) => { e.stopPropagation(); closeLightbox(); }}><X className="h-5 w-5" /></Button>
          </div>
          {images.length > 1 && (
            <>
              <Button size="icon" variant="ghost" className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/80 md:left-4 h-11 w-11" onClick={(e) => { e.stopPropagation(); showPrevLightboxImage(); }}><ChevronLeft size={32} /></Button>
              <Button size="icon" variant="ghost" className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/80 md:right-4 h-11 w-11" onClick={(e) => { e.stopPropagation(); showNextLightboxImage(); }}><ChevronRight size={32} /></Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

    