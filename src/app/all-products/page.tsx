
import type { Metadata } from 'next';
import AllProductsClient from './all-products-client';

export const metadata: Metadata = {
    title: "All Products",
    description: "Browse the complete collection of products available at huzi.pk. We deliver physical products all over Pakistan and digital products worldwide.",
};

export default function AllProductsPage() {
    return <AllProductsClient />;
}
