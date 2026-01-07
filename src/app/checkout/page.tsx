import CheckoutLoader from "./checkout-loader";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Checkout | HTG - Secure Payment",
  description: "Complete your purchase at HTG. Enter your shipping and payment details to securely place your order for delivery anywhere in Pakistan.",
  openGraph: {
    title: "Checkout - Secure Your Order",
    description: "Complete your purchase at HTG. Enter your shipping and payment details to securely place your order for delivery anywhere in Pakistan.",
    url: "/checkout",
  }
};

export default function CheckoutPage() {
  return <CheckoutLoader />;
}
