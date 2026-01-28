-- Script PL/pgSQL para vincular los componentes al pack 'Implante normal'

DO $$
DECLARE
    v_compound_id uuid;
    v_implant_id uuid;
    v_tornillo_id uuid;
    v_corona_id uuid;
    v_aditamento_id uuid;
BEGIN
    -- 1. Obtener ID del Tratamiento Compuesto (Padre)
    SELECT id INTO v_compound_id 
    FROM dental_treatments 
    WHERE treatment_name = 'Implante normal' AND is_basic = false;

    -- Si no existe el padre, lanzamos error (aunque acabamos de crearlo)
    IF v_compound_id IS NULL THEN
        RAISE EXCEPTION 'No se encontró el tratamiento compuesto "Implante normal"';
    END IF;

    -- 2. Obtener IDs de los Tratamientos Básicos (Hijos) buscando por nombre exacto
    
    -- A) Implante de titanio (550€)
    SELECT id INTO v_implant_id 
    FROM dental_treatments WHERE treatment_name = 'Implante de titanio' LIMIT 1;
    
    -- B) Tornillo de cementación (Incluido)
    SELECT id INTO v_tornillo_id 
    FROM dental_treatments WHERE treatment_name = 'Tornillo de cementación' LIMIT 1;
    
    -- C) Corona metal-cerámica sobre implante (303€)
    SELECT id INTO v_corona_id 
    FROM dental_treatments WHERE treatment_name = 'Corona metal-cerámica sobre implante' LIMIT 1;
    
    -- D) Aditamentos protésicos (247€)
    SELECT id INTO v_aditamento_id 
    FROM dental_treatments WHERE treatment_name = 'Aditamentos protésicos (piezas intermedias)' LIMIT 1;

    -- 3. Limpiar relaciones previas para evitar duplicados si se re-ejecuta
    DELETE FROM treatment_composition WHERE compound_treatment_id = v_compound_id;

    -- 4. Insertar las nuevas relaciones
    
    -- Componente 1: Implante
    IF v_implant_id IS NOT NULL THEN
        INSERT INTO treatment_composition (compound_treatment_id, basic_treatment_id, quantity)
        VALUES (v_compound_id, v_implant_id, 1);
    END IF;

    -- Componente 2: Tornillo
    IF v_tornillo_id IS NOT NULL THEN
        INSERT INTO treatment_composition (compound_treatment_id, basic_treatment_id, quantity)
        VALUES (v_compound_id, v_tornillo_id, 1);
    END IF;

    -- Componente 3: Corona
    IF v_corona_id IS NOT NULL THEN
        INSERT INTO treatment_composition (compound_treatment_id, basic_treatment_id, quantity)
        VALUES (v_compound_id, v_corona_id, 1);
    END IF;
    
    -- Componente 4: Aditamentos
    IF v_aditamento_id IS NOT NULL THEN
        INSERT INTO treatment_composition (compound_treatment_id, basic_treatment_id, quantity)
        VALUES (v_compound_id, v_aditamento_id, 1);
    END IF;

END $$;