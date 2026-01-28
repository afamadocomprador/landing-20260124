-- 1. LIMPIEZA: Eliminamos la tabla anterior para regenerarla con la estructura definitiva
DROP TABLE IF EXISTS leads_dental;

-- 2. CREACIÓN: Nueva estructura con soporte para Geolocalización y Trazabilidad
CREATE TABLE leads_dental (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- Datos del Prospecto (Contacto)
    nombre TEXT NOT NULL,
    email TEXT NOT NULL,
    telefono TEXT NOT NULL,
    codigo_postal TEXT NOT NULL,
    localidad_landing TEXT,       -- Ciudad/Barrio de la URL (ej: 'madrid-tetuan')
    
    -- Geolocalización del Usuario (NUEVO)
    latitud NUMERIC,              -- Latitud GPS (ej: 40.416775)
    longitud NUMERIC,             -- Longitud GPS (ej: -3.703790)
    
    -- Lenguaje Natural / Consulta
    mensaje_consulta TEXT,        -- Texto libre del usuario
    
    -- Segmentación y Trazabilidad (Marketing)
    perfil_arquetipo TEXT CHECK (perfil_arquetipo IN ('Senior', 'Familia', 'Joven')),
    tier_origen TEXT,             -- Tier 1, 2 o 3 (según la landing de origen)
    url_referencia TEXT,          -- URL completa donde se captó el lead
    
    -- Cumplimiento Legal (RGPD)
    consentimiento_privacidad BOOLEAN NOT NULL DEFAULT false, -- Obligatorio
    consentimiento_comercial BOOLEAN NOT NULL DEFAULT false,  -- Opcional (Opt-in)
    
    -- Gestión Comercial (CRM Bernardo)
    estado TEXT DEFAULT 'Nuevo' CHECK (estado IN ('Nuevo', 'Contactado', 'Cita Concertada', 'Póliza Emitida', 'Descartado')),
    notas_agente TEXT,

    -- NUEVO CAMPO SOLICITADO (Formato: AAAA-MM-DD-HH:MM:SS.mmm)
    id_referencia TEXT
);

-- 3. SEGURIDAD (RLS)
ALTER TABLE leads_dental ENABLE ROW LEVEL SECURITY;

-- Política de Inserción (Pública para el formulario web)
CREATE POLICY "Permitir inserción pública de leads" 
ON public.leads_dental FOR INSERT WITH CHECK (true);

-- Política de Lectura (Privada para Bernardo / Admin)
CREATE POLICY "Permitir lectura a autenticados"
ON public.leads_dental FOR SELECT TO authenticated USING (true);

-- Política de Edición (Privada para Bernardo / Admin)
CREATE POLICY "Permitir actualización a autenticados"
ON public.leads_dental FOR UPDATE TO authenticated USING (true);

-- 4. ÍNDICES (Para optimizar búsquedas futuras)
CREATE INDEX idx_leads_email ON leads_dental(email);
CREATE INDEX idx_leads_estado ON leads_dental(estado);
CREATE INDEX idx_leads_created_at ON leads_dental(created_at);