import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { betrieb } from "@/data/betrieb";

type Props = {
  params: Promise<{ slug: string }>;
};

// Sucht die Leistung, deren slug zur Adresse passt.
function findeLeistung(slug: string) {
  return betrieb.leistungen.find((leistung) => leistung.slug === slug);
}

// Sagt Next.js, welche Leistungsseiten es gibt.
export function generateStaticParams() {
  return betrieb.leistungen.map((leistung) => ({ slug: leistung.slug }));
}

// Seitentitel im Browser-Tab, zum Beispiel "Innenanstrich | Malerei Beispiel".
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const leistung = findeLeistung(slug);
  return {
    title: leistung ? `${leistung.titel} | ${betrieb.name}` : betrieb.name,
    description: leistung?.kurz,
  };
}

export default async function LeistungSeite({ params }: Props) {
  const { slug } = await params;
  const leistung = findeLeistung(slug);

  // Unbekannte Adresse wie /leistungen/xyz: Seite "nicht gefunden".
  if (!leistung) {
    notFound();
  }

  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-bold">{leistung.titel}</h1>
      {leistung.absaetze.map((absatz, index) => (
        <p key={index}>{absatz}</p>
      ))}
    </article>
  );
}