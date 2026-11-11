// Alle Angaben zum erfundenen Betrieb stehen hier an einer Stelle.
// Wer hier etwas ändert, ändert es automatisch auf allen Seiten.

export type Leistung = {
  slug: string; // Teil der Adresse, nur Kleinbuchstaben, Zahlen und Bindestriche
  titel: string;
  kurz: string; // ein Satz für die Übersicht auf der Startseite
  absaetze: string[]; // Text auf der Leistungsseite
};

export type Betrieb = {
  name: string;
  region: string;
  beschreibung: string;
  adresse: string;
  telefon: string;
  email: string;
  oeffnungszeiten: string;
  leistungen: Leistung[];
};

export const betrieb: Betrieb = {
  name: "Malerei Beispiel",
  region: "Wels und Umgebung",
  beschreibung:
    "Wir sind ein kleiner Malerbetrieb aus Wels. Wir streichen Wohnräume, Fassaden und tapezieren, für Privatkunden und kleine Betriebe in der Region.",
  adresse: "Musterstraße 1, 4600 Wels",
  telefon: "+43 000 000000",
  email: "office@example.com",
  oeffnungszeiten: "Montag bis Freitag, 7 bis 16 Uhr",
  leistungen: [
    {
      slug: "innenanstrich",
      titel: "Innenanstrich",
      kurz: "Wände und Decken in Wohnräumen, sauber abgedeckt und termingerecht.",
      absaetze: [
        "Beim Innenanstrich streichen wir Wände und Decken in Wohnungen, Häusern und Büros. Vorher decken wir Böden und Möbel ab und kleben Kanten sauber ab.",
        "Risse und kleine Löcher spachteln wir vor dem Streichen. So wird die Oberfläche gleichmäßig und die Farbe hält länger.",
        "Bei der Farbwahl beraten wir vor Ort. Wir verwenden auf Wunsch emissionsarme Farben, die sich für Kinderzimmer und Schlafräume eignen.",
      ],
    },
    {
      slug: "fassadenanstrich",
      titel: "Fassadenanstrich",
      kurz: "Schutz und neues Aussehen für die Außenwand Ihres Hauses.",
      absaetze: [
        "Eine Fassade ist Regen, Sonne und Frost ausgesetzt. Ein neuer Anstrich schützt das Mauerwerk und frischt das Aussehen des Hauses auf.",
        "Vor dem Streichen prüfen wir den Untergrund, reinigen die Fassade und bessern Schäden im Putz aus. Erst dann tragen wir Grundierung und Farbe auf.",
        "Für die Arbeiten in größerer Höhe stellen wir ein Gerüst auf. Die beste Zeit für Fassadenarbeiten ist zwischen Frühling und Herbst.",
      ],
    },
    {
      slug: "tapezieren",
      titel: "Tapezieren",
      kurz: "Alte Tapeten entfernen und neue anbringen, von Raufaser bis Vlies.",
      absaetze: [
        "Wir entfernen alte Tapeten und bereiten die Wand vor, damit die neue Tapete glatt sitzt und sich nicht ablöst.",
        "Ob Raufaser zum Überstreichen, Vliestapete oder Mustertapete: Wir beraten, welche Tapete zu Raum und Nutzung passt.",
        "Besonders bei Mustertapeten achten wir darauf, dass die Bahnen exakt aneinander passen und das Muster durchläuft.",
      ],
    },
  ],
};