
import { Metadata } from 'next';
import ShippingPolicyWrapper from './shipping-policy-wrapper';

export const metadata: Metadata = {
    title: 'Shipping Policy',
    description: 'Learn about the shipping policy at huzi.pk, including our flat-rate shipping charges, payment methods, and estimated delivery times across Pakistan.'
};


export default function ShippingPolicyPage() {
    return <ShippingPolicyWrapper />;
}
