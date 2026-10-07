# Arbeiten mit KI

SEO-Blog-Werkstatt · HTL Grieskirchen · Oct 7, 2026

KI hilft uns beim Planen, Programmieren, Fehlersuchen, Prüfen und Dokumentieren. Die Verantwortung für jede Zeile Code bleibt aber bei uns.

## Grundregeln

Diese Regeln gelten für jede Art von KI-Nutzung im Projekt, egal mit welchem Werkzeug.

1. **Verstehen vor Übernehmen.** Wer Code einreicht, muss jede Zeile erklären können. Was man nicht versteht, lässt man sich von der KI erklären, bevor es ins Repo kommt.
2. **Selbst testen.** KI-Code gilt erst als fertig, wenn wir ihn lokal ausgeführt und das Ergebnis geprüft haben.
3. **Review durch einen Menschen.** Jeder Pull Request wird von einem anderen Teammitglied gelesen und freigegeben. Niemand pusht direkt auf `main`.
4. **Vorgaben schlagen KI.** Wenn ein KI-Vorschlag den Projektvorgaben von KRUG widerspricht, gelten die Vorgaben.
5. **Keine Geheimnisse an die KI.** API-Schlüssel und Passwörter stehen nur in `.env.local` und werden nie in einen Chat kopiert oder committet.
6. **Funktionierende Prompts teilen.** Was gut funktioniert hat, kommt in die gemeinsame Prompt-Sammlung.

## Planung & Architektur

Am Anfang jeder größeren Aufgabe nutzen wir KI zum Denken, nicht zum Programmieren. Ziel ist ein Plan, den wir verstehen und prüfen können.

**Wofür wir KI hier einsetzen:**

- **Aufgaben zerlegen:** Ein großes Feature in kleine Pakete aufteilen, die in ein bis zwei Arbeitssitzungen fertig werden. Daraus werden GitHub-Issues.
- **Datenbank entwerfen:** Tabellen, Beziehungen und Zugriffsregeln (RLS) aus den Vorgaben ableiten und als Migration vorbereiten.
- **Schnittstellen planen:** Welche Funktion ruft welchen Dienst auf, was geht hinein, was kommt zurück.
- **Risiken finden:** Die KI fragen, was an einem Plan schiefgehen kann, bevor wir ihn umsetzen.

**So gehen wir vor:**

1. Die passende Stelle aus den Projektvorgaben mitgeben, nicht nur aus dem Gedächtnis beschreiben.
2. Die KI zuerst einen Plan schreiben lassen, ohne Code.
3. Den Plan gegen die Vorgaben prüfen und Widersprüche streichen.
4. Erst dann umsetzen.

**Warum das wichtig ist:** Unsere erste KI-Diskussion zum Projekt hat C#, WordPress und OpenAI vorgeschlagen. Die Vorgaben verlangen Next.js, Supabase und Gemini. Ohne Abgleich hätten wir in die falsche Richtung gearbeitet.

## Coding-Assistenten

Wir setzen zwei Arten von Werkzeugen ein: Vervollständigung direkt im Editor und Agenten, die ganze Aufgaben im Projektordner erledigen. Für Boilerplate wie Komponenten-Gerüste, Typen und Supabase-Abfragen sind beide stark, bei Logik wie der Keyword-Vorauswahl prüfen wir besonders genau.

| Werkzeug | Wofür | Zugang |
| --- | --- | --- |
| [GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/enable-copilot/set-up-for-students) | Vorschläge beim Tippen und Chat in VS Code | Gratis für verifizierte Schüler über GitHub Education |
| [Claude Code](https://code.claude.com/docs/en/setup.md) | Agent im Projektordner: liest Code, ändert Dateien, führt Befehle aus | Braucht einen bezahlten Claude-Account, der Gratis-Plan reicht nicht |
| Claude (Chat) | Planen, Erklären, Fragen zu Fehlern | Gratis-Plan reicht für die meisten Fragen |

Nicht jeder muss jedes Werkzeug haben. Wichtig ist nur, dass alle Ergebnisse über Git und Pull Requests ins Projekt kommen.

**Einrichtung im Team:**

- Die Projektregeln stehen als Datei im Repo, damit jedes Werkzeug sie kennt: `CLAUDE.md` für Claude Code und `.github/copilot-instructions.md` für Copilot. Beide enthalten dieselben Kernregeln: Next.js mit TypeScript, Ordnerstruktur `tool/`, `testseite/`, `supabase/`, das Block-Schema, keine Schlüssel im Code, österreichisches Deutsch.
- Persönliche Einstellungen bleiben lokal, zum Beispiel in `CLAUDE.local.md`, das in `.gitignore` steht.
- `.env.local` steht ebenfalls in `.gitignore`. Agenten sehen alle Dateien im Ordner, Schlüssel dürfen trotzdem nie ins Repo.

**Arbeitsablauf mit einem Agenten:**

1. Issue auswählen, eigenen Branch anlegen.
2. Den Agenten zuerst einen Plan schreiben lassen und diesen lesen.
3. Umsetzen lassen, dabei Änderungen mitlesen.
4. Selbst testen, Unklares erklären lassen.
5. Pull Request aufmachen.

## Debugging

Bei Fehlern nutzen wir KI, um die Ursache zu verstehen, nicht nur um den Fehler wegzubekommen. Wer nur die Lösung kopiert, steht beim nächsten ähnlichen Fehler wieder am Anfang.

**Was die KI von uns bekommt:**

- Die vollständige Fehlermeldung, nicht nur die letzte Zeile.
- Den betroffenen Code und die Datei, in der er steht.
- Was wir erwartet haben und was stattdessen passiert ist.
- Was wir schon ausprobiert haben.

**So gehen wir vor:**

1. Zuerst fragen: "Was ist die Ursache und warum?" Erst danach nach einer Lösung fragen.
2. Die Erklärung in eigenen Worten nachvollziehen können.
3. Die Lösung einbauen und den Fehlerfall erneut testen.
4. Wenn die Lösung nicht hilft, nicht blind weiter probieren lassen. Nach zwei Versuchen zurück zur Ursache.

**Typische Fälle in unserem Projekt:**

- **Gemini liefert kein gültiges JSON:** die rohe Antwort mitgeben, nicht nur den Parse-Fehler.
- **Mangools antwortet mit 429:** prüfen, ob es RateLimit oder CreditLimit ist, das wird laut Vorgaben unterschiedlich behandelt.
- **Supabase gibt leere Ergebnisse:** oft liegt es an den RLS-Regeln, nicht an der Abfrage.

Keine Schlüssel und keine echten Kundendaten in Fehlermeldungen an die KI weitergeben. Vorher unkenntlich machen.

## Code Reviews

Vor jedem Merge gibt es zwei Reviews: zuerst durch die KI, dann durch ein Teammitglied. Das KI-Review ersetzt das menschliche nicht, es macht es nur schneller.

**Schritt 1: KI-Review durch den Autor.** Bevor der Pull Request aufgeht, lässt der Autor die KI über die Änderungen schauen und fragt gezielt nach:

- Logikfehlern und vergessenen Sonderfällen, zum Beispiel leere Listen oder fehlende Werte.
- Abweichungen von den Projektvorgaben, etwa Feldlängen, Block-Typen oder Statuswerte.
- Schlüsseln oder Adressen, die im Code statt in Umgebungsvariablen stehen.
- Unsauberer Struktur, doppeltem Code und unnötig komplizierten Stellen.

Berechtigte Punkte behebt der Autor selbst. Unpassende Vorschläge darf er ablehnen.

**Schritt 2: Review durch ein Teammitglied.** Ein anderes Teammitglied liest den Pull Request und prüft:

- Versteht der Autor seinen Code? Im Zweifel nachfragen.
- Läuft es lokal? Bei größeren Änderungen selbst ausprobieren.
- Passt es zum Rest des Projekts?

Erst nach Freigabe durch einen Menschen wird nach `main` gemergt.

## Dokumentation

KI schreibt erste Entwürfe für Kommentare und Dokumente aus dem fertigen Code. Wir prüfen jeden Entwurf, bevor er ins Repo kommt, weil KI gern Dinge beschreibt, die der Code gar nicht tut.

| Was | Wer schreibt | Was wir prüfen |
| --- | --- | --- |
| Code-Kommentare | KI-Entwurf, Autor prüft | Stimmt der Kommentar mit dem Code überein? Erklärt er das Warum, nicht nur das Was? |
| README.md | KI-Entwurf aus dem Code | Node.js-Version, Startbefehle und alle Umgebungsvariablen vollständig, wie KRUG es verlangt |
| `.env.example` | KI listet Variablen auf | Alle Variablen drin, keine Werte |
| Pull-Request-Beschreibung | KI-Entwurf aus den Änderungen | Beschreibt sie, was wirklich geändert wurde? |
| Projekt-Dokumente für die Schule | Wir selbst, KI hilft beim Formulieren | Eigene Inhalte und Entscheidungen, keine erfundenen Angaben |

**Unsere Regel:** In die Doku kommt nur, was wir selbst geprüft haben. Was nicht stimmt, wird gelöscht, nicht abgeschwächt.

Die README testen wir am Ende so, wie KRUG es tut: leeres Supabase-Projekt, Schritte aus der README genau befolgen, einen Durchlauf komplett machen.

## Gute Prompts

Ein guter Prompt gibt der KI den Kontext, den ein neues Teammitglied bräuchte. Je genauer die Aufgabe, desto weniger müssen wir nachbessern.

**Aufbau eines Prompts:**

1. **Kontext:** Welcher Teil des Projekts, welche Dateien, welche Stelle der Vorgaben.
2. **Aufgabe:** Was genau soll entstehen oder geklärt werden.
3. **Grenzen:** Was die KI nicht tun soll, zum Beispiel keine neuen Bibliotheken oder keine Änderungen außerhalb von `tool/`.
4. **Ergebnis:** In welcher Form wir die Antwort wollen, etwa zuerst ein Plan oder nur eine Erklärung.

**Beispiel:**

```markdown
Kontext: tool/, Next.js mit TypeScript. Abschnitt 4.3 der KRUG-Vorgaben (Vorauswahl) liegt bei.
Aufgabe: Schreib eine Funktion, die Keywords nach den sechs Regeln aus 4.3 filtert.
Grenzen: Keine externen Bibliotheken. Keine Aufrufe an Mangools oder Gemini.
Ergebnis: Zuerst ein kurzer Plan, dann die Funktion mit Unit-Tests für jede Regel.
```

**Gemeinsame Prompt-Sammlung:** Prompts, die gut funktioniert haben, kommen in `docs/prompts.md` im Repo. Pro Eintrag: wofür der Prompt ist, der Prompt selbst und worauf man beim Ergebnis achten muss.
