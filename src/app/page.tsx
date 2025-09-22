
import type { Metadata } from 'next';
import HomeWrapper from './home-wrapper';

export const metadata: Metadata = {
  title: "huzi.pk | Your Destination for Quality & Variety in Pakistan",
  description: "huzi.pk brings together quality, style, and innovation in one platform. From electronics and fashion to home essentials and digital goods, discover products that fit your lifestyle.",
};

export default function Home() {
  return <HomeWrapper />;
}
