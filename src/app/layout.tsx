import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AppProvider } from "@/providers/app-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const outfitHeading = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
});

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HumidHub | Modern Weather Intelligence",
  description: "A beautiful, hyper-local weather application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        figtree.variable,
        outfitHeading.variable,
      )}
    >
      <body className="min-h-full flex flex-col bg-background">
        <AppProvider>
          <Navbar />
          <div className="w-full max-w-3xl mx-auto flex-1 flex flex-col px-4 md:px-6">
            <main className="flex-1">{children}</main>
          </div>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
