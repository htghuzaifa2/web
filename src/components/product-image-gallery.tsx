
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Share2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";


interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }
 
    setCurrent(api.selectedScrollSnap() + 1)
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])


  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const showNextLightboxImage = useCallback(() => {
    setLightboxIndex((prevIndex) => (prevIndex + 1) % images.length);
  },[images.length]);

  const showPrevLightboxImage = useCallback(() => {
    setLightboxIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === "Escape") setLightboxOpen(false);
        if (e.key === "ArrowRight") showNextLightboxImage();
        if (e.key === "ArrowLeft") showPrevLightboxImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, showNextLightboxImage, showPrevLightboxImage]);

  const handleShare = async () => {
    const shareData = {
      title: productName,
      text: `Check out this product: ${productName}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Share failed:", err);
      // Fallback for browsers that don't support navigator.share
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleThumbnailClick = (index: number) => {
    api?.scrollTo(index);
  }

  return (
    <div className="flex flex-col gap-4">
       {/* Main Image Carousel */}
      <div className="relative w-full overflow-hidden rounded-lg group">
        <Carousel setApi={setApi} opts={{loop: true}}>
            <CarouselContent>
                {images.map((img, index) => (
                    <CarouselItem key={index}>
                        <div 
                          className="relative aspect-square w-full cursor-pointer" 
                          onClick={() => openLightbox(index)}
                        >
                            <Image
                                src={img}
                                alt={`${productName} image ${index + 1}`}
                                fill
                                className="object-cover transition-all duration-300"
                                priority={index === 0}
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            {images.length > 1 && (
              <>
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
              </>
            )}
        </Carousel>
      </div>
      
       {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={cn(
                "relative aspect-square w-full h-auto flex-shrink-0 overflow-hidden rounded-md transition-opacity duration-200",
                current === index + 1 ? "opacity-100 ring-2 ring-primary" : "opacity-60 hover:opacity-100"
              )}
            >
              <Image 
                src={img} 
                alt={`${productName} thumbnail ${index + 1}`} 
                fill 
                className="object-cover" 
                sizes="20vw"
              />
            </button>
          ))}
        </div>
      )}


      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm lightbox-zoom-in">
          <div className="relative w-full h-full max-w-5xl max-h-5xl">
            <Image src={images[lightboxIndex]} alt={productName} fill className="object-contain" />
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
             <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={handleShare}><Share2 /></Button>
             <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" asChild><a href={images[lightboxIndex]} target="_blank" rel="noopener noreferrer"><ExternalLink /></a></Button>
             <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={() => setLightboxOpen(false)}><X /></Button>
          </div>
          <Button size="icon" variant="ghost" className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20" onClick={showPrevLightboxImage}><ChevronLeft size={32} /></Button>
          <Button size="icon" variant="ghost" className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20" onClick={showNextLightboxImage}><ChevronRight size={32} /></Button>
        </div>
      )}
    </div>
  );
}
