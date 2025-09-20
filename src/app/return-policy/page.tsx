
import { Metadata } from 'next';
import ReturnPolicyWrapper from './return-policy-wrapper';

export const metadata: Metadata = {
    title: 'Return & Refund Policy',
    description: 'Read the return and refund policy for huzi.pk. Learn about the conditions for returns, the process, and our commitment to customer satisfaction.'
};

export default function ReturnPolicyPage() {
    return <ReturnPolicyWrapper />;
}
