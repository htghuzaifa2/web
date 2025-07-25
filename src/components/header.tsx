"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CartSheet } from "./cart-sheet";
import { LogoIcon } from "./icons";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <LogoIcon className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block font-headline">
              huzi.pk
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="md:hidden">
             <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="pr-0">
                  <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                     <LogoIcon className="h-6 w-6" />
                     <span className="font-bold font-headline">huzi.pk</span>
                  </Link>
                  <nav className="flex flex-col space-y-4">
                  {navLinks.map(({ href, label }) => (
                    <Link key={label} href={href} className="text-sm font-medium transition-colors hover:text-primary">
                      {label}
                    </Link>
                  ))}
                  </nav>
                </SheetContent>
              </Sheet>
          </div>
          <Link href="/" className="flex items-center space-x-2 md:hidden">
            <LogoIcon className="h-6 w-6" />
            <span className="font-bold font-headline">huzi.pk</span>
          </Link>
          <div className="flex items-center">
            <CartSheet />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
