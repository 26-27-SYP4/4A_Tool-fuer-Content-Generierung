import type { Metadata } from "next";
import { betrieb } from "@/data/betrieb";

export const metadata: Metadata = {
  title: `Über uns | ${betrieb.name}`,
};

export default function UeberUns() {
  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-bold">Über uns</h1>
      <p>{betrieb.beschreibung}</p>
      <p>
        Unser Team arbeitet in {betrieb.region}. Wir legen Wert auf saubere
        Arbeit, klare Absprachen und verlässliche Termine.
      </p>
    </article>
  );
}