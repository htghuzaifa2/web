"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Share2, Copy, ZoomIn, ZoomOut } from "lucide-react";
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
          "object-contain transition-opacity duration-500 ease-in-out pointer-events-none select-none",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setIsLoading(false)}
        loading={priority ? 'eager' : 'lazy'}
        draggable={false}
      />
    </div>
  );
};

// Hook for pinch-to-zoom and pan gestures
const useGestures = () => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Touch state
  const touchState = useRef({
    initialDistance: 0,
    initialScale: 1,
    lastTouchTime: 0,
    isPinching: false,
    isPanning: false,
    lastPosition: { x: 0, y: 0 },
    touchStartPosition: { x: 0, y: 0 }
  });

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch gesture
      touchState.current.isPinching = true;
      touchState.current.isPanning = false;
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      touchState.current.initialDistance = distance;
      touchState.current.initialScale = scale;
    } else if (e.touches.length === 1) {
      const touch = e.touches[0];
      const now = Date.now();

      // Check for double tap
      if (now - touchState.current.lastTouchTime < 300) {
        // Double tap detected
        if (scale > 1) {
          resetZoom();
        } else {
          setScale(2.5);
          setPosition({ x: 0, y: 0 });
        }
        touchState.current.lastTouchTime = 0; // Reset to prevent triple tap
      } else {
        touchState.current.lastTouchTime = now;
      }

      touchState.current.touchStartPosition = { x: touch.clientX, y: touch.clientY };
      touchState.current.lastPosition = { x: touch.clientX, y: touch.clientY };

      if (scale > 1) {
        touchState.current.isPanning = true;
      }
    }
  }, [scale]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchState.current.isPinching) {
      // Pinch zoom
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      const newScale = Math.max(
        1,
        Math.min(4, (distance / touchState.current.initialDistance) * touchState.current.initialScale)
      );
      setScale(newScale);
    } else if (e.touches.length === 1 && scale > 1 && touchState.current.isPanning) {
      // Pan when zoomed
      e.preventDefault();
      const touch = e.touches[0];
      const deltaX = touch.clientX - touchState.current.lastPosition.x;
      const deltaY = touch.clientY - touchState.current.lastPosition.y;

      setPosition(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));

      touchState.current.lastPosition = {
        x: touch.clientX,
        y: touch.clientY
      };
    }
  }, [scale]);

  const handleTouchEnd = useCallback(() => {
    touchState.current.isPinching = false;
    touchState.current.isPanning = false;
  }, []);

  const zoomIn = () => {
    setScale(prev => Math.min(4, prev + 0.5));
  };

  const zoomOut = () => {
    if (scale <= 1.5) {
      resetZoom();
    } else {
      setScale(prev => Math.max(1, prev - 0.5));
    }
  };

  return {
    scale,
    position,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    zoomIn,
    zoomOut,
    resetZoom
  };
};

const LightboxContent = ({ images, index, productName, closeLightbox }: LightboxState & { closeLightbox: () => void }) => {
  const [lightboxApi, setLightboxApi] = useState<ReturnType<typeof useEmblaCarousel>[1]>();
  const [lightboxRef, emblaLightboxApi] = useEmblaCarousel({
    loop: images.length > 1,
    startIndex: index,
    watchDrag: false // Disable drag to prevent conflicts with zoom/pan
  });
  const { toast } = useToast();
  const { scale, position, handleTouchStart, handleTouchMove, handleTouchEnd, zoomIn, zoomOut, resetZoom } = useGestures();

  useEffect(() => {
    setLightboxApi(emblaLightboxApi);
  }, [emblaLightboxApi]);

  const lightboxScrollPrev = useCallback(() => {
    if (scale === 1) {
      lightboxApi?.scrollPrev();
    }
  }, [lightboxApi, scale]);

  const lightboxScrollNext = useCallback(() => {
    if (scale === 1) {
      lightboxApi?.scrollNext();
    }
  }, [lightboxApi, scale]);

  const selectedIndex = lightboxApi?.selectedScrollSnap() ?? index;

  // Reset zoom when changing slides
  useEffect(() => {
    if (lightboxApi) {
      lightboxApi.on('select', resetZoom);
      return () => {
        lightboxApi.off('select', resetZoom);
      };
    }
  }, [lightboxApi, resetZoom]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight" && scale === 1) lightboxScrollNext();
      if (e.key === "ArrowLeft" && scale === 1) lightboxScrollPrev();
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeLightbox, lightboxScrollNext, lightboxScrollPrev, zoomIn, zoomOut, scale]);

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
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={scale === 1 ? closeLightbox : undefined}
      style={{ touchAction: 'none' }}
    >
      <div
        className="relative w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={cn(
            "h-full w-full",
            scale > 1 ? "overflow-hidden" : "overflow-visible"
          )}
          ref={lightboxRef}
        >
          <div className="flex h-full">
            {images.map((imgSrc, i) => (
              <div
                key={`lightbox-main-${i}`}
                className={cn(
                  "relative flex-shrink-0 flex-grow-0 basis-full flex items-center justify-center",
                  scale > 1 ? "overflow-hidden" : ""
                )}
                style={{
                  width: '100%',
                  height: '100%',
                  visibility: scale > 1 && i !== selectedIndex ? 'hidden' : 'visible'
                }}
                onTouchStart={i === selectedIndex ? handleTouchStart : undefined}
                onTouchMove={i === selectedIndex ? handleTouchMove : undefined}
                onTouchEnd={i === selectedIndex ? handleTouchEnd : undefined}
              >
                <div
                  style={{
                    transform: i === selectedIndex ? `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)` : 'none',
                    transition: scale === 1 ? 'transform 0.3s ease-out' : 'none',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ImageSlot
                    src={imgSrc}
                    alt={productName}
                    fill
                    priority={i === selectedIndex}
                    sizes="100vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Controls */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <Button size="icon" variant="ghost" className="text-white bg-black/50 hover:bg-black/80 h-10 w-10 backdrop-blur-sm" onClick={handleShare}>
          <Share2 className="h-5 w-5" />
        </Button>
        <Button size="icon" variant="ghost" className="text-white bg-black/50 hover:bg-black/80 h-10 w-10 backdrop-blur-sm" onClick={handleCopyLink}>
          <Copy className="h-5 w-5" />
        </Button>
        <Button size="icon" variant="ghost" className="text-white bg-black/50 hover:bg-black/80 h-10 w-10 backdrop-blur-sm" onClick={(e) => { e.stopPropagation(); closeLightbox(); }}><X className="h-5 w-5" /></Button>
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-20 md:bottom-8 right-4 flex flex-col gap-2 z-10">
        <Button
          size="icon"
          variant="ghost"
          className="text-white bg-black/50 hover:bg-black/80 h-12 w-12 backdrop-blur-sm"
          onClick={(e) => { e.stopPropagation(); zoomIn(); }}
          disabled={scale >= 4}
        >
          <ZoomIn className="h-6 w-6" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="text-white bg-black/50 hover:bg-black/80 h-12 w-12 backdrop-blur-sm"
          onClick={(e) => { e.stopPropagation(); zoomOut(); }}
          disabled={scale <= 1}
        >
          <ZoomOut className="h-6 w-6" />
        </Button>
      </div>

      {/* Zoom Indicator */}
      {scale > 1 && (
        <div className="absolute bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm font-medium">
          {Math.round(scale * 100)}%
        </div>
      )}

      {/* Instructions for mobile */}
      {scale === 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-xs backdrop-blur-sm md:hidden">
          Pinch to zoom • Double tap to zoom
        </div>
      )}

      {/* Navigation arrows - only show when not zoomed */}
      {images.length > 1 && scale === 1 && (
        <>
          <Button
            size="icon"
            variant="ghost"
            className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/80 md:left-4 h-12 w-12 backdrop-blur-sm"
            onClick={(e) => { e.stopPropagation(); lightboxScrollPrev(); }}
          >
            <ChevronLeft size={32} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/80 md:right-4 h-12 w-12 backdrop-blur-sm"
            onClick={(e) => { e.stopPropagation(); lightboxScrollNext(); }}
          >
            <ChevronRight size={32} />
          </Button>
        </>
      )}

      {/* Image counter */}
      {images.length > 1 && scale === 1 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm font-medium">
          {selectedIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

export const Lightbox = () => null; // This component is just a placeholder
