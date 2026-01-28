WITH capitales_especiales(prov_name, cap_name) AS (
    VALUES 
        ('Asturias', 'Oviedo'),
        ('Almeria', 'Almería'),
        ('Avila', 'Ávila'),
        ('Caceres', 'Cáceres'),
        ('Cadiz', 'Cádiz'),
        ('Jaen', 'Jaén'),
        ('Leon', 'León'),
        ('Malaga', 'Málaga'),
        ('Castellon', 'Castellón de la Plana'),
        ('Cordoba', 'Córdoba'),
        ('Baleares', 'Palma de Mallorca'),
        ('Las Palmas', 'Las Palmas de Gran Canaria'),
        ('S.C.Tenerife', 'Santa Cruz de Tenerife'),
        ('Cantabria', 'Santander'),
        ('Navarra', 'Pamplona'),
        ('Alava', 'Vitoria-Gasteiz'),
        ('Guipuzcoa', 'San Sebastián'),
        ('Vizcaya', 'Bilbao'),
        ('La Rioja', 'Logroño'),
        ('Gerona (Girona)', 'Gerona')
        )
SELECT 
    t.province AS "Provincia",
    t.town AS "Localidad",
    t.sp_name,
    t.latitude,
    t.longitude,
    
    -- TOTALES
    COUNT(DISTINCT t.sp_id) AS "Total Centros",
    COUNT(DISTINCT t.professional_name) AS "Total Dentistas",
    
    -- EN CAPITAL
    COUNT(DISTINCT CASE 
        WHEN t.town = COALESCE(ce.cap_name, t.province) 
        THEN t.sp_id 
    END) AS "Centros en Capital",
    
    COUNT(DISTINCT CASE 
        WHEN t.town = COALESCE(ce.cap_name, t.province) 
        THEN t.professional_name 
    END) AS "Dentistas en Capital",
    
    -- FUERA DE CAPITAL (RESTO PROVINCIA)
    COUNT(DISTINCT CASE 
        WHEN t.town <> COALESCE(ce.cap_name, t.province) 
        THEN t.sp_id 
    END) AS "Centros fuera Capital",
    
    COUNT(DISTINCT CASE 
        WHEN t.town <> COALESCE(ce.cap_name, t.province) 
        THEN t.professional_name 
    END) AS "Dentistas fuera Capital"

FROM medical_directory_raw t
LEFT JOIN capitales_especiales ce ON t.province = ce.prov_name
GROUP BY t.province, t.town, t.sp_name, t.latitude, t.longitude
ORDER BY t.province ASC, t.town ASC;