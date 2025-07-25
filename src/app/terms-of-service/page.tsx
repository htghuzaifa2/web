import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service - huzi.pk",
    description: "Read the terms of service for using the huzi.pk website and purchasing products.",
};

export default function TermsOfServicePage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-center font-headline text-4xl font-bold mb-8">Terms of Service</h1>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                    <p><strong>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></p>

                    <p>
                        Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the huzi.pk website (the "Service") operated by huzi.pk ("us", "we", or "our").
                    </p>
                    <p>
                        Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
                    </p>

                    <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">1. Accounts</h2>
                    <p>
                        When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                    </p>

                    <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">2. Intellectual Property</h2>
                    <p>
                        The Service and its original content, features, and functionality are and will remain the exclusive property of huzi.pk and its licensors.
                    </p>

                    <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">3. Links To Other Web Sites</h2>
                    <p>
                        Our Service may contain links to third-party web sites or services that are not owned or controlled by huzi.pk. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party web sites or services.
                    </p>

                    <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">4. Termination</h2>
                    <p>
                        We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                    </p>

                    <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">5. Governing Law</h2>
                    <p>
                        These Terms shall be governed and construed in accordance with the laws of Pakistan, without regard to its conflict of law provisions.
                    </p>

                    <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">Changes</h2>
                    <p>
                        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect.
                    </p>

                    <h2 className="font-headline text-2xl font-bold mt-8 mb-4 text-foreground">Contact Us</h2>
                    <p>
                        If you have any questions about these Terms, please contact us.
                    </p>
                </div>
            </div>
        </div>
    );
}