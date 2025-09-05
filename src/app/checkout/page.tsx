
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your purchase securely. Provide your shipping details and finalize your order from huzi.pk.",
};

const CheckoutClient = dynamic(() => import("./checkout-client"), {
  loading: () => (
     <div className="container mx-auto px-4 py-12">
        <Skeleton className="h-10 w-1/2 mx-auto mb-8" />
        <div className="grid lg:grid-cols-2 gap-12">
            <div className="lg:order-2 space-y-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
            </div>
            <div className="lg:order-1 space-y-6">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
        </div>
    </div>
  ),
  ssr: false
});

export default function CheckoutPage() {
  return <CheckoutClient />;
}
