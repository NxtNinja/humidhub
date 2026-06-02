import Link from "next/link";
import { CloudSun } from "lucide-react";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border/40">
      <div className="w-full max-w-3xl mx-auto flex h-14 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <CloudSun className="h-6 w-6" />

          <span className="font-semibold tracking-tight text-lg">HumidHub</span>
        </Link>

        <div className="hidden sm:block">
          <NavLinks />
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
