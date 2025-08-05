
import { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with huzi.pk. We're here to help with any questions about our products, orders, or services. Reach out via email, phone, or our contact form.",
};

export default function ContactPage() {
    return <ContactClient />;
}
