
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Return & Refund Policy",
    description: "Understand the return and refund policy at huzi.pk. Learn about the conditions for returning a wrong or damaged item within 3 days of delivery.",
};

export const runtime = 'edge';

export default function ReturnPolicyPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-center font-headline text-4xl font-bold mb-8">Return & Refund Policy</h1>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                    <p>
                        At huzi.pk, we are committed to ensuring our customers are satisfied with their purchases. Please read our return policy carefully to understand the conditions under which returns are processed.
                    </p>

                    <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">Conditions for a Return</h2>
                    <p>
                        We accept returns only if the item you received meets one of the following conditions:
                    </p>
                    <ul>
                        <li>The item is damaged or not working correctly.</li>
                        <li>The item is incorrect or does not match the product you ordered.</li>
                    </ul>

                    <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">Conditions Not Eligible for Return</h2>
                    <p>
                        We do not accept returns or provide refunds if you have simply changed your mind about a product. We encourage you to review your order carefully before purchasing.
                    </p>

                    <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">Return Timeframe</h2>
                    <p>
                        If your item is eligible for a return, you must notify us within **3 days** of receiving your parcel. Any claims made after this period will not be accepted.
                    </p>
                    
                    <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">How to Initiate a Return</h2>
                    <p>
                        To initiate a return for a damaged or incorrect item, please <Link href="/contact">contact our customer service team</Link> with your order number and clear photos or a video showing the issue. We will guide you through the next steps.
                    </p>
                    
                    <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">Refund Process</h2>
                    <p>
                        Once your return is approved and the item has been received and inspected by us, we will process your refund. The amount will be returned through the original payment method or another mutually agreed-upon method.
                    </p>
                    
                    <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">Questions</h2>
                    <p>
                        If you have any questions about our return policy, please don't hesitate to <Link href="/contact">contact us</Link>.
                    </p>
                </div>
            </div>
        </div>
    );
}
