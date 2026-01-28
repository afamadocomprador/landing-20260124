-- ==============================================================================
-- 1. TABLA: localizaciones_seo (El Cerebro)
-- Define la arquitectura de URLs y la estrategia de contenido por Tier.
-- ==============================================================================

DROP TABLE IF EXISTS localizaciones_seo CASCADE;

CREATE TABLE localizaciones_seo (
    slug TEXT PRIMARY KEY,
    parent_slug TEXT REFERENCES localizaciones_seo(slug) ON DELETE SET NULL,
    
    -- Datos de Negocio
    nombre_visible TEXT NOT NULL,     -- Ej: "Madrid Norte: Tetuán y Chamberí"
    query_filter TEXT NOT NULL,       -- WHERE clause para filtrar dentistas (Ej: town = 'Madrid' AND cp IN ('28001'))
    tier_classification TEXT CHECK (tier_classification IN ('tier1.a', 'tier2', 'tier3')),
    
    -- Datos SEO On-Page
    seo_title TEXT NOT NULL,          -- <title> optimizado
    h1_hero TEXT NOT NULL,            -- Título visible en la página
    copy_contextual TEXT NOT NULL,    -- Texto E-E-A-T sobre la zona
    
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Seguridad RLS para localizaciones_seo
ALTER TABLE localizaciones_seo ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública de SEO" 
ON localizaciones_seo FOR SELECT 
USING (true);


-- ==============================================================================
-- 2. TABLA: centros_metadata (El Alma Local)
-- Enriquece los datos crudos de dentistas con ganchos locales y validación manual.
-- ==============================================================================

DROP TABLE IF EXISTS centros_metadata CASCADE;

CREATE TABLE centros_metadata (
    clinic_hash TEXT PRIMARY KEY,     -- ID único generado: MD5(lat + long + name)
    
    -- Datos de Identificación (Espejo de la tabla raw para validación)
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    town TEXT NOT NULL,
    cp TEXT NOT NULL,
    
    -- Geolocalización precisa
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7),
    
    -- El factor diferencial ("Alma")
    localized_anchor TEXT,            -- Ej: "Junto al Metro Estrecho" o "Frente al Mercado"
    
    -- Atributos de Red
    is_dkv_propio BOOLEAN DEFAULT false, -- True si es Espacio de Salud DKV
    
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Seguridad RLS para centros_metadata
ALTER TABLE centros_metadata ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública de metadatos" 
ON centros_metadata FOR SELECT 
USING (true);

-- ==============================================================================
-- 3. ÍNDICES DE RENDIMIENTO
-- ==============================================================================
CREATE INDEX idx_seo_parent ON localizaciones_seo(parent_slug);
CREATE INDEX idx_seo_tier ON localizaciones_seo(tier_classification);