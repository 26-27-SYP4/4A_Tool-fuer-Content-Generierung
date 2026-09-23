# Leitfaden: IT-Schulprojekt mit KI-Unterstützung

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
