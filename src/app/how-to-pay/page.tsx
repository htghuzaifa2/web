
"use client";

import { Metadata } from "next";
import { Banknote, Smartphone, AlertTriangle, HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function HowToPayPage() {
    return (
        <div className="container mx-auto px-4 py-12 content-fade-in">
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
                        <CardContent className="space-y-4 text-muted-foreground p-6">
                            <div>
                                <p className="font-semibold text-foreground">Bank</p>
                                <p>Meezan Bank Limited</p>
                            </div>
                            <div>
                                <p className="font-semibold text-foreground">Account Title</p>
                                <p>Muhammad Huzaifa Tanveer</p>
                            </div>
                            <div>
                                <p className="font-semibold text-foreground">Account Number</p>
                                <p className="font-mono text-base tracking-wider">00300112449820</p>
                            </div>
                             <div>
                                <p className="font-semibold text-foreground">IBAN</p>
                                <p className="font-mono text-base tracking-wider">PK95MEZN0000300112449820</p>
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                                <Smartphone className="h-8 w-8 text-primary" />
                                <span>JazzCash / EasyPaisa</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground p-6">
                           <div>
                                <p className="font-semibold text-foreground">Account Title</p>
                                <p>Muhammad Huzaifa Tanveer</p>
                            </div>
                            <div>
                                <p className="font-semibold text-foreground">Account Number</p>
                                <p className="font-mono text-base tracking-wider">0321-9486948</p>
                            </div>
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
                    <CardContent className="space-y-3 text-muted-foreground p-6">
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
