import type { Metadata } from 'next';
import TermsAndConditionsLoader from './terms-and-conditions-loader';

export const metadata: Metadata = {
    title: "Terms & Conditions - HTG",
    description: "Read our terms and conditions to understand the rules and guidelines for using HTG. We aim to provides a fair and transparent experience for all customers.",
    openGraph: {
        title: "Terms & Conditions - HTG",
        description: "Read our terms and conditions to understand the rules and guidelines for using HTG. We aim to provides a fair and transparent experience for all customers.",
        url: "/terms-and-conditions",
    }
};

export default function TermsAndConditionsPage() {
    return <TermsAndConditionsLoader />;
}
