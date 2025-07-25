import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy - huzi.pk",
    description: "Read the privacy policy for huzi.pk to understand how we collect, use, and protect your personal data.",
};

export default function PrivacyPolicyPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-center font-headline text-4xl font-bold mb-8">Privacy Policy</h1>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                    <p><strong>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></p>
                    
                    <p>
                        huzi.pk ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by huzi.pk.
                    </p>

                    <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">1. Information We Collect</h2>
                    <p>
                        We collect information from you when you visit our site, place an order, subscribe to our newsletter, or respond to a survey. The information we collect may include your name, email address, mailing address, phone number, and payment information.
                    </p>

                    <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">2. How We Use Your Information</h2>
                    <p>
                        Any of the information we collect from you may be used in one of the following ways:
                    </p>
                    <ul>
                        <li>To personalize your experience</li>
                        <li>To improve our website</li>
                        <li>To improve customer service</li>
                        <li>To process transactions</li>
                        <li>To send periodic emails</li>
                    </ul>

                    <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">3. How We Protect Your Information</h2>
                    <p>
                        We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.
                    </p>

                    <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">4. Cookies</h2>
                    <p>
                        We use cookies to help us remember and process the items in your shopping cart, understand and save your preferences for future visits, and compile aggregate data about site traffic and site interaction.
                    </p>

                    <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">5. Disclosure to Third Parties</h2>
                    <p>
                        We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
                    </p>

                    <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">Your Consent</h2>
                    <p>
                        By using our site, you consent to our website's privacy policy.
                    </p>

                    <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">Changes to our Privacy Policy</h2>
                    <p>
                        If we decide to change our privacy policy, we will post those changes on this page.
                    </p>
                </div>
            </div>
        </div>
    );
}