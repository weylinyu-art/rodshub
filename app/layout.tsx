import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "RodsHub | The Global Marketplace for Fishing Rod Sourcing",
  description:
    "One Hub. Endless Rods. B2B fishing rod marketplace for wholesalers and retailers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
