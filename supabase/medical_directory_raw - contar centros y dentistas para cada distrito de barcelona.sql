-- CONSULTA PARA CONTAR CENTROS DENTALES POR DISTRITO EN BARCELONA
-- Basado en la tabla de Tiers y Códigos Postales proporcionada.

WITH districts_config AS (
              SELECT '01 - Ciutat Vella' as distrito, 'barcelona-ciutat-vella' as slug, ARRAY[08001, 08002, 08003, 08039] as postal_codes
    UNION ALL SELECT '02 - L Eixample', 'barcelona-leixample', ARRAY[08007, 08008, 08009, 08010, 08011, 08013, 08015, 08025, 08036, 08037]
    UNION ALL SELECT '03 - Sants-Montjuïc', 'barcelona-sants-montjuic', ARRAY[08004, 08014, 08038, 08040]
    UNION ALL SELECT '04 - Les Corts', 'barcelona-les-corts', ARRAY[08028, 08029, 08034]
    UNION ALL SELECT '05 - Sarrià-Sant Gervasi', 'madrid-sarria-sant-gervasi', ARRAY[08006, 08017, 08021, 08022]
    UNION ALL SELECT '06 - Gracia', 'barcelona-gracia', ARRAY[08012, 08023, 08024]
    UNION ALL SELECT '07 - Horta-Guinardó', 'barcelona-horta-guinardo', ARRAY[08031, 08032, 08035, 08041]
    UNION ALL SELECT '08 - Nou Barris', 'barcelona-nou-barris', ARRAY[08016, 08033, 08042]
    UNION ALL SELECT '09 - Sant Andreu', 'barcelona-sant-andreu', ARRAY[08027, 08030]
    UNION ALL SELECT '10 - Sant Martí', 'barcelona-sant-marti', ARRAY[08005, 08018, 08019, 08020, 08026]
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
    m.province ILIKE 'Barcelona' -- Aseguramos que sea Barcelona provincia por si hay CPs coincidentes raros
    and m.town ILIKE 'Barcelona' -- Aseguramos que sea Barcelona provincia por si hay CPs coincidentes raros
GROUP BY 
    d.distrito, d.slug
ORDER BY 
    d.distrito;