import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import { SVGProps } from "react";

function WhatsappIcon(props: SVGProps<SVGSVGElement>) {
    return (
      <svg 
        {...props}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 48 48"
        width="24px" 
        height="24px"
        fill="currentColor"
      >
        <path fill="#fff" d="M4.868,43.313c-0.052,0-0.104-0.01-0.158-0.021C4.6,43.256,4.5,43.159,4.455,43.054 l-1.112-5.131c-0.542-2.495-0.45-5.23,0.27-7.82c1.428-5.143,4.425-9.625,8.889-12.953c4.455-3.32,9.835-5.07,15.341-5.07 c11.836,0,21.49,9.654,21.49,21.49c0,11.836-9.654,21.49-21.49,21.49c-3.414,0-6.75-0.814-9.71-2.368L4.98,43.313 C4.945,43.313,4.907,43.313,4.868,43.313z"></path><path fill="#fff" d="M28.108,31.328c-0.844-0.422-1.632-0.781-2.355-1.093c-0.643-0.276-1.24-0.41-1.766,0.51 s-1.063,1.688-1.3,1.969c-0.234,0.281-0.586,0.344-0.969,0.203c-2.734-0.992-5.125-2.617-7.148-4.828 c-1.57-1.742-2.734-3.828-3.031-4.484c-0.297-0.656-0.023-1.008,0.25-1.305c0.234-0.25,0.523-0.641,0.797-0.859 c0.273-0.219,0.547-0.438,0.734-0.766c0.188-0.328,0.094-0.656-0.102-1.078c-0.195-0.422-1.328-3.188-1.633-3.859 c-0.305-0.672-0.609-0.57-0.898-0.57c-0.258,0-0.563,0-0.859,0c-0.297,0-0.82,0.117-1.242,0.555 c-0.422,0.438-1.633,1.594-1.633,3.875 c0,2.281,1.672,4.492,1.914,4.828c0.242,0.336,3.281,5.25,8.109,7.164 c3.93,1.539,5.25,1.211,6.016,1.133 c1.242-0.125,2.781-1.133,3.172-2.203c0.391-1.07,0.391-1.984,0.273-2.203 C30.012,31.789,29.3,31.547,28.108,31.328z"></path><path fill="#40c351" d="M24.032,12.083c11.836,0,21.49,9.654,21.49,21.49c0,11.836-9.654,21.49-21.49,21.49 c-3.414,0-6.75-0.814-9.71-2.368L4.98,43.313c-0.035,0-0.073,0-0.112,0c-0.052,0-0.104-0.01-0.158-0.021 c-0.114-0.037-0.211-0.104-0.273-0.203s-0.078-0.219-0.047-0.336l1.112-5.131c0.542-2.495,0.45-5.23-0.27-7.82 c-1.428-5.143-4.425-9.625-8.889-12.953c-4.455-3.32-9.835-5.07-15.341-5.07h0.008c0.003-0.001,0.007-0.001,0.01-0.001 C12.232,12.083,24.032,12.083,24.032,12.083z"></path><path fill="#fff" d="M33.472,21.183c-1.398-2.375-3.344-4.344-5.727-5.766c-2.383-1.422-5.047-2.18-7.773-2.18 c-8.742,0-15.844,7.102-15.844,15.844c0,2.734,0.695,5.461,2.094,7.852l-1.3,6.016l6.164-1.617 c2.359,1.258,4.984,1.914,7.688,1.914h0.008c8.742,0,15.844-7.102,15.844-15.844C35.66,26.214,34.887,23.565,33.472,21.183z M28.108,31.328c-0.844-0.422-1.632-0.781-2.355-1.093c-0.643-0.276-1.24-0.41-1.766,0.51s-1.063,1.688-1.3,1.969 c-0.234,0.281-0.586,0.344-0.969,0.203c-2.734-0.992-5.125-2.617-7.148-4.828c-1.57-1.742-2.734-3.828-3.031-4.484 c-0.297-0.656-0.023-1.008,0.25-1.305c0.234-0.25,0.523-0.641,0.797-0.859c0.273-0.219,0.547-0.438,0.734-0.766 c0.188-0.328,0.094-0.656-0.102-1.078c-0.195-0.422-1.328-3.188-1.633-3.859c-0.305-0.672-0.609-0.57-0.898-0.57 c-0.258,0-0.563,0-0.859,0c-0.297,0-0.82,0.117-1.242,0.555c-0.422,0.438-1.633,1.594-1.633,3.875 c0,2.281,1.672,4.492,1.914,4.828c0.242,0.336,3.281,5.25,8.109,7.164c3.93,1.539,5.25,1.211,6.016,1.133 c1.242-0.125,2.781-1.133,3.172-2.203c0.391-1.07,0.391-1.984,0.273-2.203C30.012,31.789,29.3,31.547,28.108,31.328z"></path>
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
              <Link href="#" className="text-muted-foreground hover:text-primary transition-transform hover:scale-110">
                <Youtube className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-transform hover:scale-110">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-transform hover:scale-110">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-transform hover:scale-110">
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
