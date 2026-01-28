-- CONSULTA PARA CONTAR CENTROS DENTALES POR DISTRITO EN GRANADA
-- Basado en la tabla de Tiers y Códigos Postales proporcionada.

WITH districts_config AS (
              SELECT '01 - Centro, Realejo y Norte' as distrito, 'granada-centro-realejo-norte' as slug, ARRAY[18001, 18002, 18009, 18010, 18011, 18012, 18013] as postal_codes
    UNION ALL SELECT '02 - Ronda, Zaidin y Chana', 'granada-ronda-zaidin-chana', ARRAY[18003, 18004, 18005, 18006, 18007, 18008, 18014, 18015]
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
    m.province ILIKE 'Granada' -- Aseguramos que sea Barcelona provincia por si hay CPs coincidentes raros
    and m.town ILIKE 'Granada' -- Aseguramos que sea Barcelona provincia por si hay CPs coincidentes raros
GROUP BY 
    d.distrito, d.slug
ORDER BY 
    d.distrito;