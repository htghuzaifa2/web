
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { Badge } from "./ui/badge";

export function CartSheet() {
  const { items, removeFromCart, updateQuantity, total, itemCount } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 justify-center rounded-full p-0 text-xs">
              {itemCount}
            </Badge>
          )}
          <span className="sr-only">Shopping Cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>Shopping Cart ({itemCount})</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto">
          <ScrollArea className="h-full">
            <div className="pr-6">
              {items.length > 0 ? (
                <div className="flex flex-col gap-4 py-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <Link href={`/product/${item.category}/${item.slug}`} className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </Link>
                      <div className="flex-1">
                        <Link href={`/product/${item.category}/${item.slug}`} className="font-semibold hover:underline">
                          {item.name}
                        </Link>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-muted-foreground">
                            PKR {Math.round(item.price)}
                          </p>
                          <div className="flex items-center gap-2">
                             <div className="flex items-center gap-1">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">Your cart is empty.</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
        {items.length > 0 && (
          <SheetFooter className="border-t bg-background px-6 py-4">
            <div className="flex w-full flex-col gap-2">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>PKR {Math.round(total)}</span>
              </div>
              <Button asChild className="w-full">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
