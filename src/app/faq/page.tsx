
import { Metadata } from 'next';
import FaqLoader from './faq-loader';

export const metadata: Metadata = {
    title: "Frequently Asked Questions (FAQ)",
    description: "Find answers to common questions about shopping at huzi.pk, including shipping, payments, and our return policy.",
    openGraph: {
        title: "Frequently Asked Questions (FAQ)",
        description: "Find answers to common questions about shopping at huzi.pk, including shipping, payments, and our return policy.",
        url: "/faq",
    }
};

export default function FaqPage() {
    return <FaqLoader />;
}
