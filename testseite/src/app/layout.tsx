import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { betrieb } from "@/data/betrieb";

export const metadata: Metadata = {
  title: betrieb.name,
  description: betrieb.beschreibung,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="flex min-h-screen flex-col">
        <Navigation />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
          {children}
        </main>
        <footer className="border-t px-4 py-6 text-center text-sm">
          © {betrieb.name}, {betrieb.region}
        </footer>
      </body>
    </html>
  );
}