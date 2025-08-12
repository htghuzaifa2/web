import CheckoutClient from "./checkout-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your purchase securely. Provide your shipping details and finalize your order from huzi.pk.",
};

export const runtime = 'edge';

export default function CheckoutPage() {
  return <CheckoutClient />;
}
