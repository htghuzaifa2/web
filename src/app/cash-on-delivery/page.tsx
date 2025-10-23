
import { Metadata } from 'next';
import CashOnDeliveryLoader from './cash-on-delivery-loader';

export const metadata: Metadata = {
    title: "Cash on Delivery (COD) Policy",
    description: "Learn about the Cash on Delivery (COD) option at huzi.pk, including the process, fees, and how to place an order.",
    openGraph: {
        title: "Cash on Delivery (COD) Policy",
        description: "Learn about the Cash on Delivery (COD) option at huzi.pk, including the process, fees, and how to place an order.",
        url: "/cash-on-delivery",
    }
};

export default function CashOnDeliveryPage() {
    return <CashOnDeliveryLoader />;
}
