import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import { SVGProps } from "react";

function WhatsappIcon(props: SVGProps<SVGSVGElement>) {
    return (
      <svg 
        {...props}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path 
          d="M16.6,14.2l-1.5-0.7c-0.3-0.1-0.5-0.1-0.7,0.1l-0.6,0.8c-1.4-0.8-2.6-2-3.4-3.4l0.8-0.6c0.2-0.2,0.3-0.5,0.1-0.7l-0.7-1.5 c-0.2-0.3-0.5-0.5-0.8-0.5h-1C7.6,7.5,7.3,7.7,7.2,8C7,8.8,7.3,9.8,8,11.1c1.1,2.1,2.9,3.9,5,5c1.3,0.7,2.2,1,3.1,0.8 c0.3-0.1,0.5-0.4,0.5-0.7v-1C17.1,14.7,16.9,14.3,16.6,14.2z M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10c5.5,0,10-4.5,10-10S17.5,2,12,2 M12,20.5c-4.7,0-8.5-3.8-8.5-8.5S7.3,3.5,12,3.5s8.5,3.8,8.5,8.5S16.7,20.5,12,20.5"
        />
      </svg>
    )
  }

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold font-headline">huzi.pk</span>
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
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/shipping-policy" className="text-muted-foreground hover:text-primary transition-colors">Shipping Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">Follow Us</h3>
            <div className="mt-4 flex space-x-4">
              <Link href="https://youtube.com/@huzi.pk_website?si=BtT-sxl2VxceXRa3" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-transform hover:scale-110">
                <Youtube className="h-6 w-6" />
              </Link>
              <Link href="https://www.facebook.com/profile.php?id=61576677910935" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-transform hover:scale-110">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="https://www.instagram.com/website_huzi.pk/profilecard/?igsh=am04eHZjcTBzMjFh" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-transform hover:scale-110">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="https://wa.me/message/BY3URMYOW3OMH1" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-transform hover:scale-110">
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
