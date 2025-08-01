
"use client";

import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CartSheet } from "./cart-sheet";
import { SearchDialog } from "./search-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";


const mainNavLinks = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const moreNavLinks = [
    { href: "/shipping-policy", label: "Shipping Policy" },
    { href: "/how-to-pay", label: "How to Pay" },
    { href: "/faq", label: "FAQ" },
];

const allNavLinks = [...mainNavLinks, ...moreNavLinks];


export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center flex-wrap">
          <div className="block sm:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <SheetHeader>
                  <SheetTitle className="sr-only">Main Menu</SheetTitle>
                </SheetHeader>
                <Link href="/" className="mr-6 mb-6 flex items-center font-bold text-lg">
                  huzi.pk
                </Link>
                <nav className="flex flex-col space-y-2">
                  {allNavLinks.map(({ href, label }) => (
                    <SheetClose asChild key={label}>
                      <Link href={href} className="px-4 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md">
                        {label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <Link href="/" className="hidden xxs:flex sm:mr-6 items-center font-bold text-xl">
             huzi.pk
          </Link>
        </div>
        
        <nav className="hidden sm:flex items-center space-x-6 text-sm font-medium">
          {mainNavLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {label}
            </Link>
          ))}
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="transition-colors hover:text-foreground/80 text-foreground/60 px-0">
                More
                <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {moreNavLinks.map(({ href, label }) => (
                <DropdownMenuItem key={label} asChild>
                  <Link href={href}>{label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
         <nav className="hidden xs:flex sm:hidden items-center space-x-4 text-sm font-medium ml-4">
            <Link
              href="/categories"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Categories
            </Link>
        </nav>
        
        <div className="flex flex-1 items-center justify-end space-x-1 sm:space-x-2">
          <div className="flex items-center">
            <SearchDialog />
            <CartSheet />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
