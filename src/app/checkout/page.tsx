
import CheckoutLoader from "./checkout-loader";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Checkout",
    description: "Complete your purchase at huzi.pk. Provide your shipping details to place your order.",
    openGraph: {
        title: "Checkout",
        description: "Complete your purchase at huzi.pk. Provide your shipping details to place your order.",
        url: "/checkout",
    }
};

export default function CheckoutPage() {
  return <CheckoutLoader />;
}
