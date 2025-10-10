
import type { Metadata } from 'next';
import AllProductsLoader from './all-products-loader';

export const metadata: Metadata = {
    title: "All Products",
    description: "Browse the complete collection of products available at huzi.pk. We deliver physical products all over Pakistan and digital products worldwide.",
    openGraph: {
        title: "All Products",
        description: "Browse the complete collection of products available at huzi.pk. We deliver physical products all over Pakistan and digital products worldwide.",
        url: "/all-products",
    }
};

export default function AllProductsPage() {
    return <AllProductsLoader />;
}
