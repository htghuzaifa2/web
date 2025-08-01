
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Share2, ExternalLink, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ImageWithFallback = ({ src, alt, fallbackSrc, ...props }: React.ComponentProps<typeof Image> & { fallbackSrc: string }) => {
    const [error, setError] = useState(false);
    const handleError = () => setError(true);
    return <Image src={error ? fallbackSrc : src} alt={alt} onError={handleError} {...props} />;
}


export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: images.length > 1, align: "start" });
  const [lightboxEmblaRef, lightboxEmblaApi] = useEmblaCarousel({ loop: images.length > 1, align: "start" });


  const fallbackImage = images[0] || "https://placehold.co/600x600.png";
  const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmM2YzIi8+PC9zdmc+";

  const MAX_VISIBLE_THUMBNAILS = 5;
  const showScrollButtons = images.length > MAX_VISIBLE_THUMBNAILS;

  const openLightbox = useCallback((index: number) => {
    setMainImageIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = () => setLightboxOpen(false);
  
  const handleThumbnailClick = useCallback((index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setMainImageIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setMainImageIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect) };
  }, [emblaApi, onSelect]);
  
  useEffect(() => {
      if (lightboxOpen && lightboxEmblaApi) {
          lightboxEmblaApi.on('select', () => {
              if (!lightboxEmblaApi) return;
              setMainImageIndex(lightboxEmblaApi.selectedScrollSnap());
          });
          lightboxEmblaApi.scrollTo(mainImageIndex, true); // Sync lightbox carousel
      }
  }, [lightboxOpen, lightboxEmblaApi, mainImageIndex]);

  const showNextImage = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const showPrevImage = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  
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
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: `Check out this product: ${productName}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy link:", err);
        alert("Could not copy link to clipboard.");
      }
    }
  };
  
  const scrollThumbnails = (direction: 'up' | 'down') => {
      if (thumbnailContainerRef.current) {
          const scrollAmount = thumbnailContainerRef.current.clientHeight;
          thumbnailContainerRef.current.scrollBy({
              top: direction === 'up' ? -scrollAmount : scrollAmount,
              behavior: 'smooth'
          });
      }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {images.length > 1 && (
        <div className="order-2 md:order-1 relative w-full md:w-20 flex-shrink-0">
           {/* Desktop vertical thumbnails */}
           <div className="hidden md:block">
            {showScrollButtons && (
              <Button
                size="icon"
                variant="ghost"
                className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 h-8 w-8 rounded-full bg-background/50 hover:bg-background/80"
                onClick={() => scrollThumbnails('up')}
              >
                <ChevronUp className="h-5 w-5" />
              </Button>
            )}

            <div 
              ref={thumbnailContainerRef} 
              className="h-[464px] overflow-y-auto scroll-smooth snap-y snap-mandatory no-scrollbar"
              style={{ maxHeight: `${5 * (80 + 8) - 8}px`}} // 5 thumbnails (80px height) + 4 gaps (8px)
            >
              <div className="flex flex-col gap-2 py-1">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={cn(
                      "relative aspect-square w-20 h-20 flex-shrink-0 overflow-hidden rounded-md transition-opacity duration-200 snap-start",
                      mainImageIndex === index ? "opacity-100 ring-2 ring-primary" : "opacity-60 hover:opacity-100"
                    )}
                  >
                    <ImageWithFallback
                      src={img}
                      alt={`${productName} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="20vw"
                      placeholder="blur"
                      blurDataURL={placeholderImage}
                      fallbackSrc={fallbackImage}
                    />
                  </button>
                ))}
              </div>
            </div>

            {showScrollButtons && (
              <Button
                size="icon"
                variant="ghost"
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-10 h-8 w-8 rounded-full bg-background/50 hover:bg-background/80"
                onClick={() => scrollThumbnails('down')}
              >
                <ChevronDown className="h-5 w-5" />
              </Button>
            )}
           </div>

           {/* Mobile horizontal thumbnails */}
            <div className="md:hidden">
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={cn(
                      "relative aspect-square w-16 h-16 flex-shrink-0 overflow-hidden rounded-md transition-opacity duration-200",
                      mainImageIndex === index ? "opacity-100 ring-2 ring-primary" : "opacity-60 hover:opacity-100"
                    )}
                  >
                     <ImageWithFallback
                      src={img}
                      alt={`${productName} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="25vw"
                      placeholder="blur"
                      blurDataURL={placeholderImage}
                      fallbackSrc={fallbackImage}
                    />
                  </button>
                ))}
              </div>
            </div>
        </div>
      )}

      <div className="relative flex-1 w-full overflow-hidden rounded-lg group order-1 md:order-2">
         <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
                {images.map((imgSrc, index) => (
                    <div className="relative aspect-square w-full flex-shrink-0 flex-grow-0 basis-full" key={index}>
                        <ImageWithFallback
                            src={imgSrc}
                            alt={`${productName} image ${index + 1}`}
                            fill
                            className="object-cover transition-all duration-300 cursor-pointer"
                            priority={index === 0}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            placeholder="blur"
                            blurDataURL={placeholderImage}
                            fallbackSrc={fallbackImage}
                            onClick={() => openLightbox(index)}
                        />
                    </div>
                ))}
            </div>
        </div>
        {images.length > 1 && (
            <>
                <Button size="icon" variant="ghost" className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50" onClick={showPrevImage}><ChevronLeft size={24} /></Button>
                <Button size="icon" variant="ghost" className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50" onClick={showNextImage}><ChevronRight size={24} /></Button>
            </>
        )}
      </div>

      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm lightbox-zoom-in overflow-hidden" onClick={closeLightbox}>
          <div 
            className="relative w-full h-full overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on image
          >
            <div className="overflow-hidden h-full" ref={lightboxEmblaRef}>
               <div className="flex h-full">
                  {images.map((imgSrc, index) => (
                    <div className="relative w-full h-full flex-shrink-0 flex-grow-0 basis-full flex items-center justify-center" key={index}>
                        <ImageWithFallback
                            src={imgSrc}
                            alt={productName}
                            fill
                            className="object-contain"
                            sizes="100vw"
                            placeholder="blur"
                            blurDataURL={placeholderImage}
                            fallbackSrc={fallbackImage}
                        />
                    </div>
                  ))}
                </div>
              </div>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
             <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={handleShare}>
              <Share2 />
            </Button>
            <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" asChild>
              <a href={images[mainImageIndex]} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                <ExternalLink />
              </a>
            </Button>
            <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={(e) => { e.stopPropagation(); closeLightbox(); }}><X /></Button>
          </div>
          {images.length > 1 && (
            <>
              <Button size="icon" variant="ghost" className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20" onClick={(e) => { e.stopPropagation(); showPrevLightboxImage(); }}><ChevronLeft size={32} /></Button>
              <Button size="icon" variant="ghost" className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20" onClick={(e) => { e.stopPropagation(); showNextLightboxImage(); }}><ChevronRight size={32} /></Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
