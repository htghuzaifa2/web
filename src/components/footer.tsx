import Link from "next/link";
import { Shirt, Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Shirt className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold font-headline">huzi.pk</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your destination for premium quality modern clothing. Delivering physical products across Pakistan and digital products worldwide.
            </p>
            <div className="text-sm text-muted-foreground">
                <p>123 Fashion Ave, Karachi, Pakistan</p>
                <p>contact@huzi.pk</p>
            </div>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">Categories</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/category/shirts" className="text-muted-foreground hover:text-primary transition-colors">Shirts</Link></li>
              <li><Link href="/category/pants" className="text-muted-foreground hover:text-primary transition-colors">Pants</Link></li>
              <li><Link href="/category/jackets" className="text-muted-foreground hover:text-primary transition-colors">Jackets</Link></li>
              <li><Link href="/category/shoes" className="text-muted-foreground hover:text-primary transition-colors">Shoes</Link></li>
              <li><Link href="/category/accessories" className="text-muted-foreground hover:text-primary transition-colors">Accessories</Link></li>
              <li><Link href="/category/digital-goods" className="text-muted-foreground hover:text-primary transition-colors">Digital Goods</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">Company</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">Follow Us</h3>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-transform hover:scale-110">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-transform hover:scale-110">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-transform hover:scale-110">
                <Instagram className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} huzi.pk. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
