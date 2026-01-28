-- ==============================================================================
-- CARGA MAESTRA: TRATAMIENTOS DKV DENTISALUD ÉLITE (2025) - v2
-- ==============================================================================
-- Incluye campo 'is_basic' = true para todos los registros unitarios.

TRUNCATE TABLE dental_treatments;

INSERT INTO dental_treatments 
(hierarchy_code, category, subcategory, group_type, ordinal_id, treatment_name, description_notes, price_label, price_value, is_included, is_pediatric, is_exclusive_tech, is_basic)
VALUES

-- ==============================================================================
-- 1. UNIDAD DE DIAGNÓSTICO
-- ==============================================================================
('1', 'Unidad de diagnóstico', NULL, NULL, 1, 'Consulta, presupuesto odontológico, plan de tratamiento', NULL, 'Incluido', 0, true, false, false, true),
('1', 'Unidad de diagnóstico', NULL, NULL, 2, 'Visita de revisión o control', NULL, 'Incluido', 0, true, false, false, true),
('1', 'Unidad de diagnóstico', NULL, NULL, 3, 'Radiografias intrabucales', NULL, 'Incluido', 0, true, false, false, true),
('1', 'Unidad de diagnóstico', NULL, NULL, 4, 'Serie radiográfica periapical', NULL, 'Incluido', 0, true, false, false, true),
('1', 'Unidad de diagnóstico', NULL, NULL, 5, 'Placa oclusal', NULL, 'Incluido', 0, true, false, false, true),
('1', 'Unidad de diagnóstico', NULL, NULL, 6, 'Radiovisiografia digital (RVG)', NULL, 'Incluido', 0, true, false, false, true),

-- ==============================================================================
-- 2. ODONTOLOGÍA PREVENTIVA
-- ==============================================================================
('2', 'Odontología preventiva', NULL, NULL, 1, 'Fluorizaciones tópicas por sesión', NULL, 'Incluido', 0, true, false, false, true),
('2', 'Odontología preventiva', NULL, NULL, 2, 'Cursillo odontológico (enseñanza de cepillado, adiestramiento en técnicas de higiene bucal)', NULL, 'Incluido', 0, true, false, false, true),
('2', 'Odontología preventiva', NULL, NULL, 3, 'Selladores de fisuras (por pieza)', NULL, 'Incluido', 0, true, false, false, true),
('2', 'Odontología preventiva', NULL, NULL, 4, 'Limpieza de boca, higiene o tartrectomia', NULL, 'Incluido', 0, true, false, false, true),
('2', 'Odontología preventiva', NULL, NULL, 5, 'Bicarbonato', NULL, 'Incluido', 0, true, false, false, true),
('2', 'Odontología preventiva', NULL, NULL, 6, 'Recubrimiento pulpar', NULL, 'Incluido', 0, true, false, false, true),

-- ==============================================================================
-- 3. ODONTOLOGÍA CONSERVADORA
-- ==============================================================================
-- 3.1 RECONSTRUCTIVA
('3.1', 'Odontología Conservadora', 'Odontología reconstructiva', NULL, 1, 'Poste o Pin (por unidad)', NULL, '8 euros', 8, false, false, false, true),
('3.1', 'Odontología Conservadora', 'Odontología reconstructiva', NULL, 2, 'Empaste provisional', NULL, 'Incluido', 0, true, false, false, true),
('3.1', 'Odontología Conservadora', 'Odontología reconstructiva', NULL, 3, 'Obturacion con o sin recubrimiento pulpar', NULL, '29 euros', 29, false, false, false, true),
('3.1', 'Odontología Conservadora', 'Odontología reconstructiva', NULL, 4, 'Gran reconstrucción (con o sin recubrimiento pulpar)', NULL, '40 euros', 40, false, false, false, true),
('3.1', 'Odontología Conservadora', 'Odontología reconstructiva', NULL, 5, 'Reimplante de pieza dental', NULL, 'Incluido', 0, true, false, false, true),

-- 3.2 ENDODONCIAS
('3.2', 'Odontología Conservadora', 'Endodoncias', NULL, 1, 'Endodoncia: un conducto', NULL, '80 euros', 80, false, false, false, true),
('3.2', 'Odontología Conservadora', 'Endodoncias', NULL, 2, 'Endodoncia: dos conductos', NULL, '94 euros', 94, false, false, false, true),
('3.2', 'Odontología Conservadora', 'Endodoncias', NULL, 3, 'Endodoncia: tres conductos o más', NULL, '123 euros', 123, false, false, false, true),
('3.2', 'Odontología Conservadora', 'Endodoncias', NULL, 4, 'Suplemento de utilización sistema rotatorio en endodoncias', NULL, '15 euros', 15, false, false, false, true),
('3.2', 'Odontología Conservadora', 'Endodoncias', NULL, 5, 'Reendodoncia: un conducto', NULL, '130 euros', 130, false, false, false, true),
('3.2', 'Odontología Conservadora', 'Endodoncias', NULL, 6, 'Reendodoncia: dos conductos', NULL, '130 euros', 130, false, false, false, true),
('3.2', 'Odontología Conservadora', 'Endodoncias', NULL, 7, 'Reendodoncia: tres conductos', NULL, '130 euros', 130, false, false, false, true),
('3.2', 'Odontología Conservadora', 'Endodoncias', NULL, 8, 'Apicoformación (por sesión)', NULL, '54 euros', 54, false, false, false, true),
('3.2', 'Odontología Conservadora', 'Endodoncias', NULL, 9, 'Pulpectomía de urgencias (incluye curas endodoncia)', NULL, '30 euros', 30, false, false, false, true),
('3.2', 'Odontología Conservadora', 'Endodoncias', NULL, 10, 'Apicectomia', NULL, '38 euros', 38, false, false, false, true),
('3.2', 'Odontología Conservadora', 'Endodoncias', NULL, 11, 'Sustitutivo dentinario bioactivo (base cavitaria para evitar endodoncia)', NULL, '70 euros', 70, false, false, false, true),

-- ==============================================================================
-- 4. ODONTOPEDIATRÍA
-- ==============================================================================
('4', 'Odontopediatría', NULL, NULL, 1, 'Consulta y revisión infantil', NULL, 'Incluido', 0, true, true, false, true),
('4', 'Odontopediatría', NULL, NULL, 2, 'Radiografias intrabucales', NULL, 'Incluido', 0, true, true, false, true),
('4', 'Odontopediatría', NULL, NULL, 3, 'Radiovisiografia digital (RVG)', NULL, 'Incluido', 0, true, true, false, true),
('4', 'Odontopediatría', NULL, NULL, 4, 'Fluoraciones tópicas por sesión', NULL, 'Incluido', 0, true, true, false, true),
('4', 'Odontopediatría', NULL, NULL, 5, 'Cursillo odontológico (enseñanza de cepillado, adiestramiento en técnicas de higiene bucal)', NULL, 'Incluido', 0, true, true, false, true),
('4', 'Odontopediatría', NULL, NULL, 6, 'Selladores de fisuras (por pieza). Menores de 15 años', NULL, '17 euros', 17, false, true, false, true),
('4', 'Odontopediatría', NULL, NULL, 7, 'Limpieza de boca, higiene o tartectomía', NULL, 'Incluido', 0, true, true, false, true),
('4', 'Odontopediatría', NULL, NULL, 8, 'Obturación con o sin recubrimiento pulpar. Menores de 15 años', NULL, 'Incluido', 0, true, true, false, true),
('4', 'Odontopediatría', NULL, NULL, 9, 'Reconstrucción molares definitivos. Menores de 15 años', NULL, '40 euros', 40, false, true, false, true),
('4', 'Odontopediatría', NULL, NULL, 10, 'Reimplantación de pieza dental', NULL, 'Incluido', 0, true, true, false, true),
('4', 'Odontopediatría', NULL, NULL, 11, 'Pulpotomia. Menores de 15 años', NULL, '44 euros', 44, false, true, false, true),
('4', 'Odontopediatría', NULL, NULL, 12, 'Apicoformación (por sesión)', NULL, '20 euros', 20, false, true, false, true),
('4', 'Odontopediatría', NULL, NULL, 13, 'Pulpectomia (incluye curas endodoncia)', NULL, '36 euros', 36, false, true, false, true),
('4', 'Odontopediatría', NULL, NULL, 14, 'Extracciones dentales simples', NULL, 'Incluido', 0, true, true, false, true),
('4', 'Odontopediatría', NULL, NULL, 15, 'Extracción diente supernumerario retenido (por unidad)', NULL, '25 euros', 25, false, true, false, true),
('4', 'Odontopediatría', NULL, NULL, 16, 'Mantenedor de espacio fijo unilateral', NULL, '58 euros', 58, false, true, false, true),
('4', 'Odontopediatría', NULL, NULL, 17, 'Mantenedor de espacio fijo bilateral', NULL, '87 euros', 87, false, true, false, true),
('4', 'Odontopediatría', NULL, NULL, 18, 'Mantenedor de espacio removible', NULL, '72 euros', 72, false, true, false, true),
('4', 'Odontopediatría', NULL, NULL, 19, 'Corona prefabricada metálica (acero)', NULL, '65 euros', 65, false, true, false, true),

-- ==============================================================================
-- 5. ODONTOLOGÍA MÉDICA
-- ==============================================================================
-- 5.1 PERIODONCIA
('5.1', 'Odontología Médica', 'Periodoncia', NULL, 1, 'Diagnóstico, medición bolsas y plan de tratamiento', NULL, 'Incluido', 0, true, false, false, true),
('5.1', 'Odontología Médica', 'Periodoncia', NULL, 2, 'Limpieza de boca (detartraje subgingival)', NULL, 'Incluido', 0, true, false, false, true),
('5.1', 'Odontología Médica', 'Periodoncia', NULL, 3, 'Aplicación gel de fluor para sensibilidad dentinaria', NULL, 'Incluido', 0, true, false, false, true),
('5.1', 'Odontología Médica', 'Periodoncia', NULL, 4, 'Curetaje, alisado y pulido radicular por cuadrante', NULL, '40 euros', 40, false, false, false, true),
('5.1', 'Odontología Médica', 'Periodoncia', NULL, 5, 'Revisiones de mantenimiento y control', NULL, 'Incluido', 0, true, false, false, true),
('5.1', 'Odontología Médica', 'Periodoncia', NULL, 6, 'Tratamiento periodontal de mantenimiento', NULL, '65 euros', 65, false, false, false, true),
('5.1', 'Odontología Médica', 'Periodoncia', NULL, 7, 'Extirpación de un épulis', NULL, '40 euros', 40, false, false, false, true),
('5.1', 'Odontología Médica', 'Periodoncia', NULL, 8, 'Ferulización de dientes (por pieza)', NULL, '18 euros', 18, false, false, false, true),
('5.1', 'Odontología Médica', 'Periodoncia', NULL, 9, 'Ferulización de dientes (por sextante)', NULL, '100 euros', 100, false, false, false, true),
('5.1', 'Odontología Médica', 'Periodoncia', NULL, 10, 'Periodontograma', NULL, 'Incluido', 0, true, false, false, true),
('5.1', 'Odontología Médica', 'Periodoncia', NULL, 11, 'Alargamiento coronario', NULL, '100 euros', 100, false, false, false, true),

-- 5.2 PATOLOGÍA NEUROLÓGICA
('5.2', 'Odontología Médica', 'Patología neurológica', NULL, 1, 'Neuralgias odontológicas (odontalgias)', NULL, 'Incluido', 0, true, false, false, true),
('5.2', 'Odontología Médica', 'Patología neurológica', NULL, 2, 'Dolor facial', NULL, 'Incluido', 0, true, false, false, true),
('5.2', 'Odontología Médica', 'Patología neurológica', NULL, 3, 'Parálisis facial (orientación terapéutica)', NULL, 'Incluido', 0, true, false, false, true),

-- ==============================================================================
-- 6. ODONTOLOGÍA QUIRÚRGICA
-- ==============================================================================
-- 6.0 QUIRÚRGICA GENERAL
('6', 'Odontología Quirúrgica', NULL, NULL, 1, 'Fenestración', NULL, '45 euros', 45, false, false, false, true),
('6', 'Odontología Quirúrgica', NULL, NULL, 2, 'Frenectomía (frenillo lingual o labial)', NULL, '23 euros', 23, false, false, false, true),
('6', 'Odontología Quirúrgica', NULL, NULL, 3, 'Retirada de puntos', NULL, 'Incluido', 0, true, false, false, true),
('6', 'Odontología Quirúrgica', NULL, NULL, 4, 'Anestesia local, regional y troncal', NULL, 'Incluido', 0, true, false, false, true),
('6', 'Odontología Quirúrgica', NULL, NULL, 5, 'Sedación con óxido nitroso (sesión de 1/2 hora)', NULL, '70 euros', 70, false, false, false, true),
('6', 'Odontología Quirúrgica', NULL, NULL, 6, 'Suturas simples para facilitar la hemostasia', NULL, 'Incluido', 0, true, false, false, true),
('6', 'Odontología Quirúrgica', NULL, NULL, 7, 'Drenajes simples. Apertura de abscesos', NULL, 'Incluido', 0, true, false, false, true),
('6', 'Odontología Quirúrgica', NULL, NULL, 8, 'Extracciones dentales simples', NULL, 'Incluido', 0, true, false, false, true),
('6', 'Odontología Quirúrgica', NULL, NULL, 9, 'Extracciones dentales complejas. Restos radiculares', NULL, 'Incluido', 0, true, false, false, true),
('6', 'Odontología Quirúrgica', NULL, NULL, 10, 'Extracción muela del juicio normal (erupcionada)', NULL, '15 euros', 15, false, false, false, true),
('6', 'Odontología Quirúrgica', NULL, NULL, 11, 'Extracción muela del juicio submucosa', NULL, '15 euros', 15, false, false, false, true),
('6', 'Odontología Quirúrgica', NULL, NULL, 12, 'Cirugía de la muela del juicio (con o sin quiste dentinario)', NULL, '25 euros', 25, false, false, false, true),
('6', 'Odontología Quirúrgica', NULL, NULL, 13, 'Amputación radicular (hemisección)', NULL, 'Incluido', 0, true, false, false, true),
('6', 'Odontología Quirúrgica', NULL, NULL, 14, 'Tratamiento regenerativo alveolar postexodoncia (incluye materiales de relleno)', NULL, '80 euros', 80, false, false, false, true),
('6', 'Odontología Quirúrgica', NULL, NULL, 15, 'Tratamiento regenerativo alveolar postexodoncia más de una pieza (incluye materiales de relleno)', NULL, '150 euros', 150, false, false, false, true),

-- 6.1 PERIODONCIA QUIRÚRGICA
('6.1', 'Odontología Quirúrgica', 'Periodoncia quirúrgica', NULL, 1, 'Gingivectomía total (por cuadrante)', NULL, '17 euros', 17, false, false, false, true),
('6.1', 'Odontología Quirúrgica', 'Periodoncia quirúrgica', NULL, 2, 'Cirugía periodontal a colgajo (por cuadrante)', NULL, '100 euros', 100, false, false, false, true),
('6.1', 'Odontología Quirúrgica', 'Periodoncia quirúrgica', NULL, 3, 'Cirugia periodontal a colgajo (por pieza)', NULL, '26 euros', 26, false, false, false, true),
('6.1', 'Odontología Quirúrgica', 'Periodoncia quirúrgica', NULL, 4, 'Cirugía periodontal de injerto (por cirugia)', NULL, '130 euros', 130, false, false, false, true),
('6.1', 'Odontología Quirúrgica', 'Periodoncia quirúrgica', NULL, 5, 'Membranas regenerativas', NULL, '150 euros', 150, false, false, false, true),
('6.1', 'Odontología Quirúrgica', 'Periodoncia quirúrgica', NULL, 6, 'Injerto autólogo', NULL, '190 euros', 190, false, false, false, true),
('6.1', 'Odontología Quirúrgica', 'Periodoncia quirúrgica', NULL, 7, 'Materiales alternativos de relleno (hidroxiapatita, hueso liofilizado, etc.) Por unidad.', NULL, '150 euros', 150, false, false, false, true),

-- ==============================================================================
-- 7. PRÓTESIS ODONTOLÓGICAS
-- ==============================================================================
-- 7.1 FIJAS
('7.1', 'Protesis Odontológicas', 'Fijas', NULL, 1, 'Corona o puente provisional de resina (por pieza)', NULL, '20 euros', 20, false, false, false, true),
('7.1', 'Protesis Odontológicas', 'Fijas', NULL, 2, 'Corona puente jacket de resina o porcelana (por pieza)', NULL, '188 euros', 188, false, false, false, true),
('7.1', 'Protesis Odontológicas', 'Fijas', NULL, 3, 'Corona o puente metal-porcelana (por pieza)', NULL, '197 euros', 197, false, false, false, true),
('7.1', 'Protesis Odontológicas', 'Fijas', NULL, 4, 'Corona o puente metal noble/seminoble - porcelana (por pieza)', NULL, '210 euros', 210, false, false, false, true),
('7.1', 'Protesis Odontológicas', 'Fijas', NULL, 5, 'Corona o puente colada de metal (por pieza)', NULL, '100 euros', 100, false, false, false, true),
('7.1', 'Protesis Odontológicas', 'Fijas', NULL, 6, 'Corona o puente metal-resina (por pieza)', NULL, '144 euros', 144, false, false, false, true),
('7.1', 'Protesis Odontológicas', 'Fijas', NULL, 7, 'Corona de cerámica sin metal (tipo Empress, Inceram, Captek, Mirage, etc.)', NULL, '299 euros', 299, false, false, false, true),
('7.1', 'Protesis Odontológicas', 'Fijas', NULL, 8, 'Muñón colado', NULL, '65 euros', 65, false, false, false, true),
('7.1', 'Protesis Odontológicas', 'Fijas', NULL, 9, 'Incrustación de resina', NULL, '65 euros', 65, false, false, false, true),
('7.1', 'Protesis Odontológicas', 'Fijas', NULL, 10, 'Incrustación de composite', NULL, '72 euros', 72, false, false, false, true),
('7.1', 'Protesis Odontológicas', 'Fijas', NULL, 11, 'Reparación o compostura de porcelana', NULL, '45 euros', 45, false, false, false, true),
('7.1', 'Protesis Odontológicas', 'Fijas', NULL, 12, 'Barra de Ackerman (suplemento)', NULL, '70 euros', 70, false, false, false, true),
('7.1', 'Protesis Odontológicas', 'Fijas', NULL, 13, 'Maryland (suplemento)', NULL, '70 euros', 70, false, false, false, true),
('7.1', 'Protesis Odontológicas', 'Fijas', NULL, 14, 'Corona o puente fijo zirconio', NULL, '325 euros', 325, false, false, false, true),

-- 7.2 REMOVIBLES
('7.2', 'Protesis Odontológicas', 'Removibles', NULL, 1, 'Prótesis completa superior o inferior', NULL, '370 euros', 370, false, false, false, true),
('7.2', 'Protesis Odontológicas', 'Removibles', NULL, 2, 'Prótesis completa superior + inferior', NULL, '740 euros', 740, false, false, false, true),
('7.2', 'Protesis Odontológicas', 'Removibles', NULL, 3, 'Compostura de rebases', NULL, '70 euros', 70, false, false, false, true),

-- 7.3.1 ACRÍLICAS
('7.3.1', 'Protesis Odontológicas', 'Protesis parciales removibles', 'Acrílicas', 1, 'Parcial resina de 1 a 4 piezas', NULL, '209 euros', 209, false, false, false, true),
('7.3.1', 'Protesis Odontológicas', 'Protesis parciales removibles', 'Acrílicas', 2, 'Parcial resina de 5 a 6 piezas', NULL, '281 euros', 281, false, false, false, true),
('7.3.1', 'Protesis Odontológicas', 'Protesis parciales removibles', 'Acrílicas', 3, 'Parcial resina de 7 en adelante', NULL, '353 euros', 353, false, false, false, true),
('7.3.1', 'Protesis Odontológicas', 'Protesis parciales removibles', 'Acrílicas', 4, 'Parcial removible flexible de 1 a 4 piezas (terminacion en Valplast, TCS, Flexite, Luflex, Denplux, etc)', NULL, '477 euros', 477, false, false, false, true),
('7.3.1', 'Protesis Odontológicas', 'Protesis parciales removibles', 'Acrílicas', 5, 'Parcial removible flexible de 5 a 6 piezas (terminacion en Valplast, TCS, Flexite, Luflex, Denplux, etc)', NULL, '532 euros', 532, false, false, false, true),
('7.3.1', 'Protesis Odontológicas', 'Protesis parciales removibles', 'Acrílicas', 6, 'Parcial removible flexible mas de 7 piezas (terminacion en Valplast, TCS, Flexite, Luflex, Denplux, etc)', NULL, '584 euros', 584, false, false, false, true),
('7.3.1', 'Protesis Odontológicas', 'Protesis parciales removibles', 'Acrílicas', 7, 'Suplemento resinas hipoalergénicas', NULL, '48 euros', 48, false, false, false, true),

-- 7.3.2 METÁLICAS O COLADAS
('7.3.2', 'Protesis Odontológicas', 'Protesis parciales removibles', 'Metálicas o Coladas', 1, 'Esquelético de 1 a 4 piezas', NULL, '345 euros', 345, false, false, false, true),
('7.3.2', 'Protesis Odontológicas', 'Protesis parciales removibles', 'Metálicas o Coladas', 2, 'Esquelético de 5 a 6 piezas', NULL, '434 euros', 434, false, false, false, true),
('7.3.2', 'Protesis Odontológicas', 'Protesis parciales removibles', 'Metálicas o Coladas', 3, 'Esquelético de 7 a 8 piezas', NULL, '551 euros', 551, false, false, false, true),
('7.3.2', 'Protesis Odontológicas', 'Protesis parciales removibles', 'Metálicas o Coladas', 4, 'Esquelético de 9 en adelante', NULL, '650 euros', 650, false, false, false, true),
('7.3.2', 'Protesis Odontológicas', 'Protesis parciales removibles', 'Metálicas o Coladas', 5, 'Suplemento de metales nobles/seminobles (alérgicos) adjuntando el certificado de garantia', NULL, '72 euros', 72, false, false, false, true),
('7.3.2', 'Protesis Odontológicas', 'Protesis parciales removibles', 'Metálicas o Coladas', 6, 'Suplemento por dientes de porcelana (problemas de oclusión)', NULL, '90 euros', 90, false, false, false, true),
('7.3.2', 'Protesis Odontológicas', 'Protesis parciales removibles', 'Metálicas o Coladas', 7, 'Suplemento por ganchos estéticos (unidad)', NULL, '56 euros', 56, false, false, false, true),
('7.3.2', 'Protesis Odontológicas', 'Protesis parciales removibles', 'Metálicas o Coladas', 8, 'Ataches-aditamentos de precisión simple (prótesis mixta)', NULL, '108 euros', 108, false, false, false, true),
('7.3.2', 'Protesis Odontológicas', 'Protesis parciales removibles', 'Metálicas o Coladas', 9, 'Ataches-aditamentos de precisión complejos (prótesis mixta)', NULL, '120 euros', 120, false, false, false, true),

-- 7.4 OCLUSIÓN
('7.4', 'Protesis Odontológicas', 'Oclusión', NULL, 1, 'Férula de descarga simple (bruxismo, apretadores)', NULL, '108 euros', 108, false, false, false, true),
('7.4', 'Protesis Odontológicas', 'Oclusión', NULL, 2, 'Férula de descarga compleja (patología articular)', NULL, '217 euros', 217, false, false, false, true),
('7.4', 'Protesis Odontológicas', 'Oclusión', NULL, 3, 'Análisis oclusal (modelos de estudio)', NULL, 'Incluido', 0, true, false, false, true),
('7.4', 'Protesis Odontológicas', 'Oclusión', NULL, 4, 'Tallado selectivo (por cuadrantes)', NULL, 'Incluido', 0, true, false, false, true),
('7.4', 'Protesis Odontológicas', 'Oclusión', NULL, 5, 'Retirar o cortar coronas o puentes', NULL, 'Incluido', 0, true, false, false, true),
('7.4', 'Protesis Odontológicas', 'Oclusión', NULL, 6, 'Sesión de rehabilitación neuro-oclusal', NULL, '72 euros', 72, false, false, false, true),
('7.4', 'Protesis Odontológicas', 'Oclusión', NULL, 7, 'Revisión y ajuste de férula patología articular', NULL, '25 euros', 25, false, false, false, true),
('7.4', 'Protesis Odontológicas', 'Oclusión', NULL, 8, 'Axiografia y pruebas diagnósticas específicas', NULL, '180 euros', 180, false, false, false, true),

-- 7.5 REPARACIONES
('7.5', 'Protesis Odontológicas', 'Reparaciones', NULL, 1, 'Rebase de prótesis removible en consulta con material autopolimerizable', NULL, '50 euros', 50, false, false, false, true),
('7.5', 'Protesis Odontológicas', 'Reparaciones', NULL, 2, 'Rebase de prótesis removible en laboratorio', NULL, '65 euros', 65, false, false, false, true),
('7.5', 'Protesis Odontológicas', 'Reparaciones', NULL, 3, 'Composturas en prótesis removibles por pieza dental ó gancho a añadir', NULL, '49 euros', 49, false, false, false, true),
('7.5', 'Protesis Odontológicas', 'Reparaciones', NULL, 4, 'Compostura en aparato partido de resina', NULL, '43 euros', 43, false, false, false, true),
('7.5', 'Protesis Odontológicas', 'Reparaciones', NULL, 5, 'Reparaciones de facetas de cerámica', NULL, '50 euros', 50, false, false, false, true),
('7.5', 'Protesis Odontológicas', 'Reparaciones', NULL, 6, 'Reparaciones de facetas de resina', NULL, '43 euros', 43, false, false, false, true),
('7.5', 'Protesis Odontológicas', 'Reparaciones', NULL, 7, 'Soldar metal (puente fijo, esquelético, etc.)', NULL, '36 euros', 36, false, false, false, true),
('7.5', 'Protesis Odontológicas', 'Reparaciones', NULL, 8, 'Cementación de coronas y puentes (desprendidos o caídos)', NULL, '22 euros', 22, false, false, false, true),
('7.5', 'Protesis Odontológicas', 'Reparaciones', NULL, 9, 'Ajustes oclusales en prótesis ya colocadas', NULL, 'Incluido', 0, true, false, false, true),
('7.5', 'Protesis Odontológicas', 'Reparaciones', NULL, 10, 'Otras composturas', NULL, '36 euros', 36, false, false, false, true),

-- ==============================================================================
-- 8. ESTÉTICA
-- ==============================================================================
('8', 'Estética', NULL, NULL, 1, 'Carillas estéticas de composite', NULL, '75 euros', 75, false, false, false, true),
('8', 'Estética', NULL, NULL, 2, 'Carillas estéticas de porcelana', NULL, '180 euros', 180, false, false, false, true),
('8', 'Estética', NULL, NULL, 3, 'Incrustación de porcelana', NULL, '140 euros', 140, false, false, false, true),
('8', 'Estética', NULL, NULL, 4, 'Suplemento porcelanas y efectos especiales (estéticas)', NULL, '50 euros', 50, false, false, false, true),
('8', 'Estética', NULL, NULL, 5, 'Blanqueamiento dental con férulas en domicilio (tratamiento completo)', NULL, '216 euros', 216, false, false, false, true),
('8', 'Estética', NULL, NULL, 6, 'Blanqueamiento dental en consultorio. Cualquier técnica (plasma o láser)', NULL, '250 euros', 250, false, false, false, true),
('8', 'Estética', NULL, NULL, 7, 'Blanqueamiento combinado consultorio (cualquier técnica) y domicilio (kit blanqueador)', NULL, '300 euros', 300, false, false, false, true),
('8', 'Estética', NULL, NULL, 8, 'Blanqueamiento diente no vital por pieza', NULL, '50 euros', 50, false, false, false, true),

-- ==============================================================================
-- 9. ORTODONCIA
-- ==============================================================================
-- 9.1 DIAGNÓSTICO
('9.1', 'Ortodoncia', 'Diagnóstico de ortodoncia', NULL, 1, 'Estudio, valoración y diagnóstico cefalométrico', NULL, '50 euros', 50, false, false, false, true),
('9.1', 'Ortodoncia', 'Diagnóstico de ortodoncia', NULL, 2, 'Estudio fotográfico', NULL, '30 euros', 30, false, false, false, true),
('9.1', 'Ortodoncia', 'Diagnóstico de ortodoncia', NULL, 3, 'Modelos de estudio y preparación sobre yeso', NULL, 'Incluido', 0, true, false, false, true),

-- 9.2 MANTENEDORES
('9.2', 'Ortodoncia', 'Mantenedores de espacio', NULL, 1, 'Mantenedor de espacio fijo unilateral', NULL, '58 euros', 58, false, false, false, true),
('9.2', 'Ortodoncia', 'Mantenedores de espacio', NULL, 2, 'Mantenedor de espacio fijo bilateral', NULL, '87 euros', 87, false, false, false, true),
('9.2', 'Ortodoncia', 'Mantenedores de espacio', NULL, 3, 'Mantenedor de espacio removible', NULL, '72 euros', 72, false, false, false, true),
('9.2', 'Ortodoncia', 'Mantenedores de espacio', NULL, 4, 'Recementado de mantenedor', NULL, '22 euros', 22, false, false, false, true),
('9.2', 'Ortodoncia', 'Mantenedores de espacio', NULL, 5, 'Corona prefabricada metálica (acero)', NULL, '65 euros', 65, false, false, false, true),

-- 9.3 FIJA
('9.3', 'Ortodoncia', 'Aparatología fija', NULL, 1, 'Aparatología por maxilar (arcos fijos, aparatología, brackets, etc)', NULL, '298 euros', 298, false, false, false, true),
('9.3', 'Ortodoncia', 'Aparatología fija', NULL, 2, 'Visitas de revisión y tratamiento aparatologia fija', NULL, '30 euros', 30, false, false, false, true),
('9.3', 'Ortodoncia', 'Aparatología fija', NULL, 3, 'Suplemento ortodoncia fija con bracket autoligable por maxilar', NULL, '140 euros', 140, false, false, false, true),
('9.3', 'Ortodoncia', 'Aparatología fija', NULL, 4, 'Aparatologia ambos maxilares en acero (arcos fijos, brackets metálicos, etc)', NULL, '596 euros', 596, false, false, false, true),
('9.3', 'Ortodoncia', 'Aparatología fija', NULL, 5, 'Quaghelix', NULL, '100 euros', 100, false, false, false, true),
('9.3', 'Ortodoncia', 'Aparatología fija', NULL, 6, 'Tratamiento extra-oral tiro y arco facial', NULL, '188 euros', 188, false, false, false, true),
('9.3', 'Ortodoncia', 'Aparatología fija', NULL, 7, 'Tratamiento extra-oral máscara de aire facial', NULL, '252 euros', 252, false, false, false, true),
('9.3', 'Ortodoncia', 'Aparatología fija', NULL, 8, 'Microimplante o microtornillo ortodoncico', NULL, '90 euros', 90, false, false, false, true),
('9.3', 'Ortodoncia', 'Aparatología fija', NULL, 9, 'Reposición de bracket o banda', NULL, '20 euros', 20, false, false, false, true),
('9.3', 'Ortodoncia', 'Aparatología fija', NULL, 10, 'Control ortodontico periodontal en mayores 14 años', NULL, '25 euros', 25, false, false, false, true),

-- 9.4 REMOVIBLE
('9.4', 'Ortodoncia', 'Aparatología removible', NULL, 1, 'Aparatología por maxilar', NULL, '200 euros', 200, false, false, false, true),
('9.4', 'Ortodoncia', 'Aparatología removible', NULL, 2, 'Aparatología ambos maxilares', NULL, '400 euros', 400, false, false, false, true),
('9.4', 'Ortodoncia', 'Aparatología removible', NULL, 3, 'Visitas de revisión y tratamiento ap. removible', NULL, '25 euros', 25, false, false, false, true),
('9.4', 'Ortodoncia', 'Aparatología removible', NULL, 4, 'Posicionador (por aparato)', NULL, '144 euros', 144, false, false, false, true),
('9.4', 'Ortodoncia', 'Aparatología removible', NULL, 5, 'Placa respiratoria (por aparato)', NULL, '87 euros', 87, false, false, false, true),

-- 9.5 ESTABILIZADORA
('9.5', 'Ortodoncia', 'Aparatología estabilizadora', NULL, 1, 'Aparatología estabilizadora (por aparato)', NULL, '108 euros', 108, false, false, false, true),
('9.5', 'Ortodoncia', 'Aparatología estabilizadora', NULL, 2, 'Visitas de revisión postratamiento', NULL, '25 euros', 25, false, false, false, true),

-- 9.6 ESTÉTICA
('9.6', 'Ortodoncia', 'Estética', NULL, 1, 'Suplemento ortodoncia fija con aparatologia estética (Bracket porcelana/ zafiro) por maxilar', NULL, '180 euros', 180, false, false, false, true),
('9.6', 'Ortodoncia', 'Estética', NULL, 2, 'Suplemento ortodoncia fija con técnica estética lingual', NULL, '1.442 euros', 1442, false, false, false, true),

-- ==============================================================================
-- 10. IMPLANTOLOGÍA
-- ==============================================================================
('10', 'Implantología', NULL, NULL, 1, 'Estudio implantológico', NULL, 'Incluido', 0, true, false, false, true),
('10', 'Implantología', NULL, NULL, 2, 'Cirugía preprotésica', NULL, 'Incluido', 0, true, false, false, true),
('10', 'Implantología', NULL, NULL, 3, 'Implante de titanio', NULL, '550 euros', 550, false, false, false, true),
('10', 'Implantología', NULL, NULL, 4, 'Tornillo de cementación', NULL, 'Incluido', 0, true, false, false, true),
('10', 'Implantología', NULL, NULL, 5, 'Tornillo de cicatrización', NULL, 'Incluido', 0, true, false, false, true),
('10', 'Implantología', NULL, NULL, 6, 'Falso muñón de titanio', NULL, '216 euros', 216, false, false, false, true),
('10', 'Implantología', NULL, NULL, 7, 'Corona metal-cerámica sobre implante', NULL, '303 euros', 303, false, false, false, true),
('10', 'Implantología', NULL, NULL, 8, 'Corona resina sobre implante', NULL, '274 euros', 274, false, false, false, true),
('10', 'Implantología', NULL, NULL, 9, 'Corona Zirconio sobre implante', NULL, '325 euros', 325, false, false, false, true),
('10', 'Implantología', NULL, NULL, 10, 'Supra o mesoestructuras (por pieza)', NULL, '87 euros', 87, false, false, false, true),
('10', 'Implantología', NULL, NULL, 11, 'Aditamentos protésicos (piezas intermedias)', NULL, '247 euros', 247, false, false, false, true),
('10', 'Implantología', NULL, NULL, 12, 'Sobredentaduras', NULL, '890 euros', 890, false, false, false, true),
('10', 'Implantología', NULL, NULL, 13, 'Sistema de anclaje para sobredentaduras (bolas, locator etc...) por unidad', NULL, '230 euros', 230, false, false, false, true),
('10', 'Implantología', NULL, NULL, 14, 'Arcada fija metal-resina', NULL, '2.830 euros', 2830, false, false, false, true),
('10', 'Implantología', NULL, NULL, 15, 'Férula quirúrgica', NULL, 'Incluido', 0, true, false, false, true),
('10', 'Implantología', NULL, NULL, 16, 'Férula para rayos X', NULL, 'Incluido', 0, true, false, false, true),
('10', 'Implantología', NULL, NULL, 17, 'Material de relleno regenerativo', NULL, '175 euros', 175, false, false, false, true),
('10', 'Implantología', NULL, NULL, 18, 'Membrana reabsorvible y/o malla de titanio', NULL, '200 euros', 200, false, false, false, true),
('10', 'Implantología', NULL, NULL, 19, 'Plasma rico en plaquetas (P.R.G.F)', NULL, '150 euros', 150, false, false, false, true),
('10', 'Implantología', NULL, NULL, 20, 'Elevación de seno cerrado', NULL, '130 euros', 130, false, false, false, true),
('10', 'Implantología', NULL, NULL, 21, 'Limpieza y revisión anual de implantes', NULL, '50 euros', 50, false, false, false, true),
('10', 'Implantología', NULL, NULL, 22, 'Vestibuloplastia (por cuadrante)', NULL, '75 euros', 75, false, false, false, true),
('10', 'Implantología', NULL, NULL, 23, 'Alveoloplastia', NULL, '99 euros', 99, false, false, false, true),
('10', 'Implantología', NULL, NULL, 24, 'Remodelación maxilar', NULL, '99 euros', 99, false, false, false, true),

-- ==============================================================================
-- 11. RADIOLOGÍA DENTAL
-- ==============================================================================
('11', 'Radiología dental', NULL, NULL, 1, 'Ortopantomografía', NULL, 'Incluido', 0, true, false, false, true),
('11', 'Radiología dental', NULL, NULL, 2, 'Telerradiografia lateral de cráneo', NULL, 'Incluido', 0, true, false, false, true),
('11', 'Radiología dental', NULL, NULL, 3, 'Radiografia de ATM', NULL, 'Incluido', 0, true, false, false, true),
('11', 'Radiología dental', NULL, NULL, 4, 'Dental Scan (un maxilar)', NULL, '80 euros', 80, false, false, false, true),
('11', 'Radiología dental', NULL, NULL, 5, 'Dental Scan (ambos maxilares)', NULL, '110 euros', 110, false, false, false, true),

-- ==============================================================================
-- 12. INNOVACIONES TECNOLÓGICAS
-- ==============================================================================
-- 12.1 QUIRÚRGICA
('12.1', 'Innovaciones tecnológicas bucodentales', 'Odontología quirúrgica', NULL, 1, 'Suplemento por utilización del láser de diodo en cirugía periodontal (por acto médico)', NULL, '55 euros', 55, false, false, true, true),
('12.1', 'Innovaciones tecnológicas bucodentales', 'Odontología quirúrgica', NULL, 2, 'Técnicas de regeneración tisular guiada (RTG) periodontal con membrana reabsorbible', NULL, '325 euros', 325, false, false, true, true),
('12.1', 'Innovaciones tecnológicas bucodentales', 'Odontología quirúrgica', NULL, 3, 'Obtención y aplicación de plasma rico en plaquetas (terapia regenerativa periodontal)', NULL, '150 euros', 150, false, false, true, true),
('12.1', 'Innovaciones tecnológicas bucodentales', 'Odontología quirúrgica', NULL, 4, 'Elevación de seno abierto', NULL, '310 euros', 310, false, false, true, true),

-- 12.2 ENDODONCIA
('12.2', 'Innovaciones tecnológicas bucodentales', 'Endodoncia', NULL, 1, 'Suplemento por utilización de la microscopia en las endodoncias', NULL, 'Incluido', 0, true, false, true, true),

-- 12.3 ORTODONCIA INVISIBLE
('12.3', 'Innovaciones tecnológicas bucodentales', 'Ortodoncia invisible', NULL, 1, 'Tratamiento completo ambos maxilares hasta 12 meses', NULL, '3.210 euros', 3210, false, false, true, true),
('12.3', 'Innovaciones tecnológicas bucodentales', 'Ortodoncia invisible', NULL, 2, 'Tratamiento completo ambos maxilares hasta 24 meses', NULL, '4.000 euros', 4000, false, false, true, true),

-- 12.4 IMPLANTOLOGÍA GUIADA 3D
('12.4', 'Innovaciones tecnológicas bucodentales', 'Implantología dental guiada por imágenes tridimensionales (3D)', NULL, 1, 'Estudio o planificación del tratamiento de implantología guiada', NULL, '125 euros', 125, false, false, true, true),
('12.4', 'Innovaciones tecnológicas bucodentales', 'Implantología dental guiada por imágenes tridimensionales (3D)', NULL, 2, 'Suplemento de implantologia guiada por tecnología CAD-CAM (por unidad)', NULL, 'Incluido', 0, true, false, true, true),
('12.4', 'Innovaciones tecnológicas bucodentales', 'Implantología dental guiada por imágenes tridimensionales (3D)', NULL, 3, 'Férula de cirugía guiada implantológica', NULL, '375 euros', 375, false, false, true, true),

-- 12.5 CARILLAS DSD
('12.5', 'Innovaciones tecnológicas bucodentales', 'Carilla estética con dental smile design', NULL, 1, 'Modelos de análisis y estudio fotográfico', NULL, 'Incluido', 0, true, false, true, true),
('12.5', 'Innovaciones tecnológicas bucodentales', 'Carilla estética con dental smile design', NULL, 2, 'Encerado diagnóstico estético', NULL, 'Incluido', 0, true, false, true, true),
('12.5', 'Innovaciones tecnológicas bucodentales', 'Carilla estética con dental smile design', NULL, 3, 'Mock-up (Carilla provisional)', NULL, 'Incluido', 0, true, false, true, true),
('12.5', 'Innovaciones tecnológicas bucodentales', 'Carilla estética con dental smile design', NULL, 4, 'Informe presentación del estudio (todos estos registros se los puede llevar el paciente)', NULL, 'Incluido', 0, true, false, true, true),
('12.5', 'Innovaciones tecnológicas bucodentales', 'Carilla estética con dental smile design', NULL, 5, 'Carilla de porcelana mediante técnica tridimensional', NULL, '396 euros', 396, false, false, true, true),

-- 12.6 ESTÉTICA
('12.6', 'Innovaciones tecnológicas bucodentales', 'Estética', NULL, 1, 'Carilla disilicato de litio', NULL, '400 euros', 400, false, false, true, true),

-- 12.7 SAHS
('12.7', 'Innovaciones tecnológicas bucodentales', 'Sindrome de apnea-hipopnea del sueño -sahs-', NULL, 1, 'Estudio, montaje en articulador y toma de registros, incluida radiología (ortopantomografía, telerradiografia)', NULL, '75 euros', 75, false, false, true, true),
('12.7', 'Innovaciones tecnológicas bucodentales', 'Sindrome de apnea-hipopnea del sueño -sahs-', NULL, 2, 'Férula tratamiento para apnea del sueño - garantia de la férula 2 años -', NULL, '800 euros', 800, false, false, true, true),
('12.7', 'Innovaciones tecnológicas bucodentales', 'Sindrome de apnea-hipopnea del sueño -sahs-', NULL, 3, 'Revisión y ajuste de férula de apnea del sueño', NULL, '35 euros', 35, false, false, true, true),
('12.7', 'Innovaciones tecnológicas bucodentales', 'Sindrome de apnea-hipopnea del sueño -sahs-', NULL, 4, 'Reparación, rebase y adaptación de férula de apnea del sueño', NULL, 'Incluido', 0, true, false, true, true);