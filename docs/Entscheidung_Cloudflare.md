# Architektur-Entscheidung CFW 

**Status:** Akzeptiert  
**Datum:** 11. November 2026  

## Kontext
Der Kunde (KRUG software solutions GmbH) wird  die Web-Anwendung über CFW zu betreiben. Uns stellte sich die Frage, ob Cloudflare auch für die Entwicklungs- und Testphase geeignet ist, insbesondere im Hinblick auf Kosten.

## Entscheidung
Wir haben uns entschieden, **Cloudflare Pages** im "Free Plan" für das Hosting der beiden Next.js-Frontends (`/tool/` und `/testseite/`) zu nutzen.

## Begründung
* **Kostenlos für die Testphase:** Der Free Plan von Cloudflare reicht für unsere Zwecke völlig aus. Er bietet kostenloses Hosting, SSL-Zertifikate und bis zu 500 automatische Deployments pro Monat, ohne dass eine Kreditkarte hinterlegt werden muss.
  
* **Automatisierter Workflow (CI/CD):** Cloudflare Pages lässt sich direkt mit unserem GitHub-Repository verknüpfen. Jeder Push in den `main`-Branch aktualisiert automatisch die Live-Website.
  
* **Problemlose Supabase-Anbindung:** Die Frontends auf Cloudflare können problemlos über Umgebungsvariablen (API-URL und Anon-Key) mit unserer fertig konfigurierten Supabase-Datenbank kommunizieren.

## Technische Konsequenzen für das Team
Da Cloudflare für das Hosting eine "Edge-Worker"-Architektur (und keinen Standard-Node.js-Server) verwendet, müssen wir beim Aufsetzen der Next.js-Projekte darauf achten, diese für Cloudflare zu optimieren. 
* Wir werden bei der Entwicklung das Paket `@cloudflare/next-on-pages` evaluieren oder alternativ auf einen statischen Export (`output: 'export'`) in Next.js setzen, damit der Code reibungslos auf Cloudflare läuft.
