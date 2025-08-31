
import type { Metadata } from 'next';
import AboutClient from './about-client';

export const metadata: Metadata = {
    title: "About Us - Our Story & Values",
    description: "Discover the story behind huzi.pk. Learn about our mission to bring quality, style, and customer-first innovation to online shopping in Pakistan.",
};

export default function AboutPage() {
    return <AboutClient />;
}

