# Leitfaden: IT-Schulprojekt für KRUG software solutions GmbH

---

## 1. Projektspezifische Architektur & Workflow (Vorbereitung für Freitag)

* **Der Kern-Workflow (Fachliches Konzept):**
  1. **Recherche:** System holt/generiert SEO-relevante Keywords.
  2. **Generierung:** KI schreibt einen passenden Blogbeitrag.
  3. **Freigabe:** Ein Mensch liest den Text im Frontend und drückt auf "Freigeben".
  4. **Publishing:** System veröffentlicht den Beitrag automatisch auf der Testseite.

* **Technischer Entwurf (Vorschlag):**
  * **Backend:** z. B. C# ASP.NET Core Web API oder Node.js. Haltet es simpel – keine komplexen API-Gateways, direkte Controller-Aufrufe genügen.
  * **Datenbank:** Speicherung der Artikel und deren Status (z. B. `Draft`, `PendingApproval`, `Published`).
  * **Hintergrundprozesse:** Ein BackgroundService/Worker für das zeitgesteuerte oder asynchrone Veröffentlichen der freigegebenen Beiträge.

* **Benötigte Schnittstellen (APIs):**
  * **SEO / Keywords:** API für Suchvolumen oder Trends.
  * **KI-Schnittstelle:** z. B. OpenAI (ChatGPT) zur Textgenerierung.
  * **CMS-Schnittstelle:** z. B. WordPress REST API zur Anbindung an die Testseite.

* **Kritischer UAT (Abnahmetest):** Der "Freigabe"-Button. Der Test gilt als bestanden, wenn nach Klick auf "Freigeben" der KI-Text inklusive Formatierung (Überschriften, Absätze) korrekt auf der Testseite erscheint.

---

## 2. KI-gestützte Teamentwicklung

* **Planung & Architektur:** Nutzt KI zu Beginn für Brainstorming, API-Entwürfe, Datenbankmodelle und um das Projekt in kleine Aufgabenpakete zu zerlegen.
* **Coding-Assistenten (Copilots):** Integriert Tools wie GitHub Copilot, Cursor oder Codeium in die IDE für Autovervollständigung und Standard-Code (Boilerplate).
* **Debugging:** Kopiert fehlerhaften Code und Fehlermeldungen in die KI. Lasst euch die Ursache *erklären*, anstatt nur die Lösung zu kopieren.
* **Code Reviews:** Lasst die KI vor dem Mergen über den Code schauen, um logische Fehler, unsaubere Struktur oder Performance-Probleme aufzudecken.
* **Dokumentation:** Generiert Code-Kommentare und Projekt-Dokumentationen aus dem fertigen Code mithilfe von KI.

> ⚠️ **Die wichtigste Team-Regel:** Teilt funktionierende Prompts untereinander und verlasst euch nie blind auf generierten Code – testet immer selbst!

---

## 3. Allgemeine Projektsteuerung & Git

* **Product Goal:** Behaltet das Hauptziel  im Auge. Sagt "Nein" zu unwichtigen Zusatz-Features .
* **Repo-Steuerung (Git):** Einigt euch auf einen sauberen Workflow (z. B. Feature-Branches). **Niemand pusht direkt in den `main`-Branch!** Nutzt immer Pull/Merge Requests.

---

## 4. Offene Fragen für das Kick-off am Freitag ❓
*(Diese Punkte könnt ihr direkt beim Kunden/Betreuer klären)*

1. Welches CMS (Content Management System) läuft auf der Testseite? (z. B. WordPress, Typo3?)
2. Welche KI-Schnittstelle sollen/dürfen wir verwenden, und wer stellt den API-Key?
3. Gibt es bereits Vorgaben für den Tech-Stack ?
4. Woher sollen die SEO-Keywords initial kommen? (Eigene Eingabe vs. externe SEO-API)# Leitfaden: IT-Schulprojekt mit KI-Unterstützung

## 1. KI-gestützte Teamentwicklung

*   **Planung & Architektur:** Nutzt KI zu Beginn für Brainstorming, API-Entwürfe, Datenbankmodelle und um das Projekt in kleine Aufgabenpakete zu zerlegen.
*   **Coding-Assistenten (Copilots):** Integriert Tools wie GitHub Copilot, Cursor oder Codeium in die IDE für Autovervollständigung und Standard-Code (Boilerplate).
*   **Debugging:** Kopiert fehlerhaften Code und Fehlermeldungen in die KI. Lasst euch die Ursache *erklären*, anstatt nur die Lösung zu kopieren.
*   **Code Reviews:** Lasst die KI vor dem Mergen über den Code schauen, um logische Fehler, unsaubere Struktur oder Performance-Probleme aufzudecken.
*   **Dokumentation:** Generiert Code-Kommentare und Projekt-Dokumentationen (z.B. READMEs) aus dem fertigen Code mithilfe von KI.

> ⚠️ **Die wichtigste Team-Regel:** Teilt funktionierende Prompts untereinander und verlasst euch nie blind auf generierten Code – testet immer selbst!

---

## 2. Vorab zu beachten (Projektvorbereitung)

*   **Fachliches Konzept:** Klärt genau, *welches* Problem ihr löst und wie der Ablauf für den Nutzer aussieht, bevor Code geschrieben wird.
*   **Anforderungen und UAT (User Acceptance Testing):** Haltet schriftlich fest, was die Software können muss. Definiert Kriterien, ab wann ein Feature als "erfolgreich getestet und fertig" gilt.
*   **Technischer Entwurf:** Skizziert die grundlegende Architektur (Datenbank-Modelle, Schnittstellen) grob und fixiert euren Tech-Stack.
*   **Product Goal:** Definiert ein klares, gemeinsames Hauptziel. Das hilft, "Nein" zu unwichtigen Zusatz-Features zu sagen, wenn die Zeit knapp wird.
*   **KI-Steuerung:** Legt Regeln für die KI-Nutzung fest (kein blindes Copy-Paste, Code muss verstanden werden, Review-Pflicht durch ein Teammitglied).
*   **Repo-Steuerung (Git):** Einigt euch auf einen sauberen Workflow (z. B. Feature-Branches). **Niemand pusht direkt in den `main`-Branch!** Nutzt immer Pull/Merge Requests.
