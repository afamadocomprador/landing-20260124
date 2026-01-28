import React from 'react';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { Metadata } from 'next';

// --- COMPONENTES ---
// 1. Usamos el Header V1 (Bonito)
import Header from '@/components/layout/Header';
import CookieBanner from '@/components/CookieBanner';

// 2. Renombramos el Hero Dinámico a "LocalHero" por coherencia arquitectónica
// (Asegúrate de que este componente exista o renombra el archivo antiguo)
import LocalHero from '@/components/Hero'; // TODO: Mover a @/components/hero/LocalHero.tsx

import PricingCards from '@/components/PricingCards';
import LeadForm from '@/components/LeadForm';
import FooterLegal from '@/components/FooterLegal';
import Archetypes from '@/components/Archetypes';
import { FileCheck, CheckCircle2, ChevronRight, MapPin, Info } from 'lucide-react';

// --- 1. GENERACIÓN ESTÁTICA (SSG) ---
export async function generateStaticParams() {
  // ... (Lógica SSG intacta) ...
  console.log("🛠️ [SSG] Iniciando generateStaticParams...");
  
  const { data: locations, error } = await supabase
    .from('localizaciones_seo')
    .select('slug');

  if (error) return [];
  if (!locations || locations.length === 0) return [];

  return locations.map((loc) => ({
    city: loc.slug, 
  }));
}

// --- 2. METADATOS DINÁMICOS ---
export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
  // ... (Lógica Metadata intacta) ...
  const decodedSlug = decodeURIComponent(params.city);
  
  const { data: seoConfig } = await supabase
    .from('localizaciones_seo')
    .select('*')
    .eq('slug', decodedSlug)
    .single();
  
  if (!seoConfig) return { title: 'DKV Dentisalud Élite' };

  return {
    title: seoConfig.seo_title,
    description: `${seoConfig.h1_hero}. ${seoConfig.copy_contextual.substring(0, 150)}...`,
    alternates: {
      canonical: `https://midominio.com/seguro-dental/${seoConfig.slug}`,
    }
  };
}

// --- 3. LÓGICA DE DATOS ---
async function getPageData(slug: string) {
  // ... (Lógica de Datos intacta: Supabase, RPCs, etc.) ...
  const decodedSlug = decodeURIComponent(slug);
  
  // A. Configuración SEO
  const { data: seoConfig, error: seoError } = await supabase
    .from('localizaciones_seo')
    .select('*')
    .eq('slug', decodedSlug)
    .single();

  if (seoError || !seoConfig) return null;

  let clinics = [];

  // B. Búsqueda de Clínicas (Simplificada para brevedad, mantener lógica original)
  if (seoConfig.tier_classification !== 'tier3') {
    const cpMatch = seoConfig.query_filter.match(/'(\d{5})'/g);
    if (cpMatch) {
      const postalCodes = cpMatch.map((cp: string) => cp.replace(/'/g, ''));
      const { data } = await supabase
        .from('medical_directory_raw')
        .select(`sp_id, sp_name, address, town, postal_code, latitude, longitude, professional_name`)
        .in('postal_code', postalCodes)
        .limit(100);
        
      // Agrupación manual
      const uniqueClinicsMap = new Map();
      data?.forEach((item: any) => {
          if (!uniqueClinicsMap.has(item.sp_id)) {
              uniqueClinicsMap.set(item.sp_id, { ...item, num_professionals: 1 });
          } else {
              uniqueClinicsMap.get(item.sp_id).num_professionals++;
          }
      });
      clinics = Array.from(uniqueClinicsMap.values());

    } else {
       // Fallback texto
       const cityName = seoConfig.nombre_visible.split(':')[0].trim(); 
       const { data } = await supabase.rpc('get_service_points', { p_limit: 20, p_search_text: cityName });
       clinics = data || [];
    }
  } 
  
  // Lógica Radial
  if (seoConfig.tier_classification === 'tier3' || clinics.length < 3) {
      const latBase = 40.4167; // Default Madrid
      const longBase = -3.7037;
      const { data } = await supabase.rpc('get_nearest_clinics', { lat: latBase, long: longBase, limit_count: 10, max_dist_meters: 50000 });
      if (clinics.length === 0) clinics = data || [];
  }

  // C. Metadatos (Localized Anchors)
  const { data: metadatos } = await supabase.from('centros_metadata').select('clinic_hash, name, localized_anchor, is_dkv_propio');
  if (metadatos && metadatos.length > 0) {
      clinics = clinics.map((clinic: any) => {
          const specificMeta = metadatos.find((m:any) => 
              (m.name && clinic.sp_name && m.name === clinic.sp_name) || 
              (clinic.sp_name && m.name && clinic.sp_name.includes(m.name))
          );
          return { ...clinic, localized_anchor: specificMeta?.localized_anchor || null, is_dkv_propio: specificMeta?.is_dkv_propio || false };
      });
  }

  return { seoConfig, clinics };
}

// --- 4. COMPONENTE VISUAL ---
export default async function CityLandingPage({ params }: { params: { city: string } }) {
  const pageData = await getPageData(params.city);
  if (!pageData) notFound();

  const { seoConfig, clinics } = pageData;
  const totalDentistas = clinics.reduce((acc: any, curr: any) => acc + (curr.num_professionals || 1), 0);

  return (
    // CAMBIO V2->V1:
    // text-neutral -> text-dkv-gray
    // font-body -> font-fsme
    // selection:bg-primary -> selection:bg-dkv-green
    <div className="min-h-screen bg-white font-fsme text-dkv-gray selection:bg-dkv-green selection:text-white">
      <CookieBanner />
      <Header />

      <main>
        {/* Usamos el Hero Dinámico (LocalHero) */}
        <LocalHero 
            cityName={seoConfig.nombre_visible} 
            tier={seoConfig.tier_classification.includes('tier1') ? 1 : seoConfig.tier_classification === 'tier2' ? 2 : 3} 
        />

        {/* Sección de Contexto (Estadísticas) */}
        {/* bg-neutral-light -> bg-dkv-gray-border */}
        {/* border-neutral -> border-dkv-gray */}
        <section className="bg-dkv-gray-border/30 py-10 border-b border-dkv-gray/5">
             <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
                 {/* text-secondary -> text-dkv-green-dark */}
                 {/* font-display -> font-lemon */}
                 <p className="text-xl text-dkv-green-dark font-medium font-lemon leading-relaxed">
                    "{seoConfig.copy_contextual}"
                 </p>
                 
                 <div className="flex flex-wrap justify-center gap-6 text-sm text-dkv-gray pt-2">
                    <span className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm border border-dkv-gray/10">
                        {/* text-primary -> text-dkv-green */}
                        <MapPin className="w-4 h-4 text-dkv-green"/> 
                        <strong>{clinics.length}</strong> Centros Concertados
                    </span>
                    <span className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm border border-dkv-gray/10">
                        <UsersIcon className="w-4 h-4 text-dkv-green"/> 
                        <strong>{totalDentistas}</strong> Profesionales Disponibles
                    </span>
                 </div>
             </div>
        </section>

        <div id="ventajas">
          <PricingCards />
        </div>

        {/* Sección Grid de Clínicas */}
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    {/* font-display -> font-lemon */}
                    <h3 className="text-2xl font-lemon font-bold text-dkv-green-dark uppercase tracking-widest">
                        Cuadro Médico Destacado en {seoConfig.nombre_visible}
                    </h3>
                    <p className="text-dkv-gray mt-2">Selección de centros DKV Dentisalud Élite en tu zona.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clinics.slice(0, 9).map((clinic: any, idx: number) => (
                        <div key={idx} className="bg-white p-6 rounded-xl border border-dkv-gray/10 hover:border-dkv-green hover:shadow-md transition-all group relative overflow-hidden">
                            {clinic.is_dkv_propio && (
                                <div className="absolute top-0 right-0 bg-dkv-green text-white text-[10px] px-2 py-1 rounded-bl font-bold uppercase tracking-wide z-10">
                                    Centro Propio
                                </div>
                            )}

                            <div className="mb-4 pr-6">
                                {/* text-secondary -> text-dkv-green-dark */}
                                {/* group-hover:text-primary -> group-hover:text-dkv-green */}
                                <h4 className="font-bold text-dkv-green-dark group-hover:text-dkv-green transition-colors text-lg line-clamp-1">
                                    {clinic.sp_name}
                                </h4>
                                <p className="text-sm text-dkv-gray/70 mb-1 flex items-start gap-2 mt-1">
                                    <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-gray-400" />
                                    {clinic.address}, {clinic.postal_code}
                                </p>
                            </div>

                            {clinic.localized_anchor ? (
                                <div className="mt-4 p-3 bg-dkv-gray-border rounded-lg text-xs text-dkv-green-dark italic border-l-2 border-dkv-green">
                                    <Info className="w-3 h-3 inline-block mr-1 mb-0.5 text-dkv-green" />
                                    {clinic.localized_anchor}
                                </div>
                            ) : (
                                <div className="mt-4 pt-3 border-t border-dkv-gray/5 text-xs text-dkv-gray-disabled italic">
                                    Centro concertado red DKV Dentisalud.
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                
                {clinics.length > 9 && (
                    <div className="text-center mt-10">
                        <p className="text-sm text-dkv-gray italic">...y {clinics.length - 9} clínicas más disponibles en esta zona para tu comodidad.</p>
                    </div>
                )}
            </div>
        </section>

        {/* Sección Formulario */}
        <section id="presupuesto" className="py-20 bg-dkv-gray-border border-y border-dkv-gray/10 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-4xl font-lemon font-bold text-dkv-green-dark uppercase leading-tight">
                  ¿Vives en {seoConfig.nombre_visible}? <br/> Empieza a ahorrar hoy.
                </h2>
                <p className="text-lg text-dkv-gray font-fsme leading-relaxed">
                  Déjanos tus datos y recibe una propuesta personalizada para los centros de <strong>{seoConfig.nombre_visible}</strong> con las tarifas oficiales 2025.
                </p>
                <ul className="space-y-4 mt-6">
                  <li className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-dkv-green font-bold shadow-sm border border-dkv-gray/10">1</span>
                    <span className="text-dkv-green-dark font-bold">Estudio de ahorro gratuito</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-dkv-green font-bold shadow-sm border border-dkv-gray/10">2</span>
                    <span className="text-dkv-green-dark font-bold">Acceso a red tecnológica</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                 {/* Brillo de fondo: bg-primary -> bg-dkv-green */}
                 <div className="absolute -inset-4 bg-dkv-green/5 rounded-xl blur-lg -z-10"></div>
                 <LeadForm />
              </div>
            </div>
          </div>
        </section>

        {/* Sección Sin Burocracia */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-lemon font-bold text-dkv-green-dark mb-12 tracking-widest uppercase">
              OLVIDA LA BUROCRACIA
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-dkv-gray-border rounded-full flex items-center justify-center shadow-sm text-dkv-green-dark border border-dkv-gray/10">
                  <FileCheck className="w-8 h-8" />
                </div>
                <p className="font-bold text-dkv-green-dark text-sm uppercase tracking-wide">Muestras tu tarjeta</p>
              </div>
              <ChevronRight className="w-8 h-8 text-dkv-green hidden md:block opacity-30" />
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-dkv-green rounded-full flex items-center justify-center shadow-lg text-white">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <p className="font-bold text-dkv-green-dark text-sm uppercase tracking-wide">Accedes al servicio</p>
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

// Icono auxiliar (actualizado con text-dkv-green)
function UsersIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    )
}