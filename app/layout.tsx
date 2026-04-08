import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { deDE } from "@clerk/localizations";
import "./globals.css";
import { BrandProvider } from "@/lib/brand-context";

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export const metadata: Metadata = {
  title: "CASAGO Brand Hub",
  description: "Planen. Umsetzen. Leben. — Brand Guidelines & Assets",
  icons: { icon: "/favicon.ico" },
};

function Providers({ children }: { children: React.ReactNode }) {
  return <BrandProvider>{children}</BrandProvider>;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = (
    <html lang="de" className="dark">
      <body style={{ margin: 0, padding: 0, overflowX: "hidden" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );

  if (!clerkKey) return content;

  return (
    <ClerkProvider
      publishableKey={clerkKey}
      localization={deDE}
      appearance={{
        variables: {
          colorPrimary: "#eeeff1",
          colorBackground: "#141416",
          colorInputBackground: "#0a0a0b",
          colorInputText: "#eeeff1",
          colorText: "#eeeff1",
          colorTextSecondary: "#8b8d94",
          colorNeutral: "#8b8d94",
          borderRadius: "10px",
        },
      }}
    >
      {content}
    </ClerkProvider>
  );
}
