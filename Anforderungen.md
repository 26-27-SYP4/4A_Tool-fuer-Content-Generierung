# Anforderungen: SEO-Blog-Generierung

## 1. Funktionale Anforderungen 

### 1.1 Tool
* **FA-01 Benutzer-Authentifizierung:** Login für Nutzer (Agentur/Admin) über Supabase Auth.
* **FA-02 Kundenverwaltung:** Anlegen von Kunden mit Pflichtfeldern (Name, Website-URL) und optionalen Feldern (Ansprache, Tonalität).
* **FA-03 Web-Crawler:** 
  * Crawlen der Kunden-Domain (max. 50 Seiten).
  * Beachtung der `robots.txt`.
  * Ratenlimitierung: maximal 1 Anfrage pro Sekunde.
  * Extraktion von HTML-Titel, Überschriften und Textinhalt.
* **FA-04 KI-Profilierung (Prompt 1):** Generierung von Unternehmensprofilen (Branche, Region, Leistungen, Zielgruppe, Startbegriffe, Marken) im JSON-Format auf Basis der gecrawlten Texte mittels Gemini API.
* **FA-05 Keyword-Recherche (Mangools API):**
  * Abruf von bis zu 200 verwandten Keywords pro Startbegriff (`/kwfinder/related-keywords`).
  * Abruf der SEO-Schwierigkeit für Top-3-Keywords nach Volumen (`/kwfinder/serps`).
  * Automatisches Wiederholen bei HTTP 429 (`retry_after` beachten).
  * Harte Grenze: Maximal 9 Mangools-API-Aufrufe pro Durchlauf.
* **FA-06 Keyword-Filterung (Vorauswahl):** Ausschluss von Keywords nach folgenden Kriterien:
  * Suchvolumen < 20.
  * Schwierigkeit > 30.
  * Enthält Marken der Konkurrenz.
  * Enthält Kaufabsicht (Ausnahme: "kosten", "preis").
  * Bereits bedient (Überschneidung mit Crawl-Daten).
  * Bereits in einem anderen Beitrag verwendet.
* **FA-07 KI-Content-Erstellung (Prompt 2):** Generierung eines SEO-Blogbeitrags im JSON-Format mittels Gemini API (inkl. Websuche) mit folgenden Elementen:
  * Gewähltes Keyword, Titel, Slug, Meta-Titel, Meta-Beschreibung, Auszug.
  * Text-Inhalt gegliedert in exakt 5 erlaubte Block-Typen: `heading` (H2/H3), `text` (mit Markdown fett/kursiv/link), `image`, `list` (bullet/number, 2-12 Items), `faq`.
  * Bild-Prompts für die Generierung.
* **FA-08 KI-Bildgenerierung:** Erzeugung von Symbolbildern via Gemini API anhand der Prompts aus FA-07.
* **FA-09 Editor & Beitragsverwaltung:**
  * Bearbeiten aller generierten Blöcke (Texte ändern, Blöcke verschieben).
  * Bilder neu erzeugen lassen.
  * Workflow-Status ändern (`entwurf` zu `veroeffentlicht`).

### 1.2 Testseite (seitlich.at)
* **FA-10 Dynamischer Blog-Abruf:** Abrufen der freigegebenen Beiträge (`status = 'veroeffentlicht'`) direkt aus der Supabase-Datenbank bei jedem Seitenaufruf (kein Caching).
* **FA-11 Blog-Übersicht:** Darstellung aller Blogbeiträge unter `/blog` mit Titel, Auszug und Cover-Bild.
* **FA-12 Beitrags-Detailseite:**
  * Darstellung der URL via Slug (z.B. `/blog/holztisch-pflegen`).
  * Fehlerfreies Rendern der 5 Block-Typen in HTML.
  * SEO-Integration: Ausgabe von Meta-Titel (`<title>`) und Meta-Beschreibung (`<meta name="description">`).
  * Schema-Integration: Ausgabe der FAQ-Daten als strukturiertes JSON-LD (FAQPage) für Google.
* **FA-13 Standard-Seiten:** Bereitstellung einer Startseite, 3 Leistungsseiten, Über uns und Kontaktseite (mit passendem Inhalt für einen erfundenen Betrieb).

---

## 2. Nicht-funktionale Anforderungen 

### 2.1 Technologie-Stack
* **NFA-01 Framework:** Nutzung von Next.js mit TypeScript für beide Applikationen (Tool und Testseite).
* **NFA-02 Backend/Datenbank:** Supabase (PostgreSQL, Storage, Auth). Strukturierung in 6 vorgegebene Tabellen (`kunden`, `crawl_seiten`, `suchbegriffe`, `vorlagen`, `beitraege`, `bilder`).

### 2.2 Daten & Medien
* **NFA-03 Bildformat & Speicherung:** Generierte Bilder müssen im WebP-Format in zwei Breiten (800px und 1600px) im Supabase Storage-Bucket `blog-images` unter dem Pfad `{kunde_id}/{beitrag_id}/...` abgelegt werden.
* **NFA-04 Datenintegrität:** Eindeutigkeit des Slugs und des Keywords pro Kunde; Einhaltung der Tabellen-Beziehungen (Primary/Foreign Keys).

### 2.3 KI & Content-Einschränkungen
* **NFA-05 Fehlerkorrektur:** Bei fehlerhaftem JSON der KI muss die Anfrage einmal wiederholt werden, danach ist eine Fehlermeldung im UI auszugeben.
* **NFA-06 Inhalts-Restriktionen:**
  * Sprache: Österreichisches Deutsch (Tonalität/Ansprache laut Kunde).
  * Keine Fakten-Halluzinationen (keine erfundenen Preise, Zahlen, Auszeichnungen).
  * Bilder: Keine echten Personen, Logos oder nachgebauten Produkte.
  * Typografie: Normale Bindestriche (keine langen Gedankenstriche).
* **NFA-07 Längen-Beschränkungen:** Meta-Titel max. 60 Zeichen, Meta-Beschreibung max. 160 Zeichen, Titel max. 70 Zeichen, Slug nur a-z, 0-9 und Bindestrich. Mindestens 3 Blöcke pro Artikel.

### 2.4 Infrastruktur & Deployment
* **NFA-08 Build-Prozess:** 
  * Das Tool muss mit Standard-Befehlen (`npm install`, `npm run build`, `npm start`) lauffähig sein.
  * Die Testseite muss mit dem Cloudflare-Adapter (`@opennextjs/cloudflare`) gebaut werden und lokal via `npm run preview` testbar sein.
* **NFA-09 Konfiguration:** Sämtliche API-Keys (Mangools, Gemini), URLs und IDs (z.B. `KUNDE_ID` für die Testseite) müssen über Umgebungsvariablen (`.env`) konfiguriert werden. Keine hardcodierten Secrets im Quellcode.

### 2.5 Abgabe & Struktur
* **NFA-10 Repository-Struktur:** Das Git-Repository muss in die drei Ordner `tool/`, `testseite/` und `supabase/` gegliedert sein.
* **NFA-11 Dokumentation:** Bereitstellung einer `README.md` (Node-Version, Start-Befehle, Env-Liste) sowie `.env.example` Dateien.
* **NFA-12 Datenbank-Initialisierung:** Bereitstellung von Supabase CLI Migrationen (`supabase/migrations`) für Schema und Policies (RLS) sowie einer `seed.sql` für Vorlagen.
