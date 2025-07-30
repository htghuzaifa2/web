
"use client";

import { useCart } from "@/context/cart-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


const checkoutSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  address: z.string().min(10, { message: "Address must be at least 10 characters." }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { items, total } = useCart();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  
  const shippingFee = 250;
  const finalTotal = total + shippingFee;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    const myWhatsAppNumber = "923219486948"; // Replace with your WhatsApp number

    let message = `*New Order from huzi.pk*\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${data.name}\n`;
    message += `Phone: ${data.phone}\n`;
    message += `Email: ${data.email}\n`;
    message += `Address: ${data.address}\n\n`;
    message += `*Order Summary:*\n`;

    items.forEach(item => {
      message += `- ${item.name} (x${item.quantity}) - PKR ${Math.round(item.price * item.quantity)}\n`;
    });
    
    message += `\nSubtotal: PKR ${Math.round(total)}\n`;
    message += `Shipping: PKR ${shippingFee}\n`;
    message += `*Total: PKR ${Math.round(finalTotal)}*\n\n`;
    message += `Please confirm payment method (Easypaisa, Jazzcash, or Bank Transfer).`;

    const whatsappUrl = `https://wa.me/${myWhatsAppNumber}?text=${encodeURIComponent(message)}`;
    
    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  if (!isClient) {
    return null; // Or a loading spinner
  }
  
  if (items.length === 0) {
      return (
        <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="font-headline text-3xl font-bold">Your Cart is Empty</h1>
            <p className="mt-4 text-muted-foreground">You have no items in your cart to check out.</p>
            <Button asChild className="mt-6">
                <Link href="/">Continue Shopping</Link>
            </Button>
        </div>
      )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-center font-headline text-4xl font-bold mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-2 lg:gap-12 gap-8">
        <div className="lg:order-2">
           <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        </div>
                    </div>
                    <p className="font-medium">PKR {Math.round(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <Separator className="my-6" />
              <div className="space-y-2">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>PKR {Math.round(total)}</p>
                  </div>
                   <div className="flex justify-between">
                    <p>Shipping Fee</p>
                    <p>PKR {shippingFee}</p>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <p>Total</p>
                    <p>PKR {Math.round(finalTotal)}</p>
                  </div>
              </div>
              <div className="mt-4 text-sm text-muted-foreground text-center">
                  You will be redirected to WhatsApp to confirm your order.
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:order-1">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
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
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" {...field} />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Your email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Shipping Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your complete address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" size="lg">Place Order on WhatsApp</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
