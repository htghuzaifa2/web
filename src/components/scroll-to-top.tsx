
"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);


  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-[calc(4rem+24px)] right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-background/60 text-primary shadow-lg backdrop-blur-sm transition-opacity duration-300 hover:bg-background/90 focus:outline-none",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp className="absolute h-6 w-6" />
    </button>
  );
}
