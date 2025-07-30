
import { Metadata } from "next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Frequently Asked Questions (FAQ) - huzi.pk",
    description: "Find answers to common questions about shopping at huzi.pk, including our shipping policy, payment methods, delivery times, and how to contact us.",
};

const faqData = [
    {
        question: "What are your shipping charges?",
        answer: "We offer a flat shipping rate of PKR 250 on all orders across Pakistan, no matter how many items you order."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We currently accept payments via Easypaisa, Jazzcash, or direct Bank Transfer. All orders must be paid for in full at the time of purchase."
    },
    {
        question: "How long does delivery take?",
        answer: "Orders are typically dispatched within 1-2 business days. Delivery usually takes between 7-11 business days, depending on your location in Pakistan."
    },
    {
        question: "Do you ship internationally?",
        answer: "Currently, we deliver physical products only within Pakistan. However, our digital products are available for purchase and download worldwide."
    },
    {
        question: "How can I contact customer service?",
        answer: "You can reach us through our contact page, by emailing us at contact@huzi.pk, or by calling us at +92 321 9486948. We're always happy to help!"
    },
    {
        question: "What is your return policy?",
        answer: "For information on returns and exchanges, please visit our Shipping Policy page or contact us directly with your order details."
    }
];

export default function FaqPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-center font-headline text-4xl font-bold mb-8">Frequently Asked Questions</h1>
                <p className="text-center text-lg text-muted-foreground mb-12">
                    Have questions? We've got answers. If you can't find what you're looking for, feel free to <Link href="/contact" className="text-primary hover:underline">contact us</Link>.
                </p>

                <Accordion type="single" collapsible className="w-full">
                    {faqData.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground prose">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}
