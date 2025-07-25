"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn, Share2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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
  }, [lightboxOpen, currentIndex]);

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
  
  const handleShare = async () => {
    const shareData = {
      title: productName,
      text: `Check out this product: ${productName}`,
      url: window.location.href,
    };
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.error("Share failed:", err);
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto pr-2">
        {images.map((img, index) => (
          <button
            key={index}
            className={`relative aspect-square w-20 h-20 flex-shrink-0 overflow-hidden rounded-md transition-opacity duration-200 ${selectedImage === img ? "opacity-100 ring-2 ring-primary" : "opacity-60 hover:opacity-100"}`}
            onClick={() => setSelectedImage(img)}
          >
            <Image src={img} alt={`${productName} thumbnail ${index + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
      <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-lg group cursor-pointer" onClick={() => openLightbox(images.indexOf(selectedImage))}>
        <Image
          src={selectedImage}
          alt={productName}
          fill
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <ZoomIn className="h-12 w-12 text-white" />
        </div>
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
