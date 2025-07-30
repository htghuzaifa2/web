
import { Metadata } from "next";
import { Banknote, Smartphone, AlertTriangle, HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const metadata: Metadata = {
    title: "How to Pay - huzi.pk",
    description: "Find out how to pay for your order at huzi.pk. We accept Bank Transfers, JazzCash, and EasyPaisa for your convenience.",
};

export default function HowToPayPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-center font-headline text-4xl font-bold mb-4">Payment Methods</h1>
                <p className="text-center text-lg text-muted-foreground mb-12">
                   At huzi.pk, we want to make your shopping experience easy and stress-free. Once you’ve selected your products and placed your order, you can choose one of the following secure payment methods:
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                                <Banknote className="h-8 w-8 text-primary" />
                                <span>Bank Transfer</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-muted-foreground">
                            <p>Pay directly into our Meezan Bank account:</p>
                            <ul className="space-y-2 text-sm pl-4">
                                <li><strong>Bank:</strong> Meezan Bank Limited</li>
                                <li><strong>Account Title:</strong> Muhammad Huzaifa Tanveer</li>
                                <li><strong>Account Number:</strong> 0030 0112 4498 20</li>
                                <li><strong>IBAN:</strong> PK95MEZN0000300112449820</li>
                            </ul>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                                <Smartphone className="h-8 w-8 text-primary" />
                                <span>JazzCash / EasyPaisa</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-muted-foreground">
                           <p>Make payments conveniently via JazzCash or EasyPaisa:</p>
                            <ul className="space-y-2 text-sm pl-4">
                               <li><strong>Account Title:</strong> Muhammad Huzaifa Tanveer</li>
                               <li><strong>Account Number:</strong> 0321-9486948</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                <Card className="bg-muted/50 border-primary/50 mb-12">
                     <CardHeader>
                        <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                            <AlertTriangle className="h-8 w-8 text-destructive" />
                            <span>Important Notes</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-muted-foreground">
                       <p>Please wait for an availability confirmation message or call before making any advance payment.</p>
                       <p>After sending payment, please share your payment screenshot on WhatsApp: <strong className="text-foreground">0321-9486948</strong></p>
                    </CardContent>
                </Card>

                <div className="text-center">
                    <HelpCircle className="h-8 w-8 mx-auto text-primary mb-2" />
                    <h3 className="font-headline text-xl font-semibold">Need Help?</h3>
                    <p className="text-muted-foreground mt-2">
                        For any queries about payments or your order, contact us anytime: <Link href="mailto:contact@huzi.pk" className="text-primary hover:underline">contact@huzi.pk</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
