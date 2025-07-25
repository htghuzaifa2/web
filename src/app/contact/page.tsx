import { Metadata } from "next";
import { Mail, Phone } from "lucide-react";

export const metadata: Metadata = {
    title: "Contact Us - huzi.pk",
    description: "Get in touch with huzi.pk. Find our contact details and send us a message for any inquiries.",
};

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-center font-headline text-4xl font-bold mb-8">Contact Us</h1>
                <p className="text-center text-lg text-muted-foreground mb-12">
                    We'd love to hear from you! Whether you have a question about our products, an order, or just want to say hello, feel free to reach out.
                </p>

                <div className="flex justify-center">
                    <div className="grid md:grid-cols-2 gap-8 text-center max-w-2xl">
                        <div className="flex flex-col items-center p-6 bg-muted/50 rounded-lg">
                            <Mail className="h-10 w-10 text-primary mb-4" />
                            <h2 className="font-headline text-xl font-semibold mb-2">Email Us</h2>
                            <a href="mailto:contact@huzi.pk" className="text-primary hover:underline">contact@huzi.pk</a>
                        </div>
                        <div className="flex flex-col items-center p-6 bg-muted/50 rounded-lg">
                            <Phone className="h-10 w-10 text-primary mb-4" />
                            <h2 className="font-headline text-xl font-semibold mb-2">Call Us</h2>
                            <p className="text-muted-foreground">+92 321 9486948</p>
                        </div>
                    </div>
                </div>

                {/* A simple placeholder for a contact form */}
                <div className="mt-16">
                    <h2 className="text-center font-headline text-3xl font-bold mb-8">Send us a Message</h2>
                    <div className="max-w-lg mx-auto p-8 border rounded-lg bg-card text-card-foreground shadow-sm">
                        <p className="text-center text-muted-foreground">
                            For a more detailed inquiry, please use our contact form which is coming soon. In the meantime, please use the contact methods above or our live WhatsApp chat.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
