import Link from "next/link";
import { betrieb } from "@/data/betrieb";

export default function Startseite() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold">{betrieb.name}</h1>
        <p className="mt-4">{betrieb.beschreibung}</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Unsere Leistungen</h2>
        <ul className="mt-4 space-y-4">
          {betrieb.leistungen.map((leistung) => (
            <li key={leistung.slug}>
              <Link
                href={`/leistungen/${leistung.slug}`}
                className="font-semibold underline"
              >
                {leistung.titel}
              </Link>
              <p>{leistung.kurz}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}