
import { Metadata } from "next";
import ContactLoader from "./contact-loader";

export const metadata: Metadata = {
    title: "Contact Us",
    description: "Get in touch with huzi.pk. We're here to help with any questions about our products, your order, or anything else.",
    openGraph: {
        title: "Contact Us",
        description: "Get in touch with huzi.pk. We're here to help with any questions about our products, your order, or anything else.",
        url: "/contact",
    }
};

export default function ContactPage() {
    return <ContactLoader />;
}
