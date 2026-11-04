import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SEO-Tool Dashboard",
  description: "SEO-Blog-Werkstatt Tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}