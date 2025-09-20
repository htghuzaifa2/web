
import { Metadata } from 'next';
import HowToPayWrapper from './how-to-pay-wrapper';

export const metadata: Metadata = {
    title: 'How to Pay',
    description: 'Learn about the available payment methods at huzi.pk, including Bank Transfer, JazzCash, and EasyPaisa.'
};

export default function HowToPayPage() {
    return <HowToPayWrapper />;
}
