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


## 4.Technische Rahmenbedingungen

* **Frontend-Technologien:** Das Tool  und die Testseite  müssen zwingend als Next.js mit TypeScript entwickelt werden. Als Build-Adapter für das Hosting kommt `@opennextjs/cloudflare` zum Einsatz.
* **Backend & Datenbank:** Als Backend dient ein  Supabase-DB. Dieses nutzt PostgreSQL für die relationale Datenhaltung , Supabase Auth für den sicheren Tool-Login und Supabase Storage  für generierte Medien. Die Client-Kommunikation erfolgt über `@supabase/supabase-js`[cite: 1].
* **Externe APIs:** Für die SEO-Daten  wird die Mangools API verwendet. Die Texterstellung  sowie die Generierung von Symbolbildern übernimmt die Gemini API.
* **Hilfs-Bibliotheken:** Für den Ressourcen-schonenden Web-Crawler wird `cheerio` eingesetzt. Generierte Bilder müssen serverseitig über `sharp` in das WebP-Format konvertiert und auf 800px sowie 1600px skaliert werden. Um strikte KI-Antworten sicherzustellen, wird das JSON-Schema über `zod` validiert.
* **Sicherheit & Konfiguration:** API-Schlüssel und Passwörter dürfen niemals in den Quellcode geschrieben werden, sondern werden ausschließlich über lokale Umgebungsvariablen (`.env.local`) verwaltet

## 5. Entwicklungs-Prozess 
* **Git-Workflow & Branching:** Es gibt keine direkten Commits auf den `main`-Branch . Features werden zwingend in eigenen Branches entwickelt und über Pull Requests (PRs) zusammengeführt .
* **Code-Reviews:** Jeder Pull Request durchläuft ein zweistufiges Review: Zuerst prüft der Autor seine Änderungen mithilfe von KI, danach muss ein anderes Teammitglied den Code lesen, testen und freigeben .
* **Umgang mit KI:** Es gilt der Projektsatz "Verstehen vor Übernehmen" . KI-generierter Code muss lokal ausgeführt und verstanden werden, bevor er gepusht wird . Die Vorgaben von KRUG schlagen dabei immer abweichende KI-Vorschläge .
* **Deployment (CI/CD):** Das Hosting erfolgt über Cloudflare Pages[cite: 5]. Der Workflow ist automatisiert: Jeder Push in den `main`-Branch aktualisiert automatisch die Live-Website.
