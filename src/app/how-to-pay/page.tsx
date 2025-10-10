
import { Metadata } from 'next';
import HowToPayLoader from './how-to-pay-loader';

export const metadata: Metadata = {
    title: "How to Pay",
    description: "Learn about the available payment methods at huzi.pk, including Bank Transfer, Easypaisa, and JazzCash.",
    openGraph: {
        title: "How to Pay",
        description: "Learn about the available payment methods at huzi.pk, including Bank Transfer, Easypaisa, and JazzCash.",
        url: "/how-to-pay",
    }
};

export default function HowToPayPage() {
    return <HowToPayLoader />;
}
