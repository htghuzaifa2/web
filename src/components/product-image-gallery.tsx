
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Share2, ExternalLink, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";

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
  
  const [mainCarouselRef, mainCarouselApi] = useEmblaCarousel({ loop: images.length > 1, align: "start" });
  const [thumbCarouselRef, thumbCarouselApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    axis: "y" // Default to vertical for desktop
  });
  
  const [lightboxEmblaRef, lightboxEmblaApi] = useEmblaCarousel({ loop: images.length > 1, align: "start" });
  const [lightboxThumbRef, lightboxThumbApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });


  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const fallbackImage = images[0] || "https://placehold.co/600x600.png";
  const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmM2YzIi8+PC9zdmc+";

  const openLightbox = useCallback((index: number) => {
    setMainImageIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = () => setLightboxOpen(false);

  const handleThumbnailClick = useCallback((index: number) => {
      if (!mainCarouselApi || !thumbCarouselApi) return;
      mainCarouselApi.scrollTo(index);
  }, [mainCarouselApi, thumbCarouselApi]);

  const onMainCarouselSelect = useCallback(() => {
    if (!mainCarouselApi || !thumbCarouselApi) return;
    const selectedIndex = mainCarouselApi.selectedScrollSnap();
    setMainImageIndex(selectedIndex);
    thumbCarouselApi.scrollTo(selectedIndex);
  }, [mainCarouselApi, thumbCarouselApi, setMainImageIndex]);
  
  const onThumbCarouselSelect = useCallback((emblaApi: EmblaCarouselType) => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  const scrollPrevThumb = useCallback(() => thumbCarouselApi && thumbCarouselApi.scrollPrev(), [thumbCarouselApi]);
  const scrollNextThumb = useCallback(() => thumbCarouselApi && thumbCarouselApi.scrollNext(), [thumbCarouselApi]);
  
  useEffect(() => {
      const handleResize = () => {
        if (thumbCarouselApi) {
          const newAxis = window.innerWidth < 768 ? 'x' : 'y';
          if (thumbCarouselApi.internalEngine().options.axis !== newAxis) {
            thumbCarouselApi.reInit({ axis: newAxis });
          }
        }
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, [thumbCarouselApi]);

  const onLightboxSelect = useCallback(() => {
      if (!lightboxEmblaApi || !lightboxThumbApi) return;
      const selectedIndex = lightboxEmblaApi.selectedScrollSnap();
      setMainImageIndex(selectedIndex);
      lightboxThumbApi.scrollTo(selectedIndex);
  }, [lightboxEmblaApi, lightboxThumbApi]);

  const handleLightboxThumbClick = useCallback((index: number) => {
      if (!lightboxEmblaApi) return;
      lightboxEmblaApi.scrollTo(index);
  }, [lightboxEmblaApi]);

  useEffect(() => {
    if (!mainCarouselApi) return;
    mainCarouselApi.on("select", onMainCarouselSelect);
    return () => { mainCarouselApi.off("select", onMainCarouselSelect) };
  }, [mainCarouselApi, onMainCarouselSelect]);

  useEffect(() => {
    if (!thumbCarouselApi) return;
    onThumbCarouselSelect(thumbCarouselApi);
    thumbCarouselApi.on("reInit", onThumbCarouselSelect);
    thumbCarouselApi.on("select", onThumbCarouselSelect);
  }, [thumbCarouselApi, onThumbCarouselSelect]);

  useEffect(() => {
      if (lightboxOpen && lightboxEmblaApi) {
          onLightboxSelect(); // Initial sync
          lightboxEmblaApi.on('select', onLightboxSelect);
          lightboxEmblaApi.scrollTo(mainImageIndex, true); // Go to correct image on open
          return () => { lightboxEmblaApi.off('select', onLightboxSelect) };
      }
  }, [lightboxOpen, lightboxEmblaApi, mainImageIndex, onLightboxSelect]);

  const showNextImage = useCallback(() => mainCarouselApi?.scrollNext(), [mainCarouselApi]);
  const showPrevImage = useCallback(() => mainCarouselApi?.scrollPrev(), [mainCarouselApi]);
  
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
      } catch (err)
      {
        console.error("Failed to copy link:", err);
        alert("Could not copy link to clipboard.");
      }
    }
  };

  return (
    <div className="grid md:grid-cols-5 gap-4">
      {images.length > 1 && (
        <div className="md:col-span-1 md:order-1 order-2">
            <div className="relative h-full flex flex-row md:flex-col items-center justify-center gap-2">
                <Button
                    size="icon"
                    variant="ghost"
                    className={cn(
                      "h-full md:h-8 w-8 md:w-full rounded-full self-center shrink-0",
                      prevBtnDisabled && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={scrollPrevThumb}
                    disabled={prevBtnDisabled}
                >
                    <ChevronLeft className="h-5 w-5 md:hidden" />
                    <ChevronUp className="h-5 w-5 hidden md:block" />
                </Button>
                <div className="overflow-hidden w-full h-auto md:h-full" ref={thumbCarouselRef}>
                    <div className="flex md:flex-col gap-2 h-full">
                        {images.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => handleThumbnailClick(index)}
                                className={cn(
                                    "relative aspect-square w-16 h-16 md:w-full md:h-auto flex-shrink-0 overflow-hidden rounded-md transition-opacity duration-200 basis-1/4 sm:basis-1/5 md:basis-auto",
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
                <Button
                    size="icon"
                    variant="ghost"
                    className={cn(
                      "h-full md:h-8 w-8 md:w-full rounded-full self-center shrink-0",
                      nextBtnDisabled && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={scrollNextThumb}
                    disabled={nextBtnDisabled}
                >
                    <ChevronRight className="h-5 w-5 md:hidden" />
                    <ChevronDown className="h-5 w-5 hidden md:block" />
                </Button>
            </div>
        </div>
      )}

      <div className={cn("relative flex-1 w-full overflow-hidden rounded-lg group md:order-2 order-1", images.length > 1 ? "md:col-span-4" : "md:col-span-5")}>
         <div className="overflow-hidden h-full" ref={mainCarouselRef}>
            <div className="flex h-full">
                {images.map((imgSrc, index) => (
                    <div className="relative aspect-square w-full flex-shrink-0 flex-grow-0 basis-full" key={index}>
                        <ImageWithFallback
                            src={imgSrc}
                            alt={`${productName} image ${index + 1}`}
                            fill
                            className="object-cover cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm lightbox-zoom-in" onClick={closeLightbox}>
          <div 
            className="relative w-full h-full flex-1 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
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
              
              <div 
                className="w-full h-auto py-4 bg-black/50 absolute bottom-0"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="overflow-hidden container mx-auto" ref={lightboxThumbRef}>
                  <div className="flex gap-2 justify-center">
                    {images.map((img, index) => (
                      <button
                        key={`lightbox-thumb-${index}`}
                        onClick={() => handleLightboxThumbClick(index)}
                        className={cn(
                          "relative aspect-square h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 overflow-hidden rounded-md transition-opacity duration-200",
                           mainImageIndex === index ? "opacity-100 ring-2 ring-primary ring-offset-2 ring-offset-black/50" : "opacity-50 hover:opacity-100"
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
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
