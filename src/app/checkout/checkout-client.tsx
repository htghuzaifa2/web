
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import locationData from "@/data/locations.json";

const checkoutSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().min(1, { message: "Phone number is required." }).regex(/^\+?[0-9]+$/, { message: "Phone number can only contain digits and an optional leading '+'." }),
  email: z.string().email({ message: "Invalid email format." }).or(z.literal("")).optional(),
  province: z.string({ required_error: "Please select a province." }),
  city: z.string({ required_error: "Please select a city." }),
  address: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutClient() {
  const { items, total } = useCart();
  const [isClient, setIsClient] = useState(false);
  
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

  const selectedProvince = form.watch("province");
  const cities = locationData.provinces.find(p => p.name === selectedProvince)?.cities || [];

  useEffect(() => {
    // Reset city when province changes
    if (form.getValues("province")) {
        form.setValue("city", "");
    }
  }, [selectedProvince, form]);


  const onSubmit = (data: CheckoutFormValues) => {
    const myWhatsAppNumber = "923219486948";

    let message = `*New Order from huzi.pk*\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${data.name}\n`;
    message += `Phone: ${data.phone}\n`;
    if (data.email) {
      message += `Email: ${data.email}\n`;
    }
    if (data.address) {
      message += `Address: ${data.address}\n`;
    }
    message += `City: ${data.city}\n`;
    message += `Province: ${data.province}\n\n`;
    message += `*Order Summary:*\n`;

    items.forEach(item => {
      message += `- ${item.name} (ID: ${item.id}) (x${item.quantity}) - PKR ${Math.round(item.price * item.quantity)}\n`;
    });
    
    message += `\nSubtotal: PKR ${Math.round(total)}\n`;
    message += `Shipping: PKR ${shippingFee}\n`;
    message += `*Total: PKR ${Math.round(finalTotal)}*\n\n`;
    message += `Please confirm payment method (Easypaisa, Jazzcash, or Bank Transfer).`;

    const whatsappUrl = `https://wa.me/${myWhatsAppNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  if (!isClient) {
    return (
        <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="font-headline text-3xl font-bold">Loading Checkout...</h1>
            <p className="mt-4 text-muted-foreground">Please wait a moment while we prepare your order summary.</p>
        </div>
    );
  }
  
  if (items.length === 0) {
      return (
        <div className="container mx-auto px-4 py-12 text-center content-fade-in">
            <h1 className="font-headline text-3xl font-bold">Your Cart is Empty</h1>
            <p className="mt-4 text-muted-foreground">You have no items in your cart to check out.</p>
            <Button asChild className="mt-6">
                <Link href="/">Continue Shopping</Link>
            </Button>
        </div>
      )
  }

  return (
    <div className="container mx-auto px-4 py-12 content-fade-in">
      <h1 className="text-center font-headline text-4xl font-bold mb-8">Checkout</h1>
      <div className="grid lg:grid-cols-2 lg:gap-12 gap-8">
        <div className="lg:order-2">
           <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain"
                            sizes="64px"
                          />
                        </div>
                        <div>
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        </div>
                    </div>
                    <p className="font-medium text-price">{`PKR ${Math.round(item.price * item.quantity)}`}</p>
                  </div>
                ))}
              </div>
              <Separator className="my-6" />
              <div className="space-y-2">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p className="font-medium text-price">{`PKR ${Math.round(total)}`}</p>
                  </div>
                   <div className="flex justify-between">
                    <p>Shipping</p>
                    <p className="font-medium text-price">{`PKR ${shippingFee}`}</p>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <p>Total</p>
                    <p className="text-price">{`PKR ${Math.round(finalTotal)}`}</p>
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
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            type="text" 
                            inputMode="tel"
                            placeholder="Your phone number" 
                            {...field} 
                          />
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
                        <FormLabel>Email Address (Optional)</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Your email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="province"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Province</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a province" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {locationData.provinces.map(province => (
                                    <SelectItem key={province.name} value={province.name}>{province.name}</SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>City</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value} disabled={!selectedProvince}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a city" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {cities.map(city => (
                                    <SelectItem key={city} value={city}>{city}</SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Shipping Address (Optional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="House #, Street, Area..." {...field} />
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
