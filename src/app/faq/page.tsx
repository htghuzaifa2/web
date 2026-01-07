import { Metadata } from 'next';
import FaqLoader from './faq-loader';

export const metadata: Metadata = {
    title: "FAQ - Frequently Asked Questions | HTG",
    description: "Find answers to common questions about HTG. Learn about shipping, payments, returns, and how to place an order. Your questions, answered.",
    openGraph: {
        title: "FAQ - Frequently Asked Questions | HTG",
        description: "Find answers to common questions about HTG. Learn about shipping, payments, returns, and how to place an order. Your questions, answered.",
        url: "/faq",
    }
};

export default function FaqPage() {
    return <FaqLoader />;
}
