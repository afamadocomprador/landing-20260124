-- 1. LIMPIEZA
DROP TABLE IF EXISTS treatment_composition;

-- 2. CREACIÓN DE LA TABLA DE RELACIONES (COMPOSICIÓN)
CREATE TABLE treatment_composition (
    composition_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- El tratamiento "Padre" (Compuesto, ej: 'Implante normal')
    -- Debe ser un tratamiento con is_basic = false
    compound_treatment_id uuid NOT NULL REFERENCES dental_treatments(id) ON DELETE CASCADE,
    
    -- El tratamiento "Hijo" (Básico, ej: 'Implante de titanio')
    -- Debe ser un tratamiento con is_basic = true
    basic_treatment_id uuid NOT NULL REFERENCES dental_treatments(id) ON DELETE CASCADE,
    
    -- Cantidad (por si un pack incluye 2 radiografías, etc.)
    quantity int DEFAULT 1,
    
    -- Metadatos
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- 3. ÍNDICES PARA CONSULTAS RÁPIDAS
-- Para buscar "de qué está hecho este pack"
CREATE INDEX idx_composition_compound ON treatment_composition(compound_treatment_id);
-- Para buscar "en qué packs se usa este tratamiento básico"
CREATE INDEX idx_composition_basic ON treatment_composition(basic_treatment_id);

-- 4. SEGURIDAD (RLS)
ALTER TABLE treatment_composition ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura pública de composiciones" 
ON treatment_composition FOR SELECT 
USING (true);