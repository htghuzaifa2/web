
import { Metadata } from 'next';
import FaqWrapper from './faq-wrapper';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Find answers to common questions about shopping at huzi.pk, including shipping, payments, and returns.'
};

export default function FaqPage() {
    return <FaqWrapper />;
}
