
"use client";

import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";

interface ImageWithSkeletonProps extends ImageProps {
  alt: string;
}

export const ImageWithSkeleton = ({ alt, className, onLoad, onError, src, ...props }: ImageWithSkeletonProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset state when the image source changes
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  return (
    <div className="relative w-full h-full">
      <Image
        alt={alt}
        src={src}
        {...props}
        className={cn(
          "transition-opacity duration-500 ease-in-out",
          "object-contain",
          isLoaded && !hasError ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={(e) => {
            setIsLoaded(true);
            onLoad?.(e);
        }}
        onError={(e) => {
          setIsLoaded(true);
          setHasError(true);
          onError?.(e);
        }}
      />
      {(!isLoaded || hasError) && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
           <Skeleton className="absolute inset-0" />
        </div>
      )}
    </div>
  );
};
