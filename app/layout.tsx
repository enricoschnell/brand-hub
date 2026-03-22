import type { Metadata } from "next";
import "./globals.css";
import { BrandProvider } from "@/lib/brand-context";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "CASAGO Brand Hub",
  description: "Planen. Umsetzen. Leben. — Brand Guidelines & Assets",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={cn("font-sans", geist.variable)}>
      <body style={{ margin: 0, padding: 0, background: "#0a0a0b" }}>
        <BrandProvider>{children}</BrandProvider>
      </body>
    </html>
  );
}
