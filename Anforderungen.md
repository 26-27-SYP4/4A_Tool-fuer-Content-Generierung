# Was macht der Kunde

SEO-Blog-Werkstatt · HTL Grieskirchen · Oct 7, 2026

## Wer ist der Kunde

Unser Auftraggeber ist die KRUG software solutions GmbH aus Grieskirchen. Sie lässt uns ein Werkzeug bauen, mit dem sie für Firmen-Websites automatisch SEO-Blogbeiträge erstellt.

| Angabe | Wert |
| --- | --- |
| Firma | KRUG software solutions GmbH |
| Adresse | Roßmarkt 18, 4710 Grieskirchen |
| Ansprechpartner | Jonas Kreuzhuber, Michael Gründlinger |
| Kontakt | office@krugware.com, +43 677 63079600 |
| Website | www.krugware.com |

Wichtig für die Begriffe: KRUG ist **unser** Kunde. Im Tool heißt "Kunde" aber die Firma, für die Beiträge entstehen, zum Beispiel die Tischlerei aus dem Beispiel. Diese Firmen sind KRUGs Kunden und landen in der Tabelle `kunden`.

## Ausgangslage

KRUG will für Firmen-Websites regelmäßig Blogbeiträge liefern, die bei Google gefunden werden. Heute kostet das viel Handarbeit: Website lesen, passende Suchbegriffe finden, Zahlen dazu prüfen, Text schreiben, Bilder besorgen, online stellen.

Das Ziel ist ein Werkzeug, das diese Schritte zusammenhängend erledigt. Der Mensch bleibt nur dort, wo Urteil gebraucht wird: beim Prüfen, Bearbeiten und Freigeben des Beitrags.

Dabei achtet KRUG auf zwei Dinge besonders:

- **Kosten:** Mangools-Aufrufe sind auf höchstens 9 pro Durchlauf begrenzt, und eine Vorauswahl im Code filtert Keywords, bevor die KI sie bekommt.
- **Ehrlichkeit der Texte:** Die KI darf keine Preise, Zahlen oder Auszeichnungen erfinden, die nicht auf der Website der Firma stehen.

## Was der Kunde mit dem System macht

KRUG betreibt zwei Anwendungen: das Tool auf **seo.krugware.com** und eine Test-Firmenseite auf **seitlich.at**. Ein Mitarbeiter von KRUG macht pro Beitrag diesen Durchlauf:

1. **Anmelden** im Tool (Supabase Auth).
2. **Firma anlegen:** Name und URL eingeben, optional Ansprache und Tonalität (Standard: du, sachlich).
3. **Website lesen lassen:** Der Crawler liest bis zu 50 Seiten der Firma, eine pro Sekunde, und beachtet robots.txt.
4. **Profil prüfen:** Die KI erkennt Branche, Region, Leistungen, Zielgruppe, Marken der Konkurrenz und 3 bis 5 Startbegriffe.
5. **Keywords bekommen:** Das Tool holt verwandte Keywords von Mangools, filtert sie und lädt für die besten 3 die Schwierigkeit nach.
6. **Entwurf bekommen:** Die KI wählt ein Keyword und schreibt den Beitrag in festen Blöcken, inklusive Meta-Titel, Meta-Beschreibung und Bildern.
7. **Bearbeiten:** Im Editor jeden Block ändern, Blöcke verschieben, Bilder neu erzeugen.
8. **Freigeben:** Der Status wechselt auf veröffentlicht.
9. **Ergebnis sehen:** Die Firmenseite zeigt den Beitrag sofort unter /blog, mit Meta-Daten und FAQ-Daten für Google.

Beim nächsten Durchlauf für dieselbe Firma ist das schon verwendete Keyword gesperrt, so entstehen keine doppelten Beiträge.

## Was der Kunde beisteuert und erwartet

KRUG stellt die Schlüssel und übernimmt am Ende den Betrieb. Wir entwickeln alles lokal und übergeben den Code.

| Bereich | KRUG | Wir |
| --- | --- | --- |
| Zugänge | Mangools- und Gemini-API-Schlüssel, GitHub-Account für die Abgabe | Eigenes Supabase-Projekt (Datenbank, Login, Storage) |
| Technik | Gibt Next.js mit TypeScript vor | Bauen Tool und Testseite damit |
| Testseite | Stellt sie auf seitlich.at online | Erfinden einen Betrieb: Startseite, 3 Leistungsseiten, Über uns, Kontakt, Blog |
| Betrieb | Stellt das Tool auf seo.krugware.com online | Liefern lauffähigen Code |

**Was KRUG bei der Abgabe prüft:**

- Ein Git-Repository mit den Ordnern `tool/`, `testseite/` und `supabase/`.
- README.md mit Node.js-Version, Startbefehlen und allen Umgebungsvariablen.
- Je eine `.env.example` in `tool/` und `testseite/`, ohne Werte.
- Supabase-Migrationen für alle Tabellen, RLS-Regeln und den Bucket `blog-images`, Vorlagen in `seed.sql`.
- Tool läuft mit `npm install`, `npm run build`, `npm start`, ohne weitere Schritte.
- Testseite baut mit `@opennextjs/cloudflare` und läuft mit `npm run preview`.
- Keine Adressen oder Schlüssel im Code, nur Umgebungsvariablen.
- Ein kompletter Durchlauf funktioniert auf einem leeren Supabase-Projekt.

**Was KRUG an den Inhalten erwartet:** österreichisches Deutsch, nur die fünf Block-Typen, keine erfundenen Fakten, keine langen Gedankenstriche. Bilder ohne echte Personen, Logos oder nachgebaute Produkte der Firma.

## Abgrenzung und offene Fragen

**Nicht Teil des Auftrags:**

- Kein CMS wie WordPress. Die Testseite liest direkt aus Supabase, bei jedem Aufruf, ohne Cache.
- Keine eigene API für externe Websites und kein Hosting durch uns.
- Keine weiteren Mangools-Endpunkte als die zwei vorgegebenen.
- Nur Österreich und Deutsch (location\_id 2040, language\_id 1001).

**Offene Fragen an KRUG:**

- [ ] Welches Gemini-Modell sollen wir für Text und welches für Bilder verwenden?
- [ ] Wie kommt ein Beitrag in den Status "offline"? Im Ablauf gibt es dafür keinen Schritt.
- [ ] Wer darf sich im Tool registrieren: jeder, oder nur bestimmte E-Mail-Adressen?
- [ ] Wie groß ist das tägliche Mangools-Kontingent, das wir zum Entwickeln nutzen dürfen?
- [ ] Wofür setzt KRUG das Tool später ein, und für welche Art von Firmen? Öffentlich haben wir dazu nichts gefunden.

Quelle: Projektvorgaben SEO-Blog-Werkstatt von KRUG, Stand 30.09.2026.
