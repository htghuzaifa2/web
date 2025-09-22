
import { Metadata } from "next";
import CheckoutWrapper from "./checkout-wrapper";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your purchase securely. Provide your shipping details and finalize your order from huzi.pk.",
  openGraph: {
    title: "Checkout",
    description: "Complete your purchase securely at huzi.pk.",
    url: "/checkout",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutPage() {
  return <CheckoutWrapper />;
}
