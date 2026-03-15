import type { Metadata } from "next";

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
    <html lang="de">
      <body style={{ margin: 0, padding: 0, background: "#0a0a0b" }}>
        {children}
      </body>
    </html>
  );
}
