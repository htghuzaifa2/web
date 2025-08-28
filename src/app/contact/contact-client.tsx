
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactClient() {
    const { toast } = useToast();

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    const onSubmit = (data: ContactFormValues) => {
        const myWhatsAppNumber = "923219486948";
        let message = `*New Contact Inquiry from huzi.pk*\n\n`;
        message += `*Name:* ${data.name}\n`;
        message += `*Email:* ${data.email}\n`;
        message += `*Message:*\n${data.message}`;

        const whatsappUrl = `https://wa.me/${myWhatsAppNumber}?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
        
        toast({
          title: "Message Prepared",
          description: "Please send the message in WhatsApp to complete your inquiry.",
        });

        form.reset();
    };


    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-center font-headline text-4xl font-bold mb-8">Contact Us</h1>
                <p className="text-center text-lg text-muted-foreground mb-12">
                    We'd love to hear from you! Whether you have a question about our products, an order, or just want to say hello, feel free to reach out.
                </p>

                <div className="grid md:grid-cols-2 gap-8 text-center">
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

                <div className="mt-16">
                    <Card className="max-w-2xl mx-auto">
                        <CardHeader>
                            <CardTitle className="text-center font-headline text-3xl">Send us a Message</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                             <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Your full name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email Address</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="Your email address" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Your Message</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Type your message here..." {...field} rows={5} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="w-full" size="lg">Send Message via WhatsApp</Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
