
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Share2, ExternalLink, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  const [visibleThumbnailsStart, setVisibleThumbnailsStart] = useState(0);

  const fallbackImage = images[0] || "https://placehold.co/600x600?text=Image+Not+Found";
  const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmM2YzIi8+PC9zdmc+";

  const MAX_VISIBLE_THUMBNAILS = 5;
  const showScrollButtons = images.length > MAX_VISIBLE_THUMBNAILS;

  const openLightbox = (index: number) => {
    setMainImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const showNextImage = useCallback(() => {
    setMainImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const showPrevImage = useCallback(() => {
    setMainImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);
  
  useEffect(() => {
    // Ensure the active thumbnail is always in view
    if (mainImageIndex < visibleThumbnailsStart) {
        setVisibleThumbnailsStart(mainImageIndex);
    } else if (mainImageIndex >= visibleThumbnailsStart + MAX_VISIBLE_THUMBNAILS) {
        setVisibleThumbnailsStart(mainImageIndex - MAX_VISIBLE_THUMBNAILS + 1);
    }
  }, [mainImageIndex, visibleThumbnailsStart]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") showNextImage();
        if (e.key === "ArrowLeft") showPrevImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, showNextImage, showPrevImage]);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: productName,
        text: `Check out this product: ${productName}`,
        url: window.location.href,
      });
    } catch (err) {
      console.error("Share failed:", err);
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };
  
  const scrollUp = () => {
    setVisibleThumbnailsStart(prev => Math.max(0, prev - 1));
  };

  const scrollDown = () => {
    setVisibleThumbnailsStart(prev => Math.min(images.length - MAX_VISIBLE_THUMBNAILS, prev + 1));
  };
  
  const canScrollUp = visibleThumbnailsStart > 0;
  const canScrollDown = visibleThumbnailsStart < images.length - MAX_VISIBLE_THUMBNAILS;


  return (
    <div className="flex flex-row-reverse md:flex-row gap-4">
      <div className="relative flex-1 w-full overflow-hidden rounded-lg group">
        <div
          className="relative aspect-square w-full cursor-pointer"
          onClick={() => openLightbox(mainImageIndex)}
        >
          <ImageWithFallback
            key={images[mainImageIndex]}
            src={images[mainImageIndex]}
            alt={`${productName} image ${mainImageIndex + 1}`}
            fill
            className="object-cover transition-all duration-300"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL={placeholderImage}
            fallbackSrc={fallbackImage}
          />
        </div>
      </div>
      
      {images.length > 1 && (
        <div className="flex flex-col gap-2 w-20 flex-shrink-0 relative">
            {showScrollButtons && (
                <Button 
                    size="icon" 
                    variant="ghost" 
                    className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 h-8 w-8 rounded-full bg-background/50 hover:bg-background/80"
                    onClick={scrollUp}
                    disabled={!canScrollUp}
                >
                    <ChevronUp className="h-5 w-5" />
                </Button>
            )}
             <div className="h-full overflow-hidden">
                <div 
                    className="flex flex-col gap-2 transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateY(-${visibleThumbnailsStart * (80 + 8)}px)` }} // 80px thumbnail height + 8px gap
                >
                    {images.map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setMainImageIndex(index)}
                          className={cn(
                            "relative aspect-square w-20 h-20 flex-shrink-0 overflow-hidden rounded-md transition-opacity duration-200",
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
                    onClick={scrollDown}
                    disabled={!canScrollDown}
                >
                    <ChevronDown className="h-5 w-5" />
                </Button>
            )}
        </div>
      )}


      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm lightbox-zoom-in">
          <div className="relative w-full h-full max-w-5xl max-h-5xl p-4">
            <ImageWithFallback
              src={images[mainImageIndex]}
              alt={productName}
              fill
              className="object-contain"
              sizes="100vw"
              placeholder="blur"
              blurDataURL={placeholderImage}
              fallbackSrc={fallbackImage}
            />
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={handleShare}><Share2 /></Button>
            <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" asChild><a href={images[mainImageIndex]} target="_blank" rel="noopener noreferrer"><ExternalLink /></a></Button>
            <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={closeLightbox}><X /></Button>
          </div>
          <Button size="icon" variant="ghost" className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20" onClick={showPrevImage}><ChevronLeft size={32} /></Button>
          <Button size="icon" variant="ghost" className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20" onClick={showNextImage}><ChevronRight size={32} /></Button>
        </div>
      )}
    </div>
  );
}
