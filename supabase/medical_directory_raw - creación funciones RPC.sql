-- ================================================================
-- 1. FUNCIÓN PARA OBTENER PROVINCIAS ÚNICAS
-- ================================================================
DROP FUNCTION IF EXISTS get_unique_provinces();

create or replace function get_unique_provinces()
returns table (province text)
language sql
as $$
  select distinct province
  from medical_directory_raw
  where province is not null and province != ''
  order by province asc;
$$;

-- ================================================================
-- 2. FUNCIÓN PARA OBTENER LOCALIDADES (según provincia)
-- ================================================================
DROP FUNCTION IF EXISTS get_unique_towns(text);

create or replace function get_unique_towns(p_province text)
returns table (town text)
language sql
as $$
  select distinct town
  from medical_directory_raw
  where province = p_province
  and town is not null and town != ''
  order by town asc;
$$;

-- ================================================================
-- 3. FUNCIÓN PARA OBTENER CÓDIGOS POSTALES (según prov. y localidad)
-- ================================================================
DROP FUNCTION IF EXISTS get_unique_postal_codes(text, text);

create or replace function get_unique_postal_codes(p_province text, p_town text)
returns table (postal_code int)
language sql
as $$
  select distinct postal_code
  from medical_directory_raw
  where province = p_province
  and town = p_town
  and postal_code is not null
  order by postal_code asc;
$$;

-- ================================================================
-- 4. BÚSQUEDA GEO-ESPACIAL ("Cerca de mí")
-- ================================================================
-- 1. Limpiamos versiones anteriores
DROP FUNCTION IF EXISTS get_nearest_clinics(float, float, int);
DROP FUNCTION IF EXISTS get_nearest_clinics(float, float, int, int);

-- 2. Creamos la función corregida (Tipos Geography)
create or replace function get_nearest_clinics(
  lat float, 
  long float, 
  limit_count int default 50,
  max_dist_meters int default 10000
)
returns setof medical_directory_raw
language sql
as $$
  select *
  from medical_directory_raw
  -- CORRECCIÓN: Convertimos el punto de entrada a ::geography
  -- ST_Distance sobre geography devuelve metros automáticamente
  where ST_Distance(
    location_gis, 
    ST_SetSRID(ST_MakePoint(long, lat), 4326)::geography
  ) <= max_dist_meters
  -- Ordenamos por cercanía usando el operador <-> (muy rápido con índices)
  order by location_gis <-> ST_SetSRID(ST_MakePoint(long, lat), 4326)::geography
  limit limit_count;
$$;




-- Borramos funciones antiguas para limpiar
DROP FUNCTION IF EXISTS get_service_points(float, float, int, int, text, text, text);

create or replace function get_service_points(
  p_lat float, 
  p_long float, 
  p_limit int default 50,
  p_max_dist_meters int default 10000,
  p_search_text text default null,
  p_province text default null,
  p_town text default null
)
returns table (
  sp_id text,
  sp_name text,
  address text,
  postal_code text,
  town text,
  province text,
  latitude float,
  longitude float,
  num_professionals bigint,
  dist_meters float,
  specialties text[]
)
language sql
as $$
  with cleaned_data as (
    select 
      sp_id,
      sp_name,
      address,
      postal_code,
      town,
      province,
      latitude,
      longitude,
      location_gis,
      combined_name,
      professional_name,
      CASE 
        WHEN speciality = 'Odontología General' THEN 'Odontología General'
        WHEN speciality = 'Odontología Implantes' THEN 'Implantes'
        WHEN speciality = 'Odontología Ortodoncia' THEN 'Ortodoncia'
        WHEN speciality = 'Radiología Dental' THEN 'Radiología'
        WHEN speciality = 'Innovaciones tecnológicas bucodentales' THEN 'Innovaciones'
        ELSE NULL 
      END as clean_spec
    from medical_directory_raw
  )
  select 
    sp_id,
    MAX(sp_name) as sp_name,
    MAX(address) as address,
    MAX(postal_code) as postal_code,
    MAX(town) as town,
    MAX(province) as province,
    MAX(latitude) as latitude,
    MAX(longitude) as longitude,
    -- CORRECCIÓN: Filtro ultra-estricto para el contador
    COUNT(DISTINCT CASE 
        WHEN professional_name IS NULL THEN NULL
        WHEN TRIM(professional_name) = '' THEN NULL 
        WHEN LENGTH(TRIM(professional_name)) < 2 THEN NULL -- Ignora ".", "-", " "
        WHEN TRIM(professional_name) ILIKE TRIM(sp_name) THEN NULL 
        WHEN combined_name IS NOT NULL AND TRIM(professional_name) ILIKE TRIM(combined_name) THEN NULL 
        ELSE UPPER(TRIM(professional_name)) 
    END) as num_professionals,
    ST_Distance(
      location_gis, 
      ST_SetSRID(ST_MakePoint(p_long, p_lat), 4326)::geography
    ) as dist_meters,
    array_remove(array_agg(DISTINCT clean_spec), NULL) as specialties
  from cleaned_data
  where 
    ST_Distance(
      location_gis, 
      ST_SetSRID(ST_MakePoint(p_long, p_lat), 4326)::geography
    ) <= p_max_dist_meters
    AND (p_province IS NULL OR province = p_province)
    AND (p_town IS NULL OR town = p_town)
    AND (
      p_search_text IS NULL OR 
      p_search_text = '' OR
      combined_name ILIKE '%' || p_search_text || '%' OR
      sp_name ILIKE '%' || p_search_text || '%' OR
      address ILIKE '%' || p_search_text || '%' OR
      town ILIKE '%' || p_search_text || '%'
    )
  group by sp_id, location_gis
  order by dist_meters asc
  limit p_limit;
$$;