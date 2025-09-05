
import { Metadata } from "next";
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with huzi.pk. We're here to help with any questions about our products, orders, or services. Reach out via email, phone, or our contact form.",
};

const ContactClient = dynamic(() => import('./contact-client'), {
  loading: () => (
    <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
            <Skeleton className="h-10 w-1/2 mx-auto mb-8" />
            <Skeleton className="h-6 w-3/4 mx-auto mb-12" />
            <div className="grid md:grid-cols-2 gap-8 text-center mb-16">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
            </div>
            <div className="max-w-2xl mx-auto">
                <Skeleton className="h-96 w-full" />
            </div>
        </div>
    </div>
  ),
  ssr: false
});


export default function ContactPage() {
    return <ContactClient />;
}
