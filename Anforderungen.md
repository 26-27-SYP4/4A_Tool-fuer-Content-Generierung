# Anforderungen: SEO-Blog-Werkstatt (KRUG software solutions Gmb

## 1. Funktionale Anforderungen (Tool & Editor)

*   **Benutzer- & Kundenverwaltung:** Das System benötigt einen sicheren Login (Supabase Auth) sowie eine Funktion zum Anlegen von Kundenprofilen mit den wichtigsten Eckdaten wie Name und Website-URL.
*   **Web-Crawler:** Ein simples Crawler-Skript liest die Kunden-Website aus, damit die KI daraus später das Firmenprofil erstellen kann. Wichtig dabei: Der Crawler muss die robots.txt checken und darf maximal 1     Anfrage pro Sekunde machen (Rate-Limiting), um den fremden Server nicht zu überlasten.
*   **Automatisierte SEO-Recherche:** 
    *   Das Tool erstellt über die Gemini API zunächst ein Unternehmensprofil und passenden Startbegriffe.
    *   Anschließend ruft es über die Mangools API verwandte Keywords und deren Schwierigkeit und Suchvolumen ab.
    *   Unpassende Begriffe (z.B. Konkurrenzmarken) werden systemseitig automatisch aussortiert.
*   **KI-Content- & Bildgenerierung:** Auf Basis des gewählten Keywords generiert die Gemini API einen vollständigen Blogbeitrag (Titel, SEO-Metadaten und strukturierten Text) sowie passende Symbolbilder. Der Text darf ausschließlich aus Überschriften, Absätzen, Bildern, Listen und FAQ-Blöcken bestehen.
*   **Inhalts-Editor:** Nutzer können die generierten Beitragsblöcke bearbeiten, verschieben, Bilder neu erzeugen lassen und den Beitrag abschließend veröffentlichen.

## 2. Funktionale Anforderungen (Testseite )

*   **Dynamische Blog-Anbindung:** Die Next.js-Testseite lädt veröffentlichte Beiträge bei jedem Seitenaufruf echtzeit aus der Supabase-Datenbank.
*   **Darstellung & SEO:** Die Beitrags-Detailseiten rendern die Inhaltsblöcke fehlerfrei in HTML und geben zwingend SEO-Tags (Meta-Titel, Meta-Beschreibung) sowie Schema.org-Daten (für die FAQs) an Suchmaschinen aus.
*   **Basis-Webpräsenz:** Neben dem Blog umfasst die Seite grundlegende Unternehmens-Ansichten (Startseite, Leistungen, Über uns, Kontakt) für einen fiktiven Betrieb.

## 3. Nicht-funktionale Anforderungen

*   **Datenhaltung & Architektur:** Das relationale Supabase-Datenbankmodell muss eine saubere Zuordnung von Slugs und Keywords gewährleisten. Generierte Bilder sind zwingend platzsparend im WebP-Format (in 800px und 1600px) im Supabase Storage abzulegen.
*   **Fehler- & Inhaltskontrolle:** Bei fehlschlagenden API-Abfragen (z.B. ungültiges JSON der KI oder Mangools Rate-Limits) führt das System automatische Wiederholungsversuche durch, bevor es dem Nutzer einen Fehler meldet. Die KI muss im österreichischen Deutsch schreiben und darf keine Fakten erfinden.
*   **Infrastruktur & Sicherheit:** Alle API-Keys und sensiblen Konfigurationen werden ausschließlich über Umgebungsvariablen  verwaltet. Beide Anwendungen müssen mit Standard-Befehlen lauffähig sein.
*   **Lieferobjekte:** Der Quellcode ist übersichtlich in die Bereiche `tool/`, `testseite/` und `supabase/` zu strukturieren. Supabase-Datenbankmigrationen und eine Projektdokumentation (`README.md`) sind Teil der Abgabe.
