
import { Metadata } from 'next';
import ShippingPolicyLoader from './shipping-policy-loader';

export const metadata: Metadata = {
    title: "Shipping Policy",
    description: "Learn about the shipping policy at huzi.pk, including our flat shipping rate and estimated delivery times within Pakistan.",
    openGraph: {
        title: "Shipping Policy",
        description: "Learn about the shipping policy at huzi.pk, including our flat shipping rate and estimated delivery times within Pakistan.",
        url: "/shipping-policy",
    }
};

export default function ShippingPolicyPage() {
    return <ShippingPolicyLoader />;
}
