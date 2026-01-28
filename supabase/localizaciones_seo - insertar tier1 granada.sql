-- ==============================================================================
-- SEMILLA DE DATOS: GRANADA TIER 1 (ANEXO III - PLAN V4.5)
-- ==============================================================================

-- 1. LIMPIEZA PREVIA DE GRANADA
-- DELETE FROM localizaciones_seo WHERE slug LIKE 'granada%';

-- ==============================================================================
-- 2. JERARQUÍA SEO (TABLA localizaciones_seo)
-- ==============================================================================

-- A. LA "HOME" DE GRANADA (Nivel Ciudad / Provincia)
INSERT INTO localizaciones_seo 
(slug, parent_slug, nombre_visible, query_filter, tier_classification, seo_title, h1_hero, copy_contextual)
VALUES 
(
    'granada', 
    NULL, -- Raíz de zona
    'Granada Capital', 
    $$province ILIKE 'Granada' AND town ILIKE 'Granada'$$, 
    'tier1.a', 
    'Dentistas en Granada: Precios Pactados DKV y Red Propia | Bernardo Sobrecasas',
    'TU DENTISTA EN GRANADA CAPITAL',
    'Cobertura integral en los 8 distritos y 36 barrios de Granada. Acceso a clínicas de referencia en el eje de Gran Vía, Camino de Ronda y Zaidín.'
)
ON CONFLICT (slug) DO UPDATE SET 
    nombre_visible = EXCLUDED.nombre_visible,
    query_filter = EXCLUDED.query_filter,
    seo_title = EXCLUDED.seo_title,
    h1_hero = EXCLUDED.h1_hero,
    copy_contextual = EXCLUDED.copy_contextual;


-- B. LOS 2 MACRO-HUBS ESTRATÉGICOS (Agrupación de Distritos según Anexo III)

-- HUB 1: CENTRO-REALEJO-NORTE (Perfil: Histórico y Comercial)
INSERT INTO localizaciones_seo 
(slug, parent_slug, nombre_visible, query_filter, tier_classification, seo_title, h1_hero, copy_contextual)
VALUES 
(
    'granada-centro-realejo-norte', 
    'granada', 
    'Granada Centro y Norte', 
    $$postal_code IN ('18001', '18002', '18005', '18009', '18010', '18011', '18012', '18013', '18182')$$, 
    'tier1.a', 
    'Dentistas en Granada Centro y Realejo: Calidad DKV | B. Sobrecasas',
    'TU DENTISTA EN EL CENTRO DE GRANADA Y REALEJO',
    'Atención especializada en el corazón histórico, desde la Catedral hasta los Jardines del Triunfo. Clínicas accesibles y de confianza.'
)
ON CONFLICT (slug) DO UPDATE SET copy_contextual = EXCLUDED.copy_contextual, query_filter = EXCLUDED.query_filter;

-- HUB 2: RONDA-ZAIDÍN-CHANA (Perfil: Residencial y Universitario)
INSERT INTO localizaciones_seo 
(slug, parent_slug, nombre_visible, query_filter, tier_classification, seo_title, h1_hero, copy_contextual)
VALUES 
(
    'granada-ronda-zaidin-chana', 
    'granada', 
    'Granada Ronda, Zaidín y Chana', 
    $$postal_code IN ('18003', '18004', '18006', '18007', '18008', '18014', '18015')$$, 
    'tier1.a', 
    'Dentista en Zaidín, Ronda y Chana: Ahorro Familiar | DKV',
    'TU DENTISTA EN GRANADA SUR (ZAIDÍN - RONDA)',
    'Red dental potente en los barrios más poblados. Desde el Parque de las Ciencias hasta la Chana, precios pactados para familias y estudiantes.'
)
ON CONFLICT (slug) DO UPDATE SET copy_contextual = EXCLUDED.copy_contextual, query_filter = EXCLUDED.query_filter;


-- ==============================================================================
-- 3. METADATOS DE CLÍNICAS (TABLA centros_metadata)
-- Inyección de "Almas Locales" (Textos de Autoridad del Anexo III)
-- ==============================================================================

-- HUB 1: CENTRO-REALEJO-NORTE
INSERT INTO centros_metadata (clinic_hash, name, address, town, cp, localized_anchor, is_dkv_propio) VALUES
(md5('Clínica Dental Dr. Palma'), 'Clínica Dental Dr. Palma', 'Calle Cárcel Baja', 'Granada', '18001', 'Junto a la Catedral y a pocos metros de la Facultad de Derecho.', false),
(md5('Ruiz Salvatierra, Esperanza'), 'Ruiz Salvatierra, Esperanza', 'Plaza de la Alhóndiga', 'Granada', '18002', 'En la comercial Plaza de la Alhóndiga, a un paso de la calle Mesones.', false),
(md5('Pedrosa Fernández, J.J.'), 'Pedrosa Fernández, J.J.', 'Av. de la Constitución', 'Granada', '18012', 'En el eje de la Avenida de la Constitución, junto a los Jardines del Triunfo.', false),
(md5('García Torres, Paloma'), 'García Torres, Paloma', 'Acera del Darro', 'Granada', '18005', 'Situada en Puerta Real, junto al emblemático edificio de Correos.', false),
(md5('Zorrilla Romera, Carmen'), 'Zorrilla Romera, Carmen', 'Calle San Jerónimo', 'Granada', '18001', 'Referencia de salud dental junto al histórico Monasterio de San Jerónimo.', false),
(md5('Centro Diagnóstico Granada'), 'Centro Diagnóstico Granada', 'Calle Duquesa', 'Granada', '18001', 'Atención especializada en el entorno de la Plaza de los Lobos.', false),
(md5('Delgado García, A.C.'), 'Delgado García, A.C.', 'Gran Vía de Colón', 'Granada', '18010', 'Ubicada en la Gran Vía de Colón, junto a la Plaza de Isabel la Católica.', false)
ON CONFLICT (clinic_hash) DO UPDATE SET localized_anchor = EXCLUDED.localized_anchor;

-- HUB 2: RONDA-ZAIDÍN-CHANA
INSERT INTO centros_metadata (clinic_hash, name, address, town, cp, localized_anchor, is_dkv_propio) VALUES
(md5('Clínica Dental Parque Lagos'), 'Clínica Dental Parque Lagos', 'Calle Grabador David Roberts', 'Granada', '18006', 'Frente al Parque de las Ciencias y muy cerca del C.C. Neptuno.', false),
(md5('Puerta Dental'), 'Puerta Dental', 'Calle Recogidas', 'Granada', '18002', 'Junto a la comercial calle Recogidas y la parada de Metro.', false), -- Nota: CP puede variar ligeramente según tramo, ajustado a lógica de hub
(md5('Ribera Clínica Dental'), 'Ribera Clínica Dental', 'Paseo del Violón', 'Granada', '18006', 'Frente al Paseo del Violón, junto al Palacio de Congresos.', false),
(md5('Vera Cerdà, Antonio'), 'Vera Cerdà, Antonio', 'Calle Arabial', 'Granada', '18004', 'Ubicada en la calle Arabial, junto al C.C. Hipercor y el Parque García Lorca.', false),
(md5('Maxilium Salud'), 'Maxilium Salud', 'Calle Torre de la Pólvora', 'Granada', '18008', 'Referencia en el Zaidín, muy cerca del Estadio de Los Cármenes.', false),
(md5('Rosales Leal, Juan Ignacio'), 'Rosales Leal, Juan Ignacio', 'Camino de Ronda', 'Granada', '18003', 'Junto a la Facultad de Traducción y el eje del Camino de Ronda.', false),
(md5('Linde Segovia, Clínica'), 'Linde Segovia, Clínica', 'Paseo del Salón', 'Granada', '18008', 'En la zona de Alminares, a pocos metros del Puente Romano del río Genil.', false),
(md5('Abril Alvargonzález, Ramón'), 'Abril Alvargonzález, Ramón', 'Carretera de Málaga', 'Granada', '18015', 'Referencia en el barrio de la Chana, junto a la entrada de la Autovía A-92.', false)
ON CONFLICT (clinic_hash) DO UPDATE SET localized_anchor = EXCLUDED.localized_anchor;