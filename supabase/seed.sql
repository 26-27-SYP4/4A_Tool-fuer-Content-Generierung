-- Start-Vorlage für die Content-Generierung
insert into vorlagen (name, prompt_1, prompt_2, wireframe)
values (
  'Ratgeber Standard (Version 1)',
  'Analysiere den folgenden Website-Text und erstelle ein JSON-Profil mit Zielgruppe, Leistungen und SEO-Startbegriffen.',
  'Schreibe einen SEO-optimierten Blogbeitrag zum Keyword. Nutze ausschließlich die Block-Typen: Überschriften, Absätze, Bilder, Listen und FAQ. Liefere das Ergebnis als JSON inkl. Bildbeschreibungen.',
  '{"erlaubte_bloecke": ["ueberschrift", "absatz", "bild", "liste", "faq"]}'::jsonb
);