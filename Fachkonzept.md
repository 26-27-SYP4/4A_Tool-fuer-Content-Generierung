# Fachkonzept: KI-gestützte SEO- & Blog-Content-Plattform

| Projekt | Automatisierte SEO-Blog-Erstellung für Kunden-Websites |
| :--- | :--- |
| **Status** | In Ausarbeitung / Vorlage |

---

## 1. Ausgangslage & Zielsetzung (Kontext)

### 1.1 Ist-Zustand
* Die regelmäßige Pflege und Aktualisierung von Kunden-Websites mit suchmaschinenoptimierten (SEO) Blogbeiträgen erfordert einen hohen manuellen Recherche- und Schreibaufwand.
* Keyword-Recherchen (über Tools wie Mangools) und die inhaltliche Ausrichtung an die Branche des Kunden geschehen fragmentiert und unverbunden.
* Es fehlt ein durchgängiger Workflow von der Zielseitenanalyse bis zur Bereitstellung des fertigen Textes.

### 1.2 Soll-Zustand
* Bereitstellung einer Plattform, die über die Eingabe einer Webseiten-URL selbstständig Informationen extrahiert (Web-Crawler), relevante SEO-Keywords ableitet und mit Kennzahlen anreichert.
* Automatisierte Generierung qualitativer Blogbeitrags-Entwürfe mithilfe von KI-Modellen.
* Zentrale Speicherung aller Entwürfe und Keywords in Supabase, sodass Kunden-Websites freigegebene Beiträge automatisiert über eine Schnittstelle beziehen können.

---

## 2. Anforderungen (Requirements)

### 2.1 Funktionale Anforderungen (FA)
* **FA-01 (URL-Input & Crawler):**
  * Das Frontend bietet ein Eingabefeld für Kunden-URLs.
  * Ein integrierter Web-Crawler erfasst den Textinhalt, vorhandene Meta-Tags sowie Überschriften der Zielseite.
* **FA-02 (Keyword-Generierung & Recherche):**
  * Das System analysiert den gecrawlten Inhalt via LLM und erzeugt Keyword-Vorschläge.
  * Integration des SEO-Tools (Mangools API/Schnittstelle) zur Abfrage von Kennzahlen (Suchvolumen, Konkurrenzstärke).
* **FA-03 (Content-Erstellung):**
  * Das Frontend zeigt validierte Keywords an und ermöglicht das Auslösen der Blog-Post-Erstellung.
  * Das System erzeugt einen strukturierten Entwurf (Titel, Zwischenüberschriften, Haupttext, Meta-Description).
* **FA-04 (Backend & Datenspeicherung):**
  * Persistierung aller Projekte, gecrawlten Metadaten und Blog-Posts in der relationalen Supabase-Datenbank.
  * Bereitstellung eines API-Endpunkts, über den externe Kunden-Websites publizierte Blog-Einträge abrufen können.

### 2.2 Nicht-funktionale Anforderungen (NFA)
* **NFA-01 (Wirtschaftlichkeit / Token-Budget):** Vorverarbeitung des HTML-Codes (Entfernen von CSS, JS, Navigationsmenüs), um nur semantisch relevanten Fließtext an die LLM-Schnittstelle zu senden.
* **NFA-02 (Qualitätssicherung):** Einhaltung standardisierter Markdown-Formate für die Beitragsentwürfe sowie gezielte Steuerung der Keyword-Dichte (1–2 %).
* **NFA-03 (Modularität):** Entkoppelte Schnittstellen zwischen Frontend, Crawler, LLM-Service, Mangools und Supabase.

---

## 3. Lösungsarchitektur & Systemübersicht

### 3.1 Datenfluss-Diagramm

```text
+-------------------+
|  Frontend (GUI)   | <=== Eingabe der Kunden-URL & Review des Blog-Entwurfs
+-------------------+
          |
          v
+-------------------+
|    Web-Crawler    | ===> Extrahiert Seiteninhalt & Kernthemen
+-------------------+
          |
          v
+-------------------+       +-----------------------+
|  KI-Server (LLM)  | <---> | Mangools (SEO-Tools)  |
|  (Keyword-Ideen)  |       | (Suchvolumen/Valid.)  |
+-------------------+       +-----------------------+
          |
          v
+-------------------+
|  KI-Server (LLM)  | ===> Generiert vollständigen Blogbeitrag
+-------------------+
          |
          v
+-----------------------+
|  Supabase (Backend)   | ===> Datenbank für Beiträge, Keywords & Status
+-----------------------+
          ^
          | (API-Abruf / Integration)
+-----------------------+
|    Kunden-Website     |
+-----------------------+
```

### 3.2 Komponentenbeschreibung
* **Frontend:** Zentrale Steuerungsmaske zur Eingabe der Domain, Anzeige der analysierten Keywords und finalen Freigabe des generierten Textes.
* **Crawler-Modul:** Isolierter Service zur semantischen Aufbereitung von Webseiten.
* **Mangools-Connector:** Liefert Keyword-Metriken zur Entscheidungsfindung.
* **Supabase:** Zentraler Datenspeicher (PostgreSQL) mit Tabellen wie `projects`, `keywords` und `blog_posts`.
