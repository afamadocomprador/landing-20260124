import React from 'react';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { Metadata } from 'next';

// --- COMPONENTES V1 (ESTILO DKV) ---
import Header from '@/components/layout/Header';
import CookieBanner from '@/components/CookieBanner';
import LocalHero from '@/components/hero/LocalHero'; 
import PricingCards from '@/components/PricingCards';
import LeadForm from '@/components/LeadForm';
import FooterLegal from '@/components/FooterLegal';
import Archetypes from '@/components/Archetypes';
import { MapPin, Info, Users } from 'lucide-react';

// --- 1. GENERACIÓN ESTÁTICA (SSG) ---
export async function generateStaticParams() {
  console.log("🛠️ [SSG] Generando rutas estáticas para [city]...");
  
  const { data: locations, error } = await supabase
    .from('localizaciones_seo')
    .select('slug');

  if (error || !locations) return [];

  // CORRECCIÓN: Devolvemos 'city' porque así se llama la carpeta
  return locations.map((loc) => ({
    city: loc.slug, 
  }));
}

// --- 2. METADATOS ---
export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
  // CORRECCIÓN: Usamos params.city
  const decodedSlug = decodeURIComponent(params.city);
  
  const { data: seoConfig } = await supabase
    .from('localizaciones_seo')
    .select('*')
    .eq('slug', decodedSlug)
    .single();
  
  if (!seoConfig) return { title: 'Dentistas DKV | Directorio Nacional' };

  return {
    title: seoConfig.seo_title || `Dentistas en ${decodedSlug} | DKV Dentisalud`,
    description: seoConfig.meta_description || `Encuentra clínicas dentales en ${decodedSlug}. Precios pactados.`,
    alternates: {
      canonical: `https://preciosdentales.es/dentistas/${seoConfig.slug}`,
    }
  };
}

// --- 3. LÓGICA DE DATOS ---
async function getPageData(slug: string) {
  const decodedSlug = decodeURIComponent(slug);
  
  // A. Configuración SEO
  const { data: seoConfig, error: seoError } = await supabase
    .from('localizaciones_seo')
    .select('*')
    .eq('slug', decodedSlug)
    .single();

  if (seoError || !seoConfig) return null;

  let clinics = [];

  // B. Búsqueda de Clínicas (Inteligente)
  if (seoConfig.tier_classification !== 'tier3') {
    const cpMatch = seoConfig.query_filter?.match(/'(\d{5})'/g);
    if (cpMatch) {
      const postalCodes = cpMatch.map((cp: string) => cp.replace(/'/g, ''));
      const { data } = await supabase
        .from('medical_directory_raw')
        .select(`sp_id, sp_name, address, town, postal_code, latitude, longitude, professional_name`)
        .in('postal_code', postalCodes)
        .limit(50);
        
      const uniqueMap = new Map();
      data?.forEach((item: any) => {
          if (!uniqueMap.has(item.sp_id)) uniqueMap.set(item.sp_id, item);
      });
      clinics = Array.from(uniqueMap.values());

    } else {
       const cityName = seoConfig.nombre_visible.split(':')[0].trim(); 
       const { data } = await supabase.rpc('get_service_points', { p_limit: 20, p_search_text: cityName });
       clinics = data || [];
    }
  } 
  
  if (clinics.length < 3) {
      const latBase = 40.4167; 
      const longBase = -3.7037;
      const { data } = await supabase.rpc('get_nearest_clinics', { lat: latBase, long: longBase, limit_count: 10, max_dist_meters: 50000 });
      if (data) clinics = [...clinics, ...data];
  }

  // C. Metadatos Extra
  const { data: metadatos } = await supabase.from('centros_metadata').select('clinic_hash, name, localized_anchor, is_dkv_propio');
  
  const enrichedClinics = clinics.map((clinic: any) => {
      const meta = metadatos?.find((m:any) => clinic.sp_name && m.name && clinic.sp_name.includes(m.name));
      return { 
          ...clinic, 
          is_dkv_propio: meta?.is_dkv_propio || false,
          promo_text: meta?.localized_anchor || null
      };
  });

  return { seoConfig, clinics: enrichedClinics };
}

// --- 4. COMPONENTE VISUAL ---
export default async function LocalDentistPage({ params }: { params: { city: string } }) {
  // CORRECCIÓN: Usamos params.city para obtener los datos
  const pageData = await getPageData(params.city);
  if (!pageData) notFound();

  const { seoConfig, clinics } = pageData;
  const cityName = seoConfig.nombre_visible;

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray selection:bg-dkv-green selection:text-white">
      <CookieBanner />
      <Header />

      <main>
        {/* HERO */}
        <LocalHero cityName={cityName} tier={seoConfig.tier_classification === 'tier1' ? 1 : 3} />

        {/* DATA CONTEXT */}
        <section className="bg-dkv-gray-border/50 py-10 border-y border-dkv-gray-border">
             <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
                 <p className="text-xl text-dkv-green-dark font-medium font-lemon leading-relaxed">
                    "{seoConfig.copy_contextual || `La mejor atención dental en ${cityName} al alcance de tu mano.`}"
                 </p>
                 
                 <div className="flex flex-wrap justify-center gap-4 text-sm text-dkv-gray pt-4">
                    <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-dkv-gray-border">
                        <MapPin className="w-4 h-4 text-dkv-green"/> 
                        <strong>{clinics.length}</strong> Centros Disponibles
                    </span>
                    <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-dkv-gray-border">
                        <Users className="w-4 h-4 text-dkv-green"/> 
                        <strong>DKV Dentisalud</strong> Red Oficial
                    </span>
                 </div>
             </div>
        </section>

        {/* PRICING */}
        <div id="ventajas">
          <PricingCards />
        </div>

        {/* CLINIC GRID */}
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-lemon font-bold text-dkv-green-dark uppercase tracking-widest">
                        Cuadro Médico en {cityName}
                    </h3>
                    <p className="text-dkv-gray mt-2 font-fsme text-lg">Selección de centros destacados en tu zona.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clinics.slice(0, 12).map((clinic: any, idx: number) => (
                        <div key={idx} className="bg-white p-6 rounded-xl border border-dkv-gray-border hover:border-dkv-green hover:shadow-dkv-card transition-all group relative overflow-hidden flex flex-col justify-between h-full">
                            
                            {clinic.is_dkv_propio && (
                                <div className="absolute top-0 right-0 bg-dkv-green text-white text-[10px] px-2 py-1 rounded-bl font-bold uppercase tracking-wide z-10 font-lemon">
                                    Centro Propio
                                </div>
                            )}

                            <div>
                                <h4 className="font-bold text-dkv-green-dark group-hover:text-dkv-green transition-colors text-lg line-clamp-2 mb-3 font-lemon">
                                    {clinic.sp_name}
                                </h4>
                                <div className="text-sm text-dkv-gray/80 mb-4 flex items-start gap-2 font-fsme">
                                    <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-dkv-green" />
                                    <span>{clinic.address}, {clinic.town} ({clinic.postal_code})</span>
                                </div>
                            </div>

                            {clinic.promo_text ? (
                                <div className="mt-4 p-3 bg-dkv-gray-border rounded-lg text-xs text-dkv-green-dark italic border-l-2 border-dkv-green font-fsme">
                                    <Info className="w-3 h-3 inline-block mr-1 mb-0.5 text-dkv-green" />
                                    {clinic.promo_text}
                                </div>
                            ) : (
                                <div className="mt-auto pt-4 border-t border-dkv-gray-border/50">
                                    <span className="text-xs text-dkv-gray font-bold uppercase tracking-wider">Concertado</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                
                {clinics.length > 12 && (
                    <div className="text-center mt-12">
                        <p className="text-sm text-dkv-gray italic font-fsme">...y {clinics.length - 12} clínicas más disponibles en el buscador de la App DKV.</p>
                    </div>
                )}
            </div>
        </section>

        {/* LEAD FORM */}
        <section id="presupuesto" className="py-20 bg-dkv-gray-border border-y border-dkv-gray/10 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-4xl font-lemon font-bold text-dkv-green-dark uppercase leading-tight">
                  ¿Vives en {cityName}? <br/> Ahorra en tu dentista.
                </h2>
                <p className="text-lg text-dkv-gray font-fsme leading-relaxed">
                  Déjanos tus datos y recibe una propuesta personalizada válida para todos los centros de <strong>{cityName}</strong> listados arriba.
                </p>
                <ul className="space-y-4 mt-6 font-fsme">
                  <li className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-dkv-green font-bold shadow-sm border border-dkv-gray-border">1</span>
                    <span className="text-dkv-green-dark font-bold">Estudio de ahorro gratuito</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-dkv-green font-bold shadow-sm border border-dkv-gray-border">2</span>
                    <span className="text-dkv-green-dark font-bold">Acceso inmediato a la red</span>
                  </li>
                </ul>
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