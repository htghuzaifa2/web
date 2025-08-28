
import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { WhatsappIcon } from "@/app/layout";
import Image from "next/image";


export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
             <Link href="/" prefetch={false} className="inline-block text-2xl font-bold">
               huzi.pk
            </Link>
            <p className="text-sm text-muted-foreground">
              Your destination for premium quality modern clothing. Delivering physical products across Pakistan and digital products worldwide.
            </p>
            <div className="text-sm text-muted-foreground">
                <p>contact@huzi.pk</p>
            </div>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">Company</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/about" prefetch={false} className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" prefetch={false} className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/shipping-policy" prefetch={false} className="text-muted-foreground hover:text-primary transition-colors">Shipping Policy</Link></li>
              <li><Link href="/return-policy" prefetch={false} className="text-muted-foreground hover:text-primary transition-colors">Return Policy</Link></li>
              <li><Link href="/how-to-pay" prefetch={false} className="text-muted-foreground hover:text-primary transition-colors">How to Pay</Link></li>
              <li><Link href="/faq" prefetch={false} className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">Follow Us</h3>
            <div className="mt-4 flex space-x-4">
              <Link href="https://youtube.com/@huzi.pk_website?si=BtT-sxl2VxceXRa3" prefetch={false} target="_blank" rel="noopener noreferrer" aria-label="huzi.pk on Youtube" className="text-muted-foreground hover:text-primary transition-transform hover:scale-110">
                <Youtube className="h-6 w-6" />
              </Link>
              <Link href="https://www.facebook.com/profile.php?id=61576677910935" prefetch={false} target="_blank" rel="noopener noreferrer" aria-label="huzi.pk on Facebook" className="text-muted-foreground hover:text-primary transition-transform hover:scale-110">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="https://www.instagram.com/website_huzi.pk/profilecard/?igsh=am04eHZjcTBzMjFh" prefetch={false} target="_blank" rel="noopener noreferrer" aria-label="huzi.pk on Instagram" className="text-muted-foreground hover:text-primary transition-transform hover:scale-110">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="https://wa.me/message/BY3URMYOW3OMH1" prefetch={false} target="_blank" rel="noopener noreferrer" aria-label="huzi.pk on WhatsApp" className="text-muted-foreground hover:text-primary transition-transform hover:scale-110">
                 <WhatsappIcon className="h-6 w-6" />
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
