-- ==============================================================================
-- SEMILLA DE DATOS: ESTRATEGIA SEO MADRID (ANEXO I - PLAN V4.5)
-- ==============================================================================

-- 1. LIMPIEZA PREVIA DE MADRID (Para evitar duplicados al regenerar)
DELETE FROM localizaciones_seo WHERE slug LIKE 'madrid%';
-- Nota: No borramos centros_metadata completos, solo actualizaremos los de Madrid más abajo.


-- ==============================================================================
-- 2. JERARQUÍA SEO (TABLA localizaciones_seo)
-- ==============================================================================

-- A. LA "HOME" DE MADRID (Nivel Ciudad / Provincia)
INSERT INTO localizaciones_seo 
(slug, parent_slug, nombre_visible, query_filter, tier_classification, seo_title, h1_hero, copy_contextual)
VALUES 
(
    'madrid', 
    NULL, -- Es raíz de zona
    'Madrid Capital', 
    $$province ILIKE 'Madrid' AND town ILIKE 'Madrid'$$, 
    'tier1.a', 
    'Dentistas en Madrid: Precios Pactados DKV y Red Propia | Bernardo Sobrecasas',
    'TU DENTISTA EN MADRID CAPITAL',
    'Accede a la mayor red de salud dental de España con 21 distritos cubiertos y el Espacio de Salud Dental DKV de Príncipe de Vergara como referencia tecnológica.'
);

-- B. LOS 4 MACRO-HUBS ESTRATÉGICOS (Agrupación de Distritos)

-- HUB 1: CENTRO-SALAMANCA-RETIRO (Premium)
INSERT INTO localizaciones_seo 
(slug, parent_slug, nombre_visible, query_filter, tier_classification, seo_title, h1_hero, copy_contextual)
VALUES 
(
    'madrid-centro-salamanca', 
    'madrid', 
    'Madrid Centro y Salamanca', 
    $$postal_code IN ('28001', '28004', '28006', '28007', '28009', '28012', '28013', '28014')$$, 
    'tier1.a', 
    'Dentistas en Madrid Centro y Salamanca: Implantes y Estética | DKV',
    'TU DENTISTA EN EL CENTRO DE MADRID Y SALAMANCA',
    'Referencia premium en Príncipe de Vergara 80, junto al Intercambiador de Av. de América y a un paso del Parque del Retiro. Especialistas en estética e implantología compleja.'
);

-- HUB 2: NORTE (Chamberí-Tetuán-Fuencarral)
INSERT INTO localizaciones_seo 
(slug, parent_slug, nombre_visible, query_filter, tier_classification, seo_title, h1_hero, copy_contextual)
VALUES 
(
    'madrid-norte-chamberi', 
    'madrid', 
    'Madrid Norte: Chamberí y Tetuán', 
    $$postal_code IN ('28003', '28010', '28015', '28020', '28029', '28034', '28035', '28039', '28048', '28049')$$, 
    'tier1.a', 
    'Dentista en Chamberí y Tetuán: Ortodoncia y Familia | DKV',
    'TU DENTISTA EN MADRID NORTE (CHAMBERÍ - TETUÁN)',
    'En el eje comercial de Bravo Murillo, a 2 min del Mercado de Maravillas y con conexión directa desde el Metro Estrecho. Red familiar con foco en ortodoncia.'
);

-- HUB 3: SUR (Carabanchel-Latina-Usera)
INSERT INTO localizaciones_seo 
(slug, parent_slug, nombre_visible, query_filter, tier_classification, seo_title, h1_hero, copy_contextual)
VALUES 
(
    'madrid-sur-carabanchel', 
    'madrid', 
    'Madrid Sur: Carabanchel y Latina', 
    $$postal_code IN ('28011', '28019', '28021', '28024', '28025', '28026', '28041', '28044', '28047')$$, 
    'tier1.a', 
    'Dentista en Carabanchel y Latina: Ahorro Familiar | DKV',
    'TU DENTISTA EN MADRID SUR (CARABANCHEL - LATINA)',
    'Salud familiar en Aluche, junto al Parque de las Cruces; o en el corazón de Villaverde Alto, a 5 min del Cercanías. Precios pactados para el ahorro doméstico.'
);

-- HUB 4: ESTE (Vallecas-Ciudad Lineal)
INSERT INTO localizaciones_seo 
(slug, parent_slug, nombre_visible, query_filter, tier_classification, seo_title, h1_hero, copy_contextual)
VALUES 
(
    'madrid-este-vallecas', 
    'madrid', 
    'Madrid Este: Vallecas y C. Lineal', 
    $$postal_code IN ('28017', '28018', '28022', '28027', '28030', '28031', '28032', '28033', '28037', '28038', '28043', '28050', '28051', '28052', '28053')$$, 
    'tier1.a', 
    'Dentista en Vallecas y Ciudad Lineal: Red Abierta | DKV',
    'TU DENTISTA EN MADRID ESTE (VALLECAS - C. LINEAL)',
    'Odontología en Palomeras, junto al Metro Miguel Hernández; y en Arturo Soria, frente al C.C. Arturo Soria Plaza. Acceso rápido y sin listas de espera.'
);


-- ==============================================================================
-- 3. METADATOS DE CLÍNICAS (TABLA centros_metadata)
-- Inyección de "Almas Locales" (Hitos de proximidad para E-E-A-T)
-- ==============================================================================

-- Nota técnica: Usamos MD5(nombre) como hash temporal para la carga. 
-- En producción real, esto debería coincidir con el hash generado desde la tabla raw.

-- HUB 1: CENTRO / SALAMANCA / RETIRO
INSERT INTO centros_metadata (clinic_hash, name, address, town, cp, localized_anchor, is_dkv_propio)
VALUES
(md5('Centro Dental Implantológico Dra Guisado'), 'Centro Dental Implantológico Dra Guisado', 'Calle Ibiza, 34', 'Madrid', '28009', 'Ubicada junto al Parque del Retiro, nuestra clínica es la referencia para los vecinos del eje de la Avenida de Menéndez Pelayo.', false),
(md5('Rodríguez Méndez, Loreto'), 'Rodríguez Méndez, Loreto', 'Av. del Mediterráneo', 'Madrid', '28007', 'Situada a escasos metros de la Avenida del Mediterráneo, con acceso directo desde el Metro Conde de Casal.', false),
(md5('Díag.Buco-Facial Dr. Ortega'), 'Díag.Buco-Facial Dr. Ortega', 'Calle Goya', 'Madrid', '28001', 'En pleno corazón de Goya, a un paso del WiZink Center y perfectamente comunicada con el Metro Goya.', false),
(md5('Doctora Ana Caicoya Urzaiz'), 'Doctora Ana Caicoya Urzaiz', 'Calle Almagro', 'Madrid', '28010', 'Atención premium en la zona de Almagro-Castellana, muy cerca del Museo Sorolla y la Glorieta de Rubén Darío.', false),
(md5('Espacio de Salud Dental DKV Madrid'), 'Espacio de Salud Dental DKV Madrid', 'C/ Príncipe de Vergara 80', 'Madrid', '28006', 'Nuestro centro tecnológico de referencia en la calle Príncipe de Vergara 80, junto al Intercambiador de Avenida de América.', true),
(md5('Martínez Lozano, Mª José'), 'Martínez Lozano, Mª José', 'Paseo de la Castellana', 'Madrid', '28046', 'Excelencia dental en el entorno de Gregorio Marañón, ideal para quienes trabajan en el eje financiero de la Castellana.', false)
ON CONFLICT (clinic_hash) DO UPDATE SET localized_anchor = EXCLUDED.localized_anchor;

-- HUB 2: NORTE (CHAMBERÍ / TETUÁN)
INSERT INTO centros_metadata (clinic_hash, name, address, town, cp, localized_anchor, is_dkv_propio)
VALUES
(md5('Salud Estética Dental Peinado'), 'Salud Estética Dental Peinado', 'Calle Bravo Murillo', 'Madrid', '28020', 'En el eje comercial de Bravo Murillo, a un paso del Mercado de Tetuán y muy cerca del Metro Valdeacederas.', false),
(md5('Calter Scan'), 'Calter Scan', 'Calle Islas Filipinas', 'Madrid', '28003', 'Especialistas en diagnóstico por imagen en la zona de Islas Filipinas, junto al Hospital Clínico San Carlos.', false),
(md5('Centro Médico 2200'), 'Centro Médico 2200', 'Calle Vallehermoso', 'Madrid', '28015', 'Ubicado en el entorno residencial de Vallehermoso, a pocos minutos del Estadio de Vallehermoso.', false),
(md5('Clínica Dental Arguelles'), 'Clínica Dental Arguelles', 'Calle Princesa', 'Madrid', '28008', 'Tradición dental junto a la Calle Princesa, muy cerca del Templo de Debod y el Metro Argüelles.', false),
(md5('Centro Dental Puerta de Hierro'), 'Centro Dental Puerta de Hierro', 'Calle San Martín de Porres', 'Madrid', '28035', 'Salud bucodental de vanguardia junto al Hospital Puerta de Hierro, con acceso fácil desde la Dehesa de la Villa.', false),
(md5('Mablan Medical'), 'Mablan Medical', 'Calle de Valverde', 'Madrid', '28034', 'Tu opción de confianza en el barrio de Valverde, a pocos metros del Metro Tres Olivos.', false)
ON CONFLICT (clinic_hash) DO UPDATE SET localized_anchor = EXCLUDED.localized_anchor;

-- HUB 3: SUR (CARABANCHEL / LATINA)
INSERT INTO centros_metadata (clinic_hash, name, address, town, cp, localized_anchor, is_dkv_propio)
VALUES
(md5('Cesime'), 'Cesime', 'Calle Camarena', 'Madrid', '28047', 'Referencia de salud en el barrio de Aluche, situada junto al Parque de las Cruces y el Metro Eugenia de Montijo.', false),
(md5('Clínica Dental DR. Villar'), 'Clínica Dental DR. Villar', 'Av. de Abrantes', 'Madrid', '28025', 'Atención familiar en el eje de la Avenida de Abrantes, muy cerca de la Vía Lusitana.', false),
(md5('Instituto Médico Odontológico'), 'Instituto Médico Odontológico', 'Calle Antonio López', 'Madrid', '28026', 'Expertos en implantes junto al Hospital 12 de Octubre, con fácil acceso desde el Parque Lineal del Manzanares.', false),
(md5('Dental Villaverde'), 'Dental Villaverde', 'Paseo de Alberto Palacios', 'Madrid', '28021', 'En el corazón de Villaverde Alto, a menos de 5 minutos caminando de la estación de Cercanías y Metro.', false)
ON CONFLICT (clinic_hash) DO UPDATE SET localized_anchor = EXCLUDED.localized_anchor;

-- HUB 4: ESTE (VALLECAS / C. LINEAL)
INSERT INTO centros_metadata (clinic_hash, name, address, town, cp, localized_anchor, is_dkv_propio)
VALUES
(md5('Centro Médico Poza de la Sal'), 'Centro Médico Poza de la Sal', 'Calle Poza de la Sal', 'Madrid', '28031', 'Salud dental en el dinámico barrio de Palomeras, junto al Metro Miguel Hernández y la Avenida de la Albufera.', false),
(md5('Clínica El Olivo'), 'Clínica El Olivo', 'Av. de la Albufera', 'Madrid', '28018', 'A un paso del Estadio de Vallecas, nuestra clínica es el referente de odontología en el entorno del Metro Portazgo.', false),
(md5('Basurte Villamor, Ana Cristina'), 'Basurte Villamor, Ana Cristina', 'Calle Arturo Soria', 'Madrid', '28027', 'Atención personalizada en la prestigiosa zona de Arturo Soria, junto al Centro Comercial Arturo Soria Plaza.', false),
(md5('Clínica Dental Martínez'), 'Clínica Dental Martínez', 'Gran Vía de Hortaleza', 'Madrid', '28043', 'Tu dentista en el barrio de Pinar del Rey, con excelente conexión desde la Gran Vía de Hortaleza.', false)
ON CONFLICT (clinic_hash) DO UPDATE SET localized_anchor = EXCLUDED.localized_anchor;