
import { Metadata } from "next";
import PortfolioButton from "@/components/portfolio-button";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "About Us - Our Story",
    description: "Learn why Huzi.pk was started. We're here to deliver quality, style, and digital innovation to Pakistan. More than a store, we're a community.",
};

export const runtime = 'edge';

const principles = [
    {
        name: "Uncompromising Quality",
        description: "From the fabric in our apparel to the seamless delivery of our digital downloads, we obsess over the details so you don’t have to."
    },
    {
        name: "Radical Transparency",
        description: "No surprises, no hidden fees. Just honest descriptions, fair pricing, and products you can trust. What you see is what you get."
    },
    {
        name: "Customer-First Innovation",
        description: "You are our roadmap. Your feedback is our greatest inspiration, driving us to improve and innovate every single day."
    }
];

export default function AboutPage() {
    return (
        <div className="bg-background">
            <div className="container mx-auto px-4 py-12 md:py-20">
                <div className="max-w-4xl mx-auto">
                    <header className="text-center mb-12">
                        <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground">About Huzi.pk: Beyond the Transaction</h1>
                    </header>

                    <section className="prose prose-lg max-w-none text-muted-foreground mx-auto text-center mb-16">
                        <p className="lead text-xl">
                            Every movement begins with a question. Ours began in 2024 with one that mattered:
                        </p>
                        <blockquote className="text-2xl md:text-3xl font-semibold text-foreground border-l-4 border-primary pl-6 my-8 italic">
                            “Why should quality, style, and digital innovation feel like a luxury in Pakistan?”
                        </blockquote>
                        <p>
                            We saw a gap in the local market. Global trends were accelerating, yet shoppers in Pakistan often had to compromise—on quality, price, or trust. We believed there was a better way.
                        </p>
                        <p>
                            That’s where Huzi.pk was born: not just as a store, but as a solution. We set out to create a trusted destination where you can confidently shop for modern fashion and essential digital products—without compromise. Our goal is to deliver more than just products. We deliver experiences.
                        </p>
                    </section>
                    
                    <section className="py-16 bg-muted/50 rounded-lg">
                        <div className="container px-6">
                            <h2 className="font-headline text-3xl font-bold text-center mb-10 text-foreground">What We Offer</h2>
                            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
                                Our collections are thoughtfully curated to add value to your modern lifestyle. We don’t sell everything; we sell the right things.
                            </p>
                            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                                <div className="bg-background p-6 rounded-lg shadow-sm">
                                    <h3 className="font-headline text-xl font-semibold text-foreground mb-3">Curated Fashion</h3>
                                    <p className="text-muted-foreground">
                                        Timeless yet modern apparel and accessories that balance style, durability, and fair pricing. Built for your life, designed to last.
                                    </p>
                                </div>
                                <div className="bg-background p-6 rounded-lg shadow-sm">
                                    <h3 className="font-headline text-xl font-semibold text-foreground mb-3">Digital Essentials</h3>
                                    <p className="text-muted-foreground">
                                        A growing suite of tools and services designed to streamline your work, fuel your creativity, and simplify your digital world.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="py-16">
                        <h2 className="font-headline text-3xl font-bold text-center mb-12 text-foreground">Our Core Principles</h2>
                         <div className="grid md:grid-cols-3 gap-8 text-center">
                            {principles.map((principle) => (
                                <div key={principle.name} className="flex flex-col items-center">
                                    <CheckCircle className="h-10 w-10 text-primary mb-4" />
                                    <h3 className="font-headline text-xl font-semibold text-foreground mb-2">{principle.name}</h3>
                                    <p className="text-muted-foreground">{principle.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="prose prose-lg max-w-none text-muted-foreground mx-auto text-left mb-16">
                         <h2 className="font-headline text-3xl font-bold text-foreground !mb-6">Our Vision for the Future</h2>
                         <p>
                            This is just the beginning. We envision Huzi.pk becoming a household name known for trust, quality, and forward-thinking commerce in Pakistan and beyond.
                         </p>
                         <p>
                            Our dream is not only to be a store you rely on, but a brand you’re proud to be part of. We are building more than a platform—we are creating an ecosystem that evolves with you, where every visit offers fresh styles, useful tools, and new opportunities.
                         </p>

                        <h2 className="font-headline text-3xl font-bold text-foreground !mt-12 !mb-6">Our Promise to You</h2>
                         <p>
                            You are at the heart of everything we do. We promise to consistently deliver products that live up to their name, keep our prices fair, and provide reliable service from click to delivery.
                         </p>
                         <p>
                           When you choose Huzi.pk, you’re not just making a purchase—you’re joining a community built on trust, style, and progress.
                         </p>
                    </section>

                    <footer className="text-center border-t pt-12">
                         <h3 className="text-2xl font-semibold font-headline text-foreground">
                            Huzi.pk isn’t just our story—it’s yours too.
                         </h3>
                         <p className="mt-4 text-lg text-muted-foreground">
                            Welcome to Huzi.pk. Your journey to a more stylish and empowered life starts here.
                         </p>
                         <div className="mt-12">
                            <PortfolioButton />
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}
