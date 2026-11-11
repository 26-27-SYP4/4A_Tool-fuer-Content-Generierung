-- 1. Tabelle: Kunden
-- Speichert die Basisdaten der Unternehmen und ihr von der KI generiertes Profil
create table kunden (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    url text not null,
    profil jsonb,
    startbegriffe jsonb,
    created_at timestamptz default now()
);

-- 2. Tabelle: Crawl_Seiten
-- Speichert die eingelesenen Unterseiten eines Kunden für die Profil-Erstellung
create table crawl_seiten (
    id uuid primary key default gen_random_uuid(),
    kunde_id uuid references kunden(id) on delete cascade not null,
    url text not null,
    titel text,
    inhalt text,
    created_at timestamptz default now()
);

-- 3. Tabelle: Suchbegriffe
-- Speichert die von Mangools recherchierten Keywords inkl. Metriken
create table suchbegriffe (
    id uuid primary key default gen_random_uuid(),
    kunde_id uuid references kunden(id) on delete cascade not null,
    begriff text not null,
    suchvolumen integer,
    schwierigkeit integer,
    ausgewaehlt boolean default false,
    created_at timestamptz default now(),
    -- Ein Suchbegriff darf pro Kunde nur einmal vorkommen
    unique (kunde_id, begriff)
);

-- 4. Tabelle: Vorlagen
-- Speichert die Prompts und Block-Strukturen (Wireframes) für Gemini
create table vorlagen (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    prompt_1 text,
    prompt_2 text,
    wireframe jsonb,
    created_at timestamptz default now()
);

-- 5. Tabelle: Beitraege
-- Speichert die fertigen KI-Blogartikel mit strikten SEO-Vorgaben
create table beitraege (
    id uuid primary key default gen_random_uuid(),
    kunde_id uuid references kunden(id) on delete cascade not null,
    suchbegriff_id uuid references suchbegriffe(id) on delete set null,
    slug text not null,
    titel text not null,
    meta_titel text not null,
    meta_beschreibung text not null,
    inhalt jsonb not null,
    status text not null default 'entwurf',
    created_at timestamptz default now(),
    
    -- Ein Keyword führt exakt zu einem Artikel
    unique (suchbegriff_id),
    -- Die URL (Slug) des Artikels muss pro Kunde eindeutig sein
    unique (kunde_id, slug),
    -- Status darf nur einen dieser drei Werte haben
    check (status in ('entwurf', 'veroeffentlicht', 'offline')),
    -- Sinnvolle SEO-Längenbegrenzungen (Title ~60, Desc ~160, H1 ~100)
    check (char_length(titel) <= 100),
    check (char_length(meta_titel) <= 60),
    check (char_length(meta_beschreibung) <= 160)
);

-- 6. Tabelle: Bilder
-- Speichert die Referenzen auf die generierten WebP-Bilder im Storage
create table bilder (
    id uuid primary key default gen_random_uuid(),
    beitrag_id uuid references beitraege(id) on delete cascade not null,
    storage_pfad text not null,
    breite integer,
    format text default 'webp',
    created_at timestamptz default now()
);


-- RLS (Row Level Security) aktivieren
-- Schützt alle Tabellen standardmäßig vor unbefugtem Zugriff
alter table kunden enable row level security;
alter table crawl_seiten enable row level security;
alter table suchbegriffe enable row level security;
alter table vorlagen enable row level security;
alter table beitraege enable row level security;
alter table bilder enable row level security;


-- Richtlinien (Policies) für angemeldete Nutzer (Mitarbeiter im Tool)
-- Dürfen alles (Lesen, Schreiben, Ändern, Löschen) auf allen Tabellen
create policy "Angemeldete Nutzer duerfen alles auf Kunden" on kunden for all to authenticated using (true);
create policy "Angemeldete Nutzer duerfen alles auf Crawl_Seiten" on crawl_seiten for all to authenticated using (true);
create policy "Angemeldete Nutzer duerfen alles auf Suchbegriffe" on suchbegriffe for all to authenticated using (true);
create policy "Angemeldete Nutzer duerfen alles auf Vorlagen" on vorlagen for all to authenticated using (true);
create policy "Angemeldete Nutzer duerfen alles auf Beitraege" on beitraege for all to authenticated using (true);
create policy "Angemeldete Nutzer duerfen alles auf Bilder" on bilder for all to authenticated using (true);


-- Richtlinie (Policy) für unangemeldete Nutzer (Besucher der Testseite)
-- Dürfen NUR freigegebene Beiträge lesen (keine Entwürfe, keine Kundendaten etc.)
create policy "Oeffentlichkeit darf veroeffentlichte Beitraege lesen" 
on beitraege for select to anon 
using (status = 'veroeffentlicht');


-- Storage Bucket anlegen (für die generierten WebP-Bilder)
insert into storage.buckets (id, name, public) 
values ('blog-images', 'blog-images', true);

-- Storage-Richtlinien für den Bucket
-- Jeder (Besucher) darf die Bilder sehen
create policy "Jeder darf Bilder ansehen" 
on storage.objects for select to public 
using (bucket_id = 'blog-images');

-- Nur angemeldete Nutzer (Tool) dürfen Bilder hochladen/löschen
create policy "Nur Angemeldete duerfen Bilder hochladen" 
on storage.objects for all to authenticated 
using (bucket_id = 'blog-images');