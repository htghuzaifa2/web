import { Metadata } from "next";
import ContactLoader from "./contact-loader";

export const metadata: Metadata = {
    title: "Contact HTG - WhatsApp & Customer Support",
    description: "Get in touch with HTG via WhatsApp, email, or phone. Expert support for your premium clothing orders, sizing queries, and returns.",
    openGraph: {
        title: "Contact HTG - WhatsApp & Customer Support",
        description: "Get in touch with HTG via WhatsApp, email, or phone. Expert support for your premium clothing orders, sizing queries, and returns.",
        url: "/contact",
    }
};

export default function ContactPage() {
    return <ContactLoader />;
}
