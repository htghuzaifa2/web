import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shipping Policy - huzi.pk",
    description: "Learn about our shipping policies, delivery charges, and payment methods at huzi.pk. We deliver nationwide across Pakistan.",
};

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
                        Our standard shipping charge for most orders is a flat rate of **PKR 300**.
                    </p>
                    <p>
                        However, please note that this is a base rate. Shipping costs are calculated based on the weight and dimensions of your order.
                    </p>
                    <ul>
                        <li><strong>Standard Weight:</strong> For many of our items, we can ship 3-4 products together for the standard rate of PKR 300. This is ideal for lightweight products like t-shirts or accessories.</li>
                        <li><strong>Heavy Items:</strong> For products that are heavier or bulkier, such as jackets or shoes, the shipping cost may increase. The final shipping cost will be calculated at checkout.</li>
                    </ul>

                    <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">Payment Methods</h2>
                    <p>
                        To streamline our order process and ensure security, we are currently only accepting online payments.
                    </p>
                    <p>
                        <strong>Please note: We do not offer Cash on Delivery (COD) at this time.</strong> All orders must be paid for in full at the time of purchase through our available online payment gateways.
                    </p>

                    <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">Delivery Time</h2>
                    <p>
                        Orders are typically processed and dispatched within 1-2 business days. Delivery times vary based on your location in Pakistan but generally take between 3-7 business days.
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
