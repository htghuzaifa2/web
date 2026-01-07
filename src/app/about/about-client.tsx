
"use client";

import { Gem, ShieldCheck, Sparkles, Target, HeartHandshake, Globe, MapPin, Package, Award } from "lucide-react";
import { useEffect, useRef } from "react";

const principles = [
    {
        name: "Uncompromising Quality",
        description: "From fabric selection to final stitching, every HTG piece undergoes rigorous quality control. We source premium materials and employ skilled artisans who take pride in their craft.",
        icon: <Gem className="h-10 w-10 text-primary" />
    },
    {
        name: "Radical Transparency",
        description: "No surprises, no hidden fees. Just honest descriptions, fair pricing, and products you can trust. What you see is what you get—authentic craftsmanship at transparent prices.",
        icon: <ShieldCheck className="h-10 w-10 text-primary" />
    },
    {
        name: "Customer-First Innovation",
        description: "You are our roadmap. Your feedback drives our designs, our processes, and our evolution. Every collection is shaped by real customer needs and preferences.",
        icon: <Sparkles className="h-10 w-10 text-primary" />
    }
];

const sialkotFacts = [
    {
        title: "Century of Excellence",
        description: "Sialkot has been a manufacturing hub since the 1890s, producing world-class goods for over 130 years.",
        icon: <Award className="h-8 w-8 text-primary" />
    },
    {
        title: "Global Reach",
        description: "Products from Sialkot are exported to over 100 countries, trusted by international brands worldwide.",
        icon: <Globe className="h-8 w-8 text-primary" />
    },
    {
        title: "Textile Heritage",
        description: "Home to generations of master textile craftsmen who've perfected the art of premium apparel production.",
        icon: <MapPin className="h-8 w-8 text-primary" />
    },
    {
        title: "Quality Standards",
        description: "Sialkot maintains ISO-certified facilities and adheres to international quality benchmarks.",
        icon: <Package className="h-8 w-8 text-primary" />
    }
];

export default function AboutClient() {
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
        <div className="bg-background text-foreground">
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
                .stagger-3 { transition-delay: 0.3s; }
                .stagger-4 { transition-delay: 0.4s; }
            `}</style>

            {/* Hero Section */}
            <header className="relative flex items-center justify-center h-[60vh] md:h-[70vh] bg-gradient-to-br from-primary/10 via-background to-background overflow-hidden">
                <div className="absolute inset-0 bg-grid-black/[0.05] dark:bg-grid-black/[0.05] [mask-image:linear-gradient(to_bottom,white_50%,transparent_100%)]"></div>
                <div className="container mx-auto px-4 text-center z-10 fade-in-section animate-in">
                    <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight">HTG: Our Story</h1>
                    <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                        From the heart of Sialkot to wardrobes worldwide, discover how HTG is redefining premium fashion with Pakistani craftsmanship.
                    </p>
                </div>
            </header>

            <main className="container mx-auto px-4 py-16 md:py-24 space-y-24">

                {/* Sialkot Heritage Section */}
                <section className="fade-in-section">
                    <div className="text-center mb-12">
                        <h2 className="font-headline text-4xl font-bold text-foreground">Rooted in Sialkot</h2>
                        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                            Sialkot isn't just our home—it's our heritage, our inspiration, and the foundation of everything we create.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {sialkotFacts.map((fact, index) => (
                            <div
                                key={fact.title}
                                className={`fade-in-section stagger-${index + 1} bg-card p-6 rounded-xl shadow-lg border border-border/50 transition-all duration-500 hover:shadow-primary/20 hover:-translate-y-2 hover:scale-105`}
                            >
                                <div className="mb-4 flex justify-center">{fact.icon}</div>
                                <h3 className="font-headline text-lg font-semibold text-foreground mb-2 text-center">{fact.title}</h3>
                                <p className="text-sm text-muted-foreground text-center">{fact.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Origin Story */}
                <section className="max-w-4xl mx-auto text-center fade-in-section">
                    <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-muted-foreground">
                        <p className="lead text-xl md:text-2xl !text-foreground">
                            Every great brand begins with a vision. Ours started in 2024 with a simple question:
                        </p>
                        <blockquote className="text-2xl md:text-4xl font-semibold text-foreground border-l-4 border-primary pl-6 my-10 italic text-left max-w-3xl mx-auto">
                            "Why can't Pakistani craftsmanship compete on the global fashion stage?"
                        </blockquote>
                        <p>
                            We saw incredible talent in Sialkot—artisans who could create world-class apparel but lacked a platform to showcase their work globally. We witnessed international brands sourcing from Pakistan yet selling at premium prices elsewhere. We knew there was a gap to bridge.
                        </p>
                        <p>
                            That's where HTG was born: not just as a brand, but as a movement. We're proving that premium fashion can be "Made in Pakistan" with pride. Every HTG piece carries the soul of Sialkot—precision, craftsmanship, and a commitment to excellence that spans generations.
                        </p>
                        <p className="!text-primary font-semibold text-xl">
                            HTG – Style Without Borders.
                        </p>
                    </div>
                </section>

                {/* What We Offer */}
                <section className="fade-in-section">
                    <div className="text-center mb-12">
                        <h2 className="font-headline text-4xl font-bold text-foreground">What Makes HTG Different</h2>
                        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                            In a world of fast fashion, we choose slow, intentional creation.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="fade-in-section stagger-1 bg-card p-8 rounded-xl shadow-lg border border-border/50 transition-all duration-500 hover:shadow-primary/20 hover:-translate-y-2">
                            <h3 className="font-headline text-2xl font-semibold text-foreground mb-3">Premium Materials</h3>
                            <p className="text-muted-foreground">
                                We source only the finest fabrics from trusted suppliers. Breathable cottons, luxurious blends, and durable performance materials—every fabric is handpicked for comfort, longevity, and timeless appeal.
                            </p>
                        </div>
                        <div className="fade-in-section stagger-2 bg-card p-8 rounded-xl shadow-lg border border-border/50 transition-all duration-500 hover:shadow-primary/20 hover:-translate-y-2">
                            <h3 className="font-headline text-2xl font-semibold text-foreground mb-3">Master Craftsmanship</h3>
                            <p className="text-muted-foreground">
                                Each garment is crafted by skilled artisans who've honed their expertise over decades. Multiple quality checks ensure every piece meets our exacting standards before it reaches you.
                            </p>
                        </div>
                        <div className="fade-in-section stagger-3 bg-card p-8 rounded-xl shadow-lg border border-border/50 transition-all duration-500 hover:shadow-primary/20 hover:-translate-y-2">
                            <h3 className="font-headline text-2xl font-semibold text-foreground mb-3">Timeless Design</h3>
                            <p className="text-muted-foreground">
                                HTG pieces transcend seasonal trends. We create versatile wardrobe essentials that look as good today as they will years from now—classics that never go out of style.
                            </p>
                        </div>
                        <div className="fade-in-section stagger-4 bg-card p-8 rounded-xl shadow-lg border border-border/50 transition-all duration-500 hover:shadow-primary/20 hover:-translate-y-2">
                            <h3 className="font-headline text-2xl font-semibold text-foreground mb-3">Global Delivery</h3>
                            <p className="text-muted-foreground">
                                From Sialkot to your city, we ship worldwide with trusted carriers. Fast, trackable, and secure—premium Pakistani craftsmanship delivered to your doorstep, wherever you are.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Core Principles */}
                <section className="fade-in-section">
                    <div className="text-center mb-12">
                        <h2 className="font-headline text-4xl font-bold text-foreground">Our Core Principles</h2>
                        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                            These values guide every decision we make, from design to delivery.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {principles.map((principle, index) => (
                            <div
                                key={principle.name}
                                className={`fade-in-section stagger-${index + 1} flex flex-col items-center text-center p-8 bg-card rounded-xl shadow-lg border border-border/50 transition-all duration-500 hover:shadow-primary/20 hover:-translate-y-2`}
                            >
                                <div className="mb-4">{principle.icon}</div>
                                <h3 className="font-headline text-2xl font-semibold text-foreground mb-2">{principle.name}</h3>
                                <p className="text-muted-foreground">{principle.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Vision & Promise */}
                <section className="max-w-4xl mx-auto space-y-16 fade-in-section">
                    <div className="text-center">
                        <Target className="h-12 w-12 mx-auto text-primary mb-4" />
                        <h2 className="font-headline text-4xl font-bold text-foreground">Our Vision for the Future</h2>
                        <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-muted-foreground mt-4">
                            <p>
                                This is just the beginning. We envision HTG becoming a global symbol of Pakistani excellence—proof that world-class fashion can originate from Sialkot. We're building more than a brand; we're creating a movement that showcases Pakistan's manufacturing prowess to the world, one premium garment at a time.
                            </p>
                        </div>
                    </div>
                    <div className="text-center">
                        <HeartHandshake className="h-12 w-12 mx-auto text-primary mb-4" />
                        <h2 className="font-headline text-4xl font-bold text-foreground">Our Promise to You</h2>
                        <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-muted-foreground mt-4">
                            <p>
                                You are at the heart of everything we do. Every HTG piece is a promise: premium quality, fair pricing, transparent practices, and reliable global delivery. When you choose HTG, you're not just buying clothes—you're joining a community that values craftsmanship, authenticity, and the power of Pakistani talent on the world stage.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Call to Action Footer */}
                <footer className="text-center border-t border-border/50 pt-16 fade-in-section">
                    <h3 className="font-headline text-3xl md:text-4xl font-bold text-foreground max-w-3xl mx-auto">
                        Join the HTG Movement
                    </h3>
                    <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Experience the difference of premium Pakistani craftsmanship. Welcome to HTG—where Sialkot's finest meets global fashion.
                    </p>
                </footer>
            </main>
        </div>
    );
}
