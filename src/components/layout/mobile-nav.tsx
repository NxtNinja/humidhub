"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, CloudSun } from "lucide-react";

import {
  Sheet,
  SheetTitle,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetClose,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { navigation } from "@/config/navigation";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="sm:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          showCloseButton={false}
          className="w-70 border-0 p-0 bg-background"
        >
          {/* Header */}
          <SheetHeader className="px-6 pt-6 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CloudSun className="h-5 w-5 text-foreground" />
                <SheetTitle className="text-base font-semibold tracking-tight">
                  HumidHub
                </SheetTitle>
              </div>
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </SheetClose>
            </div>
          </SheetHeader>

          {/* Divider */}
          <div className="h-px bg-border mx-6" />

          {/* Nav items */}
          <nav className="px-3 pt-4 flex flex-col gap-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-150 ${
                      isActive
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5 shrink-0" />
                    <span className="text-sm font-medium">{item.title}</span>
                    {isActive && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-background/60" />
                    )}
                  </Link>
                </SheetClose>
              );
            })}
          </nav>

          {/* Footer hint */}
          <div className="absolute bottom-8 left-0 right-0 px-6">
            <p className="text-[11px] text-muted-foreground/50 text-center tracking-wide">
              HumidHub © {new Date().getFullYear()}
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
