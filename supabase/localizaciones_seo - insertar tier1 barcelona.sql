-- ==============================================================================
-- SEMILLA DE DATOS: BARCELONA TIER 1 (ANEXO II - PLAN V4.5)
-- ==============================================================================

-- 1. LIMPIEZA PREVIA DE BARCELONA (Para evitar duplicados al regenerar)
-- DELETE FROM localizaciones_seo WHERE slug LIKE 'barcelona%';
-- DELETE FROM centros_metadata WHERE town = 'Barcelona'; -- Opcional, cuidado si hay datos manuales

-- ==============================================================================
-- 2. JERARQUÍA SEO (TABLA localizaciones_seo)
-- ==============================================================================

-- A. LA "HOME" DE BARCELONA (Nivel Ciudad / Provincia)
INSERT INTO localizaciones_seo 
(slug, parent_slug, nombre_visible, query_filter, tier_classification, seo_title, h1_hero, copy_contextual)
VALUES 
(
    'barcelona', 
    NULL, -- Raíz de zona
    'Barcelona Ciudad', 
    $$province ILIKE 'Barcelona' AND town ILIKE 'Barcelona'$$, 
    'tier1.a', 
    'Dentistas en Barcelona: Precios Pactados DKV y Red Propia | Bernardo Sobrecasas',
    'TU DENTISTA EN BARCELONA CIUDAD',
    'Cobertura total en los 10 distritos y 73 barrios de Barcelona. Acceso a la red de Espacios de Salud DKV (Gran Via, Urgell, Meridiana) y clínicas de referencia.'
)
ON CONFLICT (slug) DO UPDATE SET 
    nombre_visible = EXCLUDED.nombre_visible,
    query_filter = EXCLUDED.query_filter,
    seo_title = EXCLUDED.seo_title,
    h1_hero = EXCLUDED.h1_hero,
    copy_contextual = EXCLUDED.copy_contextual;


-- B. LOS 4 MACRO-HUBS ESTRATÉGICOS (Agrupación de Distritos según Anexo II)

-- HUB 1: CENTRO-EIXAMPLE (Perfil: Executive & Tourism)
INSERT INTO localizaciones_seo 
(slug, parent_slug, nombre_visible, query_filter, tier_classification, seo_title, h1_hero, copy_contextual)
VALUES 
(
    'barcelona-centro-eixample', 
    'barcelona', 
    'Barcelona Centro y Eixample', 
    $$postal_code IN ('08001', '08002', '08007', '08008', '08009', '08010', '08011', '08013', '08015', '08036', '08037')$$, 
    'tier1.a', 
    'Dentistas en Eixample y Ciutat Vella: Urgencias y Estética | DKV',
    'TU DENTISTA EN BARCELONA CENTRO Y EIXAMPLE',
    'Centro insignia en Gran Via 637, situado entre Plaça de Catalunya y el Passeig de Gràcia, a 2 min de la Casa Batlló. Soluciones rápidas para perfiles ejecutivos.'
)
ON CONFLICT (slug) DO UPDATE SET copy_contextual = EXCLUDED.copy_contextual, query_filter = EXCLUDED.query_filter;

-- HUB 2: ZONA ALTA - LES CORTS (Perfil: Premium)
INSERT INTO localizaciones_seo 
(slug, parent_slug, nombre_visible, query_filter, tier_classification, seo_title, h1_hero, copy_contextual)
VALUES 
(
    'barcelona-zona-alta-les-corts', 
    'barcelona', 
    'Barcelona Zona Alta y Les Corts', 
    $$postal_code IN ('08006', '08017', '08021', '08022', '08028', '08029', '08034')$$, 
    'tier1.a', 
    'Dentista en Sarrià-Sant Gervasi y Les Corts: Calidad Premium | DKV',
    'TU DENTISTA EN LA ZONA ALTA DE BARCELONA',
    'Excelencia en el entorno de la Clínica Corachan y Tres Torres. Foco en estética avanzada y red hospitalaria de referencia (Dexeus/Corachan).'
)
ON CONFLICT (slug) DO UPDATE SET copy_contextual = EXCLUDED.copy_contextual, query_filter = EXCLUDED.query_filter;

-- HUB 3: MAR - SANT MARTÍ - SANT ANDREU (Perfil: Digital & New Family)
INSERT INTO localizaciones_seo 
(slug, parent_slug, nombre_visible, query_filter, tier_classification, seo_title, h1_hero, copy_contextual)
VALUES 
(
    'barcelona-mar-sant-marti-andreu', 
    'barcelona', 
    'Barcelona Mar: Sant Martí y Sant Andreu', 
    $$postal_code IN ('08005', '08018', '08019', '08020', '08026', '08027', '08030')$$, 
    'tier1.a', 
    'Dentista en Sant Martí y Sant Andreu: Tecnología 3D | DKV',
    'TU DENTISTA EN BARCELONA MAR Y SANT MARTÍ',
    'Ubicada junto al gran intercambiador de La Sagrera y el eje tecnológico 22@. Especialistas en tecnología 3D y atención a nuevas familias (menores incluidos).'
)
ON CONFLICT (slug) DO UPDATE SET copy_contextual = EXCLUDED.copy_contextual, query_filter = EXCLUDED.query_filter;

-- HUB 4: BARRIS - GRÀCIA - SANTS - HORTA (Perfil: Tradición & Barrio)
INSERT INTO localizaciones_seo 
(slug, parent_slug, nombre_visible, query_filter, tier_classification, seo_title, h1_hero, copy_contextual)
VALUES 
(
    'barcelona-barris-gracia-horta-sants', 
    'barcelona', 
    'Barcelona Barris: Gràcia, Sants y Horta', 
    $$postal_code IN ('08004', '08012', '08014', '08016', '08023', '08024', '08031', '08032', '08033', '08035', '08038', '08041', '08042')$$, 
    'tier1.a', 
    'Dentista en Gràcia, Sants y Horta: Proximidad | DKV',
    'TU DENTISTA EN LOS BARRIOS DE BARCELONA (GRÀCIA - SANTS)',
    'Tradición junto a la Plaça de Lesseps (Gràcia) o frente al Parc de l''Espanya Industrial en Sants. Clínicas de barrio con la garantía DKV.'
)
ON CONFLICT (slug) DO UPDATE SET copy_contextual = EXCLUDED.copy_contextual, query_filter = EXCLUDED.query_filter;


-- ==============================================================================
-- 3. METADATOS DE CLÍNICAS (TABLA centros_metadata)
-- Inyección de "Almas Locales" (Textos de Autoridad del Anexo II)
-- ==============================================================================

-- Nota técnica: Usamos MD5(nombre) como hash temporal. Asegurar coincidencia con nombre real en medical_directory_raw.

-- HUB 1: CENTRO-EIXAMPLE
INSERT INTO centros_metadata (clinic_hash, name, address, town, cp, localized_anchor, is_dkv_propio) VALUES
(md5('Clínica Dental Davos'), 'Clínica Dental Davos', 'Carrer de Pelai', 'Barcelona', '08001', 'En plena calle Pelai, el eje comercial que une Plaça de Catalunya con las Ramblas, a solo 2 minutos del Mercat de la Boqueria.', false),
(md5('Espai de Salut DKV Gran Via'), 'Espai de Salut DKV Gran Via', 'Gran Via de les Corts Catalanes 637', 'Barcelona', '08010', 'Nuestro centro insignia en la Gran Via, situado entre la Plaça de Catalunya y el Passeig de Gràcia.', true),
(md5('Espai de Salut DKV Urgell'), 'Espai de Salut DKV Urgell', 'Comte d''Urgell', 'Barcelona', '08036', 'Situada en el corazón de l''Esquerra de l''Eixample, a un paso del Mercat del Ninot y muy cerca del Hospital Clínic (L5).', true),
(md5('ADDSANA Espai de Salut París'), 'ADDSANA Espai de Salut París', 'Carrer de París', 'Barcelona', '08029', 'Ubicada en la calle París, a escasos metros de la Avinguda Diagonal y la zona comercial de Francesc Macià.', false),
(md5('Hospital HM Nens'), 'Hospital HM Nens', 'Carrer del Consell de Cent', 'Barcelona', '08009', 'Referencia en odontopediatría situada en la calle Consell de Cent, junto al Passeig de Sant Joan y el Arc de Triomf.', false),
(md5('Clínica López Giménez'), 'Clínica López Giménez', 'Carrer del Consell de Cent', 'Barcelona', '08007', 'Atención especializada en el centro de la ciudad, muy cerca de la Casa Batlló y el Passeig de Gràcia.', false),
(md5('Clínica Pejoan'), 'Clínica Pejoan', 'Carrer del Rosselló', 'Barcelona', '08037', 'Excelencia dental en l''Eixample Dreta, situada en el entorno de la calle Rosselló y la parada de metro Girona (L4).', false)
ON CONFLICT (clinic_hash) DO UPDATE SET localized_anchor = EXCLUDED.localized_anchor;

-- HUB 2: ZONA ALTA
INSERT INTO centros_metadata (clinic_hash, name, address, town, cp, localized_anchor, is_dkv_propio) VALUES
(md5('Institut Odontològic Bonanova'), 'Institut Odontològic Bonanova', 'Passeig de la Bonanova', 'Barcelona', '08017', 'Ubicada en el exclusivo barrio de La Bonanova, junto a la histórica plaza de la Bonanova y muy cerca de la Vía Augusta.', false),
(md5('Institut Raslan'), 'Institut Raslan', 'Carrer de Ganduxer', 'Barcelona', '08021', 'En el eje de la calle Ganduxer, una de las zonas más prestigiosas de Sarrià-Sant Gervasi, con fácil acceso desde el Turó Park.', false),
(md5('Oris Clin. Esp. Odontològiques'), 'Oris Clin. Esp. Odontològiques', 'Carrer de Joan Güell', 'Barcelona', '08028', 'Referencia dental en Les Corts, situada en la calle Joan Güell, estratégicamente entre la Estación de Sants y L''illa Diagonal.', false),
(md5('Grup Doctor Blade'), 'Grup Doctor Blade', 'Carrer de Numància', 'Barcelona', '08029', 'En el barrio de Les Corts, situada en el eje de la calle Numància, a pocos minutos del centro financiero de la Avenida Diagonal.', false),
(md5('Masip Santurio, Carlos'), 'Masip Santurio, Carlos', 'Via Augusta', 'Barcelona', '08017', 'Odontología de confianza en la zona alta, cerca del Passeig de la Bonanova y perfectamente comunicada con los Ferrocarrils.', false)
ON CONFLICT (clinic_hash) DO UPDATE SET localized_anchor = EXCLUDED.localized_anchor;

-- HUB 3: MAR - SANT MARTÍ
INSERT INTO centros_metadata (clinic_hash, name, address, town, cp, localized_anchor, is_dkv_propio) VALUES
(md5('Espai de Salut DKV Meridiana'), 'Espai de Salut DKV Meridiana', 'Avinguda Meridiana', 'Barcelona', '08027', 'Situada junto al gran intercambiador de La Sagrera, nuestro centro propio da cobertura integral a los vecinos del eje Meridiana.', true),
(md5('Centro Médico Villa Olímpica'), 'Centro Médico Villa Olímpica', 'Carrer de Ramon Turró', 'Barcelona', '08005', 'Salud bucodental junto al Port Olímpic, a escasos metros de la Platja de la Nova Icària y el centro de la Vila.', false),
(md5('Centre Mèdic Dental Sant Jordi'), 'Centre Mèdic Dental Sant Jordi', 'Carrer de Sant Antoni Maria Claret', 'Barcelona', '08025', 'Ubicada en el barrio del Clot, a un paso del Hospital de la Santa Creu i Sant Pau (Patrimonio de la Humanidad).', false),
(md5('Martínez Ramos, Luis'), 'Martínez Ramos, Luis', 'Rambla del Poblenou', 'Barcelona', '08005', 'Atención profesional en el entorno de la Rambla del Poblenou, muy cerca de la calle Lope de Vega y el distrito tecnológico 22@.', false)
ON CONFLICT (clinic_hash) DO UPDATE SET localized_anchor = EXCLUDED.localized_anchor;

-- HUB 4: BARRIS (GRÀCIA / SANTS)
INSERT INTO centros_metadata (clinic_hash, name, address, town, cp, localized_anchor, is_dkv_propio) VALUES
(md5('Clínica Dental Elisa'), 'Clínica Dental Elisa', 'Carrer d''Elisa', 'Barcelona', '08023', 'Tradición de barrio junto a la Plaça de Lesseps, la puerta de entrada a la zona bohemia de la Vila de Gràcia.', false),
(md5('Centro Médico Hostafrancs'), 'Centro Médico Hostafrancs', 'Carrer de Bejar', 'Barcelona', '08014', 'Tu centro de salud en el corazón de Sants, muy cerca del histórico Mercat d''Hostafrancs y la Plaça d''Espanya.', false),
(md5('Clínica Dental Aarvo-Suisse Badal'), 'Clínica Dental Aarvo-Suisse Badal', 'Rambla de Badal', 'Barcelona', '08014', 'Situada en la Rambla de Badal, el pulmón comercial de Sants, con excelente conexión con el barrio de Sants-Badal.', false)
ON CONFLICT (clinic_hash) DO UPDATE SET localized_anchor = EXCLUDED.localized_anchor;