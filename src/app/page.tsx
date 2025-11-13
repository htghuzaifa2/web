import HomeLoader from './home-loader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "huzi.pk | Quality & Style, Delivered in Pakistan",
  description: "Shop quality fashion, electronics, and digital goods at huzi.pk. Discover products that fit your lifestyle with reliable delivery in Pakistan.",
};


export default function Home() {
  return <HomeLoader />;
}
