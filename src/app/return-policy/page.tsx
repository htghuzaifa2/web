
import { Metadata } from 'next';
import ReturnPolicyLoader from './return-policy-loader';

export const metadata: Metadata = {
    title: "Return & Refund Policy",
    description: "Read the return and refund policy for huzi.pk. Understand the conditions for returning damaged, incorrect, or faulty items.",
    openGraph: {
        title: "Return & Refund Policy",
        description: "Read the return and refund policy for huzi.pk. Understand the conditions for returning damaged, incorrect, or faulty items.",
        url: "/return-policy",
    }
};

export default function ReturnPolicyPage() {
    return <ReturnPolicyLoader />;
}
