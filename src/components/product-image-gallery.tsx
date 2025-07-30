
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Share2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mainImageIndex, setMainImageIndex] = useState(0);

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

  const ImageWithFallback = ({ src, alt, ...props }: React.ComponentProps<typeof Image>) => {
    const [error, setError] = useState(false);
    const handleError = () => setError(true);
    const fallbackSrc = images[0] || "https://placehold.co/600x600";
    return <Image src={error ? fallbackSrc : src} alt={alt} onError={handleError} {...props} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full overflow-hidden rounded-lg group">
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
          />
        </div>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setMainImageIndex(index)}
              className={cn(
                "relative aspect-square w-full h-auto flex-shrink-0 overflow-hidden rounded-md transition-opacity duration-200",
                mainImageIndex === index ? "opacity-100 ring-2 ring-primary" : "opacity-60 hover:opacity-100"
              )}
            >
              <ImageWithFallback
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
            <ImageWithFallback
              src={images[mainImageIndex]}
              alt={productName}
              fill
              className="object-contain"
              sizes="100vw"
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
