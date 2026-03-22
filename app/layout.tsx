import type { Metadata } from "next";
import "./globals.css";
import { BrandProvider } from "@/lib/brand-context";

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
    <html lang="de" className="dark">
      <body style={{ margin: 0, padding: 0 }}>
        <BrandProvider>{children}</BrandProvider>
      </body>
    </html>
  );
}
