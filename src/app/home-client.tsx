
"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import FeaturedProducts from '@/components/featured-products';
import { useEffect, useRef } from 'react';

export default function HomeClient() {
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        // Intersection Observer for scroll animations
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        // Observe all animatable elements
        const elements = document.querySelectorAll('.fade-in-section');
        elements.forEach((el) => observerRef.current?.observe(el));

        return () => observerRef.current?.disconnect();
    }, []);

    return (
        <div className="bg-background">
            <style jsx>{`
                .fade-in-section {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
                }
                .fade-in-section.animate-in {
                    opacity: 1;
                    transform: translateY(0);
                }
                .stagger-1 { transition-delay: 0.1s; }
                .stagger-2 { transition-delay: 0.2s; }
                .hero-text {
                    animation: slideInUp 0.8s ease-out;
                }
                .hero-buttons {
                    animation: slideInUp 1s ease-out;
                }
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>

            <section className="w-full py-20 md:py-24 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-background relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="hero-text font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">
                        Quality & Style, Delivered
                    </h1>
                    <p className="hero-text font-body mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
                        Welcome to HTG—where Sialkot's finest meets global fashion HTG – Style Without Borders.
                    </p>
                    <div className="hero-buttons mt-8 flex flex-wrap justify-center gap-4">
                        <Button asChild size="lg" className="transition-transform hover:scale-105 duration-300">
                            <Link href="/all-products" prefetch={true}>Shop Now</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="transition-transform hover:scale-105 duration-300">
                            <Link href="/categories" prefetch={true}>Browse Categories</Link>
                        </Button>
                    </div>
                </div>
            </section>

            <div className="fade-in-section">
                <FeaturedProducts />
            </div>

            <section className="fade-in-section text-center py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold">See Our Full Collection</h2>
                    <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-lg">
                        Ready to see more? Browse our entire catalog to find exactly what you're looking for.
                    </p>
                    <Button asChild size="lg" className="mt-8 transition-transform hover:scale-105 duration-300">
                        <Link href="/all-products" prefetch={true}>View All Products</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
