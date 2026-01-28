-- CONSULTA PARA CONTAR CENTROS DENTALES POR DISTRITO EN MADRID
-- Basado en la tabla de Tiers y Códigos Postales proporcionada.

WITH districts_config AS (
    SELECT 
        '01 - Centro' as distrito, 'madrid-centro' as slug, ARRAY[28004, 28005, 28012, 28013, 28014] as postal_codes
    UNION ALL SELECT '02 - Arganzuela', 'madrid-arganzuela', ARRAY[28005, 28045]
    UNION ALL SELECT '03 - Retiro', 'madrid-retiro', ARRAY[28007, 28009, 28014]
    UNION ALL SELECT '04 - Salamanca', 'madrid-salamanca', ARRAY[28001, 28006, 28009, 28010, 28028]
    UNION ALL SELECT '05 - Chamartín', 'madrid-chamartin', ARRAY[28002, 28016, 28036, 28046]
    UNION ALL SELECT '06 - Tetuán', 'madrid-tetuan', ARRAY[28020, 28029, 28039]
    UNION ALL SELECT '07 - Chamberí', 'madrid-chamberi', ARRAY[28003, 28010, 28015]
    UNION ALL SELECT '08 - Fuencarral', 'madrid-fuencarral', ARRAY[28029, 28034, 28035, 28048, 28049]
    UNION ALL SELECT '09 - Moncloa', 'madrid-moncloa', ARRAY[28008, 28023, 28040]
    UNION ALL SELECT '10 - Latina', 'madrid-latina', ARRAY[28011, 28024, 28044, 28047]
    UNION ALL SELECT '11 - Carabanchel', 'madrid-carabanchel', ARRAY[28019, 28025, 28026, 28044]
    UNION ALL SELECT '12 - Usera', 'madrid-usera', ARRAY[28026, 28041]
    UNION ALL SELECT '13 - P. Vallecas', 'madrid-vallecas', ARRAY[28018, 28031, 28038, 28053]
    UNION ALL SELECT '14 - Moratalaz', 'madrid-moratalaz', ARRAY[28030]
    UNION ALL SELECT '15 - C. Lineal', 'madrid-ciudad-lineal', ARRAY[28017, 28027, 28033, 28037, 28043]
    UNION ALL SELECT '16 - Hortaleza', 'madrid-hortaleza', ARRAY[28033, 28042, 28043, 28050, 28055]
    UNION ALL SELECT '17 - Villaverde', 'madrid-villaverde', ARRAY[28021, 28041]
    UNION ALL SELECT '18 - V. Vallecas', 'madrid-villa-vallecas', ARRAY[28031, 28051]
    UNION ALL SELECT '19 - Vicálvaro', 'madrid-vicalvaro', ARRAY[28032, 28052]
    UNION ALL SELECT '20 - San Blas', 'madrid-san-blas', ARRAY[28022, 28032, 28037]
    UNION ALL SELECT '21 - Barajas', 'madrid-barajas', ARRAY[28042]
)
SELECT 
    d.distrito,
    d.slug,
    COUNT(DISTINCT m.sp_id) as num_centros,
    COUNT(DISTINCT m.professional_nif) as num_dentistas
FROM 
    districts_config d
LEFT JOIN 
    medical_directory_raw m ON m.postal_code = ANY(d.postal_codes)
WHERE
    m.province ILIKE 'Madrid' -- Aseguramos que sea Madrid provincia por si hay CPs coincidentes raros
GROUP BY 
    d.distrito, d.slug
ORDER BY 
    d.distrito;