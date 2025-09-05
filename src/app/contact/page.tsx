
import { Metadata } from "next";
import ContactWrapper from "./contact-wrapper";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with huzi.pk. We're here to help with any questions about our products, orders, or services. Reach out via email, phone, or our contact form.",
};

export default function ContactPage() {
    return <ContactWrapper />;
}
