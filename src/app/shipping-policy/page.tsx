
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Shipping Policy",
    description: "Learn about our shipping policies. We charge a flat rate of PKR 250 for delivery across Pakistan.",
};

export const runtime = 'edge';

export default function ShippingPolicyPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-center font-headline text-4xl font-bold mb-8">Shipping Policy</h1>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                    <p>
                        Thank you for shopping at huzi.pk. Here you will find all the information regarding our shipping policies and procedures for deliveries across Pakistan.
                    </p>

                    <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">Shipping Charges</h2>
                    <p>
                        We offer a **flat shipping rate of PKR 250** on all orders across Pakistan, regardless of the number of items or the total weight of your order. The price you see for the products plus the flat shipping fee is the total amount you will pay.
                    </p>
                    
                    <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">Payment Methods</h2>
                    <p>
                        We are currently accepting payments via <strong>Easypaisa, Jazzcash, or Bank Transfer</strong>. All orders must be paid for in full at the time of purchase.
                    </p>

                    <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">Delivery Time</h2>
                    <p>
                        Orders are typically processed and dispatched within 1-2 business days. Delivery times vary based on your location in Pakistan but generally take between 7-11 business days.
                    </p>

                     <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">Questions</h2>
                    <p>
                        If you have any questions about our shipping policy, please don't hesitate to <Link href="/contact">contact us</Link>.
                    </p>
                </div>
            </div>
        </div>
    );
}
