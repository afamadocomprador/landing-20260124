-- 1. LIMPIEZA
DROP TABLE IF EXISTS dental_treatments;

-- 2. CREACIÓN DE LA TABLA CON SOPORTE PARA TRATAMIENTOS COMPUESTOS
CREATE TABLE dental_treatments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Clasificación y Orden
    hierarchy_code text,             -- Ej: '7.3.1'
    category text NOT NULL,           -- Ej: 'Protesis Odontológicas'
    subcategory text,                 -- Ej: 'Protesis parciales removibles'
    group_type text,                  -- Ej: 'Acrílicas'
    ordinal_id int NOT NULL,          -- Posición visual en el catálogo
    
    -- Datos del Tratamiento
    treatment_name text NOT NULL,
    description_notes text,
    
    -- Precios
    price_label text NOT NULL,        -- 'Incluido' o 'X euros'
    price_value numeric(10, 2),       -- Valor numérico para cálculos
    
    -- Flags de Negocio
    is_included boolean DEFAULT false,       -- Si es gratuito/incluido en póliza
    is_pediatric boolean DEFAULT false,      -- Si es exclusivo de niños
    is_exclusive_tech boolean DEFAULT false, -- Si es exclusivo de Espacios de Salud (Innovaciones)
    
    -- NUEVO FLAG: ARQUITECTURA DE COMPUESTOS
    is_basic boolean DEFAULT true,           -- TRUE = Unitario / FALSE = Pack Compuesto (Ej: Implante Completo)
    
    sort_order serial                 -- Mantenimiento físico
);

-- Índices para optimizar las consultas de Gema
CREATE INDEX idx_treatments_hierarchy_ordinal ON dental_treatments(hierarchy_code, ordinal_id);
CREATE INDEX idx_treatments_category ON dental_treatments(category);
CREATE INDEX idx_treatments_is_basic ON dental_treatments(is_basic);