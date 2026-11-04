import type { Metadata } from "next";
import { betrieb } from "@/data/betrieb";

export const metadata: Metadata = {
  title: `Blog | ${betrieb.name}`,
};

// Später lädt diese Seite die veröffentlichten Beiträge aus Supabase.
export default function Blog() {
  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-bold">Blog</h1>
      <p>Noch keine Beiträge.</p>
    </article>
  );
}