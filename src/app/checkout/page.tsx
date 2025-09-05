
import { Metadata } from "next";
import CheckoutWrapper from "./checkout-wrapper";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your purchase securely. Provide your shipping details and finalize your order from huzi.pk.",
};

export default function CheckoutPage() {
  return <CheckoutWrapper />;
}
