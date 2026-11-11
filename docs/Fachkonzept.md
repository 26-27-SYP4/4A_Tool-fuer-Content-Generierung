# Fachkonzept: KI-gestützte SEO- & Blog-Content-Plattform

**Projekt:** Automatisierte SEO-Blog-Erstellung für Kunden-Websites

## 1. Ausgangslage & Zielsetzung

### 1.1 Wer ist der Kunde und was macht er?
Unser Auftraggeber ist die Firma KRUG software solutions GmbH aus Grieskirchen. Das Unternehmen möchte Kunden-Websiten regelmäßig mit suchmaschinenoptimierten Blogbeiträgen versorgen, damit diese in Suchmaschienen besser und schneller gefunden werden können.

Derzeit erfordert dieser Prozess sehr viel Handarbeit: Mitarbeiter müssen sich selber in die Website einlesen, passende Keywords recherchieren, die Relevants dieser prüfen, Texte selber verfassen, passende Bilder finden und alles manuell  zusammenstellen. 

Das Ziel ist ein Tool, das diese Schritte automatisiert. Der Mitarbeiter soll nur noch dort eingesetzt werden, wo Urteilsvermögen gefragt ist zb. beim Prüfen und Freigeben der erstellten Blog-Beiträge. Zwei Vorgaben sind der Firma KRUG software solutions GmbH dabei besonders wichtig:
*   **Kosteneffizienz:** Automatisierte Abfragen bei externen Anbietern für Suchbegriffe müssen stark limitiert und im Vorfeld gefiltert werden.
*   **Wahrheitstreue der Texte:** Die automatisierte Texterstellung darf keine Preise, Zahlen oder Auszeichnungen erfinden, die nicht tatsächlich auf der Website der Kunden stehen.

### 1.2 Ist-Zustand
*   Die regelmäßige Pflege und Aktualisierung von Kunden-Websites mit SEO-Blogbeiträgen erfordert einen hohen manuellen Recherche- und Schreibaufwand.
*   Die Recherche von Suchbegriffen und die inhaltliche Ausrichtung an die Branche des Kunden geschehen derzeit geteilt in unterschiedlichen Programmen.
*   Es fehlt ein durchgängiger Arbeitsablauf von der ersten Webseitenanalyse bis zur direkten Bereitstellung des fertigen Textes.

### 1.3 Soll-Zustand
*   Bereitstellung einer Plattform, die über die Eingabe einer Kunden-Website selbstständig bis zu 50 Unterseiten einliest und relevante Informationen erfasst. 
*   Das System leitet aus diesen Informationen das Firmenprofil ab, findet automatisch relevante SEO-Suchbegriffe und reichert diese mit Kennzahlen zur Wichtigkeit an .
*   Automatisierte Generierung von qualitativ hochwertigen Blogbeitrags-Entwürfen in festen Blöcken (inklusive Bildern) durch den Einsatz von Künstlicher Intelligenz .
*   Zentrale Speicherung aller Entwürfe und Suchbegriffe in einer Datenbank, sodass die Kunden-Websites freigegebene Beiträge völlig automatisiert beziehen und sofort anzeigen können .

## 2. Akteure und Zielgruppen (User Roles)
*   **Content-Manager (KRUG):** Bedient das System, gibt URLs ein, prüft KI-Entwürfe und gibt diese für die Kunden frei.
*   **System-Administrator:** Verwaltet die API-Schlüssel (LLM, Mangools) und überwacht die entstandenen Schnittstellen-Kosten.
  
## 3. Systemarchitektur & Schnittstellen
*   **Frontend/UI:** Web-Oberfläche für die Mitarbeiter.
*   **Backend/Datenbank:** Supabase (PostgreSQL) zur zentralen Speicherung von Kunden, gecrawlten Texten (.md Files), Keywords und Blog-Entwürfen.
*   **Externe APIs:**
    *   Mangools API (SEO-Daten & Keyword-Recherche).
    *   LLM-API zur Texterstellung.

## 4. Grobes Datenmodell
*   **Kunde / Projekt:** ID, Basis-URL, Firmenname.
*   **Keyword:** ID, Projekt_ID, Begriff, Suchvolumen, Relevanz-Score.
*   **Blogbeitrag:** ID, Projekt_ID, Titel, Inhalt (Markdown/HTML), Status (Entwurf/Freigegeben), Erstellungsdatum.

## 5. Benutzeroberfläche (UI / UX Konzept)
*   **Projekt-Dashboard:** Übersicht aller Kunden-URLs und des aktuellen Generierungs-Status.
*   **Detail-Ansicht:** Eingabefeld für neue URLs, Liste der analysierten Keywords mit deren Wichtigkeit.
*   **Editor-Ansicht:** Eine Oberfläche, in der der Mitarbeiter den KI-generierten Text prüfen, anpassen und den Freigabe-Button drücken kann.

## 6. Abnahmekriterien (Scope)
*   **In Scope:** Ein funktionierender Prototyp, der den gesamten Workflow von der URL-Eingabe, über die Mangools-Abfrage bis zur Speicherung des fertigen Beitrags in der Supabase-Datenbank automatisiert.
*   **Out of Scope:** Die direkte Integration und Darstellung der Beiträge auf den tatsächlichen CMS-Systemen (WordPress etc.) der Endkunden ist nicht Teil dieses Projekts.
