"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, X, ZoomIn, Share2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);

  const imagesToShow = 4;

  useEffect(() => {
    setSelectedImage(images[0]);
    setCurrentIndex(0);
  }, [images]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const showNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const showPrevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === "Escape") setLightboxOpen(false);
        if (e.key === "ArrowRight") showNextImage();
        if (e.key === "ArrowLeft") showPrevImage();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, currentIndex]);

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

  const handleThumbnailClick = (img: string, index: number) => {
    setSelectedImage(img);
    setCurrentIndex(images.indexOf(img));
  }

  const scrollThumbnails = (direction: 'up' | 'down') => {
    if (direction === 'down') {
      setThumbnailStartIndex(prev => Math.min(prev + 1, images.length - imagesToShow));
    } else {
      setThumbnailStartIndex(prev => Math.max(prev - 1, 0));
    }
  }

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col items-center gap-2">
        {images.length > imagesToShow && (
          <Button
            size="icon"
            variant="ghost"
            onClick={() => scrollThumbnails('up')}
            disabled={thumbnailStartIndex === 0}
            className="hidden md:block"
          >
            <ChevronUp />
          </Button>
        )}
        
        {/* Horizontal scroll for mobile */}
        <div className="md:hidden w-full overflow-x-auto">
            <div className="flex gap-2 pb-2">
                {images.map((img, index) => (
                    <button
                        key={index}
                        className={cn(
                            "relative aspect-square w-20 h-20 flex-shrink-0 overflow-hidden rounded-md transition-opacity duration-200",
                            selectedImage === img ? "opacity-100 ring-2 ring-primary" : "opacity-60 hover:opacity-100"
                        )}
                        onClick={() => handleThumbnailClick(img, index)}
                    >
                        <Image src={img} alt={`${productName} thumbnail ${index + 1}`} fill className="object-cover" />
                    </button>
                ))}
            </div>
        </div>

        {/* Vertical thumbnails for desktop */}
        <div className="hidden md:flex md:flex-col gap-2">
          {images.slice(thumbnailStartIndex, thumbnailStartIndex + imagesToShow).map((img, index) => {
             const actualIndex = thumbnailStartIndex + index;
             return (
                <button
                    key={actualIndex}
                    className={cn(
                        "relative aspect-square w-20 h-20 flex-shrink-0 overflow-hidden rounded-md transition-opacity duration-200",
                        selectedImage === img ? "opacity-100 ring-2 ring-primary" : "opacity-60 hover:opacity-100"
                    )}
                    onClick={() => handleThumbnailClick(img, actualIndex)}
                >
                    <Image src={img} alt={`${productName} thumbnail ${actualIndex + 1}`} fill className="object-cover" />
                </button>
             );
          })}
        </div>

        {images.length > imagesToShow && (
          <Button
            size="icon"
            variant="ghost"
            onClick={() => scrollThumbnails('down')}
            disabled={thumbnailStartIndex >= images.length - imagesToShow}
            className="hidden md:block"
          >
            <ChevronDown />
          </Button>
        )}
      </div>

      {/* Main Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-lg group cursor-pointer flex-1" onClick={() => openLightbox(images.indexOf(selectedImage))}>
        <Image
          src={selectedImage}
          alt={productName}
          fill
          className="object-cover transition-all duration-300"
        />
      </div>

      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm lightbox-zoom-in">
          <div className="relative w-full h-full max-w-5xl max-h-5xl">
            <Image src={images[currentIndex]} alt={productName} fill className="object-contain" />
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
             <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={handleShare}><Share2 /></Button>
             <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" asChild><a href={images[currentIndex]} target="_blank" rel="noopener noreferrer"><ExternalLink /></a></Button>
             <Button size="icon" variant="ghost" className="text-white hover:bg-white/20" onClick={() => setLightboxOpen(false)}><X /></Button>
          </div>
          <Button size="icon" variant="ghost" className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20" onClick={showPrevImage}><ChevronLeft size={32} /></Button>
          <Button size="icon" variant="ghost" className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20" onClick={showNextImage}><ChevronRight size={32} /></Button>
        </div>
      )}
    </div>
  );
}
