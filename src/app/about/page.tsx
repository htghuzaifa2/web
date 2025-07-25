import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "About Us - huzi.pk",
    description: "Learn more about huzi.pk, our mission, and our commitment to quality products and customer service in Pakistan and worldwide.",
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-center font-headline text-4xl font-bold mb-8">About huzi.pk</h1>
                <div className="relative h-64 w-full rounded-lg overflow-hidden mb-8 shadow-lg">
                    <Image 
                        src="https://placehold.co/1200x400"
                        alt="Huzi.pk team or office"
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint="team workspace"
                    />
                </div>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                    <p>
                        Welcome to huzi.pk, your premier destination for modern fashion and digital goods. Founded in 2024, our mission is to bring high-quality, stylish, and affordable products to customers across Pakistan and around the globe.
                    </p>
                    <p>
                        We believe that style is a form of self-expression. That's why we meticulously curate our collections, ensuring that every item reflects our commitment to quality, craftsmanship, and contemporary design. From the finest fabrics to the smallest details, we strive for excellence in everything we offer.
                    </p>
                    <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">Our Vision</h2>
                    <p>
                        Our vision is to be the leading e-commerce platform in Pakistan, known for our exceptional customer service and our diverse range of products. We deliver physical goods nationwide, from the bustling streets of Karachi to the serene valleys of the north. For our international customers, we offer a growing selection of digital products, accessible from anywhere in the world.
                    </p>
                    <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">Our Promise</h2>
                    <p>
                        At huzi.pk, customer satisfaction is our top priority. We are dedicated to providing a seamless shopping experience, from browsing our user-friendly website to the moment your order arrives at your doorstep. We are more than just a store; we are a community of fashion enthusiasts, and we are thrilled to have you with us.
                    </p>
                </div>
            </div>
        </div>
    );
}