[# Solution Design

## 1. Systemübersicht

Wir entwickeln ein zweiteiliges System basierend auf einem zentralen Supabase-Backend

1. **Tool (`seo.krugware.com`):** Ein Next.js-Frontend mit Login. Hier gibt der Nutzer eine Firmen-URL ein. Das Tool crawlt die Seite, erstellt ein Firmenprofil mithilfe von KI, sucht und testet Keywords auf ihre Wichtigkeit und erstellt mithilfe von KI einen fertigen Blogbeitrag.
2. **Testseite (`seitlich.at`):** Eine simple Next.js-Website für eine fiktive Test-Firma. Sie zieht sich die fertigen, freigegebenen Blogbeiträge bei jedem Seitenaufruf dynamisch (ohne Cache) aus der Supabase-Datenbank.

## 2. Detaillierter Tech-Stack

### Fixe Vorgaben (Zwingend von KRUG)
* **Framework:** Next.js mit TypeScript für das Tool und die Testseite.
* **Build-Adapter (Testseite):** `@opennextjs/cloudflare` für das spätere Hosting.
* **Backend & Infrastruktur:** Ein eigens eingerichtetes Supabase-Projekt für die PostgreSQL-Datenbank, Supabase Auth (für den sicheren Login) und den Storage-Bucket `blog-images`.
* **KI & Content:** Gemini API für die Erstellung von Unternehmensprofil, Startbegriffen, JSON-strukturierten Texten und Symbolbildern.
* **SEO-Metriken:** Mangools API (`/kwfinder/related-keywords` und `/kwfinder/serps`) für verwandte Keywords, Suchvolumen (`sv`) und Schwierigkeit (`seo` bzw. `serp.rank`).
* * **Datenbank-Client:** `@supabase/supabase-js` für die direkte Kommunikation zwischen den Next.js-Anwendungen und dem Backend 

### Unsere Entscheidungen (Zur Umsetzung der Vorgaben)
* **Crawler):** `cheerio`, um ressourcenschonend `<title>`, Überschriften (`<h1>` bis `<h3>`) und den Haupttext aus den Kunden-Websites zu extrahieren, ohne unnötiges HTML wie `<script>` oder `<style>` mitzuschleppen.
* **Bildkonvertierung:** `sharp`, um die von Gemini generierten Bilder direkt auf dem Node-Server in das zwingend geforderte WebP-Format umzuwandeln und auf 800px sowie 1600px zu skalieren.
* **JSON-Validierung:** `zod`, um die von der KI gelieferten Antworten strikt gegen das geforderte Schema abzusichern (z.B. ob wirklich nur die 5 erlaubten Block-Typen verwendet wurden), bevor ungültige Daten in die Datenbank geschrieben werden.

## 3. Ordnerstruktur (Git-Repository)

Das Repo wird exakt nach den Vorgaben von KRUG strukturiert[cite: 2]:

    /
    ├── README.md                (Startbefehle, Umgebungsvariablen)
    ├── supabase/
    │   ├── migrations/          (SQL-Skripte für die 6 Tabellen & RLS)
    │   └── seed.sql             (Start-Vorlagen)
    ├── tool/                    (Next.js App für den Editor)
    │   ├── .env.example
    │   └── src/                 (Crawler-Logik, API-Aufrufe, Supabase-Client)
    └── testseite/               (Next.js App für die fiktive Firma)
        ├── .env.example
        └── src/                 (Startseite, Kontakt, dynamischer Blog-Renderer)

## 4. Datenbank-Architektur

Wir nutzen 4 Tabellen in Supabase:
1. `kunden` (Name, URL, Profil, Startbegriffe)
2. `vorlagen` (Prompts und JSON-Wireframes)
3. `beitraege` (Der generierte Blogpost inkl. SEO-Metadaten und den 5 Block-Typen)
4. `bilder` (Pfade zu den WebP-Bildern im Storage)

## 5. Logischer Ablauf (Die 5 Etappen)

Um Server-Timeouts zu verhindern, wird der große Ablauf in fünf Schritte in der Benutzeroberfläche unterteilt. Nach jedem Schritt speichert das Tool den Fortschritt in Supabase.

* **Etappe 1: Kunde anlegen & Crawlen:** Nutzer gibt URL ein. Das Tool crawlt max. 50 Seiten der Domain (unter Beachtung der `robots.txt`).
* **Etappe 2: Profiling:** Das Tool schickt die Rohtexte an Gemini (Prompt 1), um Zielgruppe, Leistungen und Startbegriffe als JSON zu generieren.
* **Etappe 3: Keyword-Recherche:** Das Tool fragt die Mangools API nach verwandten Keywords zu den Startbegriffen. Danach filtert das Tool im Code unpassende Begriffe (Volumen < 20, Konkurrenz, Kaufabsicht) automatisch aus.
* **Etappe 4: Content-Generierung:** Die verbleibenden Keywords gehen an Gemini (Prompt 2). Gemini wählt die stärksten Keywords, schreibt den Beitrag (bestehend aus max. 5 Block-Typen) und liefert Bildbeschreibungen. Die Bilder werden erzeugt und im Supabase-Storage gespeichert.
* **Etappe 5: Editor & Freigabe:** Der Nutzer kann zwischen mehreren Entwürfen auswählen. Ein Klick auf "Veröffentlichen" ändert den Status in der Datenbank. Die Testseite zeigt den Beitrag ab diesem Moment automatisch an.
