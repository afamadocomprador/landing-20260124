import React from 'react';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { Metadata } from 'next';
import { createHash } from 'crypto'; 
import dynamic from 'next/dynamic';

// Componentes
import Header from '@/components/layout/Header';
import CookieBanner from '@/components/CookieBanner';
import LocalHero from '@/components/hero/LocalHero'; 
import LeadForm from '@/components/LeadForm';
import FooterLegal from '@/components/FooterLegal';
import Archetypes from '@/components/Archetypes';
// Importamos el nuevo botón de scroll suave
import { SmoothScrollArrow } from '@/components/ui/SmoothScrollArrow';
import { Loader2 } from 'lucide-react'; 

// Importación Dinámica del Mapa
const ClinicMapBrowser = dynamic(
  () => import('@/components/clinics/ClinicMapBrowser'), 
  { 
    ssr: false,
    loading: () => (
      <div className="h-[600px] bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-400">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="text-sm font-fsme">Cargando mapa interactivo...</span>
        </div>
      </div>
    )
  }
);

// --- 1. GENERACIÓN ESTÁTICA (SSG) ---
export async function generateStaticParams() {
  const { data: locations, error } = await supabase
    .from('localizaciones_seo')
    .select('slug');

  if (error || !locations) return [];

  return locations.map((loc) => ({
    city: loc.slug, 
  }));
}

// --- 2. METADATOS ---
export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
  const decodedSlug = decodeURIComponent(params.city);
  
  const { data: seoConfig } = await supabase
    .from('localizaciones_seo')
    .select('*')
    .eq('slug', decodedSlug)
    .single();
  
  if (!seoConfig) return { title: 'Dentistas DKV | Directorio Nacional' };

  return {
    title: seoConfig.seo_title || `Dentistas en ${seoConfig.nombre_visible} | DKV Dentisalud`,
    description: seoConfig.meta_description || `Encuentra clínicas dentales en ${seoConfig.nombre_visible}. Precios pactados y cobertura completa.`,
    alternates: {
      canonical: `https://preciosdentales.es/dentistas/${seoConfig.slug}`,
    }
  };
}

// --- 3. LÓGICA DE DATOS ---
async function getPageData(slug: string) {
  const decodedSlug = decodeURIComponent(slug);
  console.log(`[DEBUG] Consultando datos para: ${decodedSlug}`);
  
  const { data: seoConfig, error: seoError } = await supabase
    .from('localizaciones_seo')
    .select('*')
    .eq('slug', decodedSlug)
    .single();

  if (seoError || !seoConfig) {
    console.error("Error SEO Config:", seoError);
    return null;
  }

  let dentistsRaw: any[] = [];

  try {
    const qFilter = seoConfig.query_filter || "";
    const cpMatch = qFilter.match(/\b\d{5}\b/g);

    if (cpMatch && cpMatch.length > 0) {
        // Estrategia CP
        const { data, error } = await supabase
            .from('medical_directory_raw')
            .select('*') 
            .in('postal_code', cpMatch)
            .limit(200);
        
        if (error) throw error;
        dentistsRaw = data || [];

    } else {
        // Parser SQL / Fallback Ciudad
        let query = supabase.from('medical_directory_raw').select('*');
        let appliedFilters = false;

        const townMatch = qFilter.match(/town\s+ILIKE\s+'([^']+)'/i);
        if (townMatch) {
            const val = townMatch[1].replace(/%/g, ''); 
            query = query.ilike('town', `%${val}%`);
            appliedFilters = true;
        }

        const provMatch = qFilter.match(/province\s+ILIKE\s+'([^']+)'/i);
        if (provMatch) {
            const val = provMatch[1].replace(/%/g, '');
            query = query.ilike('province', `%${val}%`);
            appliedFilters = true;
        }

        if (appliedFilters) {
            const { data, error } = await query.limit(300);
            if (error) throw error;
            dentistsRaw = data || [];
        } else {
            const cleanName = seoConfig.nombre_visible.split(/[:(]/)[0].trim().replace(/Capital|Provincia/gi, '').trim();
            const { data, error } = await supabase
                .from('medical_directory_raw')
                .select('*')
                .or(`town.ilike.%${cleanName}%,address.ilike.%${cleanName}%`)
                .limit(100);
            
            if (error) throw error;
            dentistsRaw = data || [];
        }
    }

  } catch (err: any) {
    console.error("❌ Error crítico buscando dentistas:", err.message);
  }

  // --- AGRUPACIÓN ---
  const centersMap = new Map();

  dentistsRaw.forEach((row) => {
      const latKey = Number(row.latitude).toFixed(4);
      const lngKey = Number(row.longitude).toFixed(4);
      const groupKey = `${row.sp_name}::${latKey}::${lngKey}`;

      if (!centersMap.has(groupKey)) {
          centersMap.set(groupKey, {
              sp_id: row.sp_id, 
              sp_name: row.sp_name,
              address: row.address,
              town: row.town,
              postal_code: row.postal_code,
              latitude: row.latitude,
              longitude: row.longitude,
              phone: row.sp_customer_telephone_1 || row.phone || row.telefono || null,
              professionalsMap: new Map() 
          });
      }
      
      const center = centersMap.get(groupKey);
      const profKey = row.professional_nif || row.nif || row.professional_name;

      if (profKey) {
          if (!center.professionalsMap.has(profKey)) {
              center.professionalsMap.set(profKey, {
                  name: row.professional_name,
                  nif: row.professional_nif || row.nif,
                  specialties: new Set()
              });
          }
          const spec = row.specialty || row.speciality || row.especialidad || row.actividad;
          if (spec) {
              center.professionalsMap.get(profKey).specialties.add(spec);
          }
      }
  });

  let clinics = Array.from(centersMap.values()).map((center: any) => {
      const professionalsList = Array.from(center.professionalsMap.values()).map((p: any) => ({
          name: p.name,
          nif: p.nif,
          specialties: (Array.from(p.specialties) as string[]).sort()
      }));

      return {
          sp_id: center.sp_id,
          sp_name: center.sp_name,
          address: center.address,
          town: center.town,
          postal_code: center.postal_code,
          latitude: center.latitude,
          longitude: center.longitude,
          phone: center.phone,
          is_dkv_propio: false, // <--- ¡AÑADE ESTA LÍNEA! (Valor por defecto)
          professionals: professionalsList
      };
  });

  // ENRIQUECIMIENTO
  if (clinics.length > 0) {
      const clinicsWithHash = clinics.map(c => ({
          ...c,
          hash: createHash('md5').update(c.sp_name.trim()).digest('hex')
      }));

      const hashes = clinicsWithHash.map(c => c.hash);

      const { data: metadatos } = await supabase
        .from('centros_metadata')
        .select('clinic_hash, localized_anchor, is_dkv_propio')
        .in('clinic_hash', hashes);

      clinics = clinicsWithHash.map(clinic => {
          const meta = metadatos?.find((m: any) => m.clinic_hash === clinic.hash);
          return {
              ...clinic,
              is_dkv_propio: meta?.is_dkv_propio || false,
              promo_text: meta?.localized_anchor || null,
          };
      });
  }

  clinics.sort((a: any, b: any) => (b.is_dkv_propio ? 1 : 0) - (a.is_dkv_propio ? 1 : 0));

  return { seoConfig, clinics };
}

const getTierNumber = (tierString: string): number => {
    if (!tierString) return 4;
    if (tierString.includes('tier1')) return 1;
    if (tierString.includes('tier2')) return 2;
    if (tierString.includes('tier3')) return 3;
    return 4;
};

export default async function LocalDentistPage({ params }: { params: { city: string } }) {
  const pageData = await getPageData(params.city);
  if (!pageData) notFound();

  const { seoConfig, clinics } = pageData;
  const cityName = seoConfig.nombre_visible;
  const tierNumber = getTierNumber(seoConfig.tier_classification);

  const defaultCenter: [number, number] = clinics.length > 0 
    ? [clinics[0].latitude, clinics[0].longitude] 
    : [40.4167, -3.7037];

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray selection:bg-dkv-green selection:text-white">
      <CookieBanner />
      <Header />

      <main>
        <LocalHero 
            cityName={cityName} 
            tier={tierNumber} 
            description={seoConfig.copy_contextual}
        />

        {/* --- SECCIÓN RESUMEN (MINIMALISTA - FONDO BLANCO - SCROLL SUAVE) --- */}
        {/* Cambiado py-12 por pt-12 pb-0 para quitar espacio inferior */}
        <section className="bg-white relative flex flex-col justify-center items-center pt-0 pb-0 overflow-hidden">
             <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                 <div className="flex justify-center">
                    {/* Botón con lógica de scroll JS */}
                    <SmoothScrollArrow />
                 </div>
             </div>
        </section>

        {/* MAPA INTERACTIVO */}
        <section className="py-0 bg-white scroll-mt-[60px] min-h-screen flex flex-col" id="mapa-clinicas">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6 pb-8 flex-1 flex flex-col">
                <ClinicMapBrowser clinics={clinics} defaultCenter={defaultCenter} />
                
                {clinics.length === 0 && (
                    <div className="mt-8 p-6 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 text-center rounded shadow-sm">
                        <p className="font-bold mb-2">No hemos encontrado centros exactos en esta zona.</p>
                        <p className="text-sm">Por favor, revisa el filtro de búsqueda o contáctanos.</p>
                        <p className="text-xs text-gray-400 mt-2 font-mono">DEBUG: Filtro Ciudad "{cityName.replace(/Capital|Provincia/gi, '')}" sin resultados.</p>
                    </div>
                )}
            </div>
        </section>

        <section id="presupuesto" className="py-20 bg-dkv-gray-border border-y border-dkv-gray/10 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-4xl font-lemon font-bold text-dkv-green-dark uppercase leading-tight">
                  Consulta disponibilidad en {cityName}
                </h2>
                <p className="text-lg text-dkv-gray font-fsme leading-relaxed">
                  Déjanos tus datos y gestionamos tu primera cita en cualquiera de los centros del mapa.
                </p>
              </div>
              <div className="relative">
                 <div className="absolute -inset-4 bg-dkv-green/5 rounded-xl blur-lg -z-10"></div>
                 <LeadForm />
              </div>
            </div>
          </div>
        </section>

        <Archetypes />
      </main>

      <FooterLegal />
    </div>
  );

}

