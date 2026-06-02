"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation } from "@/config/navigation";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-6">
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={
            pathname === item.href ? "font-medium" : "text-muted-foreground"
          }
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
