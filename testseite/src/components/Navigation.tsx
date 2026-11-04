import Link from "next/link";
import { betrieb } from "@/data/betrieb";

// Menü, das oben auf jeder Seite erscheint.
export default function Navigation() {
  return (
    <header className="border-b">
      <nav className="mx-auto flex max-w-3xl flex-wrap items-center gap-4 px-4 py-4">
        <Link href="/" className="font-bold">
          {betrieb.name}
        </Link>
        {betrieb.leistungen.map((leistung) => (
          <Link key={leistung.slug} href={`/leistungen/${leistung.slug}`}>
            {leistung.titel}
          </Link>
        ))}
        <Link href="/ueber-uns">Über uns</Link>
        <Link href="/kontakt">Kontakt</Link>
        <Link href="/blog">Blog</Link>
      </nav>
    </header>
  );
}