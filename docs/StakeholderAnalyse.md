# Stakeholderanalyse: SEO-Blog-Tool

## 1. Übersicht der Stakeholder

| Stakeholder | Rolle  | Art | Einfluss | Interesse |
| :--- | :--- | :--- | :--- | :--- |
| **KRUG software solutions GmbH** | Auftraggeber (Jonas Kreuzhuber & Michael Gründlinger) | Extern | Hoch | Hoch |
| **Content-Mitarbeiter (KRUG)** | Zukünftige Endnutzer des Tools | Extern | Mittel | Hoch |
| **Endkunden von KRUG** | Firmen (z. B. eine Tischlerei), für die Blogs erstellt werden | Extern | Niedrig | Hoch |
| **API-Anbieter (Mangools, Google)** | Externe Dienstleister für SEO-Daten & KI (Gemini) | Extern | Mittel | Niedrig |
| **Supabase** | Backend- und Datenbank-Provider | Extern | Niedrig | Niedrig |

---

## 2. Detaillierte Analyse & Erwartungshaltungen

### 2.1 Auftraggeber: KRUG software solutions GmbH
* **Ziele & Erwartungen:** 
  * Reduktion des manuellen Aufwands bei der SEO-Recherche und Texterstellung.
  * Kosteneffizienz: API-Aufrufe (besonders Mangools) müssen streng limitiert und im Code gefiltert werden.
  * Wahrheitstreue: Die KI darf keine Fakten  erfinden.
  * Saubere Abgabe nach Vorgaben.
* **Risiken:** Bei Nicht-Erfüllung der Vorgaben wird das Tool für das Unternehmen unbrauchbar.

### 2.2 Content-Mitarbeiter (KRUG) / Endnutzer
* **Ziele & Erwartungen:**
  * Intuitive Benutzeroberfläche.
  * Deutliche Arbeitserleichterung durch sinnvolle Keyword-Vorauswahl und KI-Generierung.
  * Flexibler Editor, um die 5 Block-Typen des KI-Textes einfach nachzubearbeiten.
* **Risiken:** Geringe Akzeptanz, falls das Tool zu fehleranfällig ist oder die KI schlechte Texte (Halluzinationen) liefert.

### 2.3 Endkunden von KRUG (z. B. Tischlerei Holzwerk)
* **Ziele & Erwartungen:**
  * Mehr Sichtbarkeit und Traffic auf der eigenen Website (besseres Google-Ranking).
  * Fachlich korrekte, authentische Ratgeber-Texte, die zur eigenen Unternehmens-Tonalität passen.
* **Risiken:** Reputationsverlust, falls die KI falsche Versprechungen (z. B. falsche Preise) im Namen der Firma veröffentlicht.

### 2.4 Externe API-Dienstleister (Mangools, Gemini)
* **Ziele & Erwartungen:**
  * Einhaltung der API-Richtlinien und Rate-Limits
* **Risiken:** Sperrung der API-Keys bei missbräuchlicher oder fehlerhafter Nutzung (z. B. Endlosschleifen im Code).




