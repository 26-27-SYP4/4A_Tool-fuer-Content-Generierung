import type { Metadata } from "next";
import { betrieb } from "@/data/betrieb";

export const metadata: Metadata = {
  title: `Kontakt | ${betrieb.name}`,
};

export default function Kontakt() {
  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-bold">Kontakt</h1>
      <p>{betrieb.name}</p>
      <p>{betrieb.adresse}</p>
      <p>Telefon: {betrieb.telefon}</p>
      <p>E-Mail: {betrieb.email}</p>
      <p>Öffnungszeiten: {betrieb.oeffnungszeiten}</p>
    </article>
  );
}