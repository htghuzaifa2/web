
"use client";

import Link from "next/link";

export default function ReturnPolicyClient() {
    return (
        <div className="container mx-auto px-4 py-12 content-fade-in">
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
                        <li>The item is damaged during shipping or has a manufacturing defect.</li>
                        <li>The item is incorrect and does not match the product you ordered.</li>
                        <li>The item is not working correctly as described.</li>
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
                        To initiate a return for a damaged, incorrect, or faulty item, please <Link href="/contact">contact our customer service team</Link> with your order number and clear photos or a video showing the issue. We will guide you through the next steps.
                    </p>
                    
                    <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">Our Full Refund Promise</h2>
                    <p>
                        We stand by the quality of our products and want you to shop with complete confidence. Once your return is approved and we receive the returned item, we will process your refund. Our commitment to you is a complete and hassle-free refund:
                    </p>
                     <ul>
                        <li><strong className="text-foreground">Full Refund Amount:</strong> We will refund the entire amount of your order, including the original delivery charges and any Cash on Delivery (COD) fees paid.</li>
                        <li><strong className="text-foreground">Return Shipping Covered:</strong> We will also reimburse you for the courier charges you incur to send the product back to us. Your refund will be a full, no-cost-to-you transaction.</li>
                    </ul>
                    <p>
                        The refund will be processed through a mutually agreed-upon method, such as a bank transfer or mobile wallet.
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
