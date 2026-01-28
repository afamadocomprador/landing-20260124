import React from 'react';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { Metadata } from 'next';

// Componentes
import Header from '@/components/layout/Header';
import FooterLegal from '@/components/FooterLegal';
import LeadForm from '@/components/LeadForm';
import CookieBanner from '@/components/CookieBanner';
import LocalHero from '@/components/hero/LocalHero'; // Reusamos el Hero Local
import { CheckCircle2, MapPin, Info } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

// --- MOCK DATA TRATAMIENTOS (Misma fuente de verdad) ---
const TREATMENT_DATA: Record<string, any> = {
  'ortodoncia': {
    title: 'Ortodoncia',
    fullTitle: 'Ortodoncia Avanzada',
    priceExample: { concept: 'Brackets completos', price: 2350 },
  },
  'implantes-dentales': {
    title: 'Implantes',
    fullTitle: 'Implantes Dentales de Titanio',
    priceExample: { concept: 'Implante + Corona', price: 1100 },
  },
  'estetica-dental': {
    title: 'Estética',
    fullTitle: 'Diseño de Sonrisa y Estética',
    priceExample: { concept: 'Carillas Porcelana', price: 280 },
  },
  'endodoncia': {
    title: 'Endodoncia',
    fullTitle: 'Endodoncia y Conservadora',
    priceExample: { concept: 'Endodoncia Unirradicular', price: 95 },
  },
  'odontopediatria': {
    title: 'Niños',
    fullTitle: 'Odontopediatría Integral',
    priceExample: { concept: 'Empaste Infantil', price: 35 },
  },
  'periodoncia': {
    title: 'Encías',
    fullTitle: 'Periodoncia y Encías',
    priceExample: { concept: 'Curetaje (cuadrante)', price: 65 },
  }
};

// --- 1. GENERACIÓN ESTÁTICA (SSG Combinatorio) ---
// Genera: ortodoncia/madrid, ortodoncia/barcelona, implantes/madrid...
export async function generateStaticParams() {
  console.log("🛠️ [SSG] Generando matriz Tratamiento x Ciudad...");
  
  // 1. Obtenemos ciudades
  const { data: locations } = await supabase.from('localizaciones_seo').select('slug');
  if (!locations) return [];

  // 2. Obtenemos tratamientos (del objeto estático o DB)
  const treatments = Object.keys(TREATMENT_DATA);

  // 3. Cruzamos datos (Producto Cartesiano)
  const paths = [];
  for (const loc of locations) {
    for (const treat of treatments) {
      paths.push({
        tratamiento: treat,
        city: loc.slug
      });
    }
  }

  return paths;
}

// --- 2. METADATOS DINÁMICOS ---
export async function generateMetadata({ params }: { params: { tratamiento: string, city: string } }): Promise<Metadata> {
  const treatment = TREATMENT_DATA[params.tratamiento];
  const cityName = decodeURIComponent(params.city).replace(/-/g, ' '); // "madrid-centro" -> "madrid centro"
  
  if (!treatment) return { title: 'Tratamiento no encontrado' };

  const formattedCity = cityName.charAt(0).toUpperCase() + cityName.slice(1);

  return {
    title: `${treatment.title} en ${formattedCity} | Clínicas y Precios DKV`,
    description: `Mejores clínicas para ${treatment.fullTitle.toLowerCase()} en ${formattedCity}. Precios pactados: ${treatment.priceExample.concept} por ${formatPrice(treatment.priceExample.price)}.`,
  };
}

// --- 3. LÓGICA DE DATOS LOCALES ---
async function getLocalData(citySlug: string) {
  // Reutilizamos la lógica de búsqueda de clínicas por ciudad
  const { data: seoConfig } = await supabase
    .from('localizaciones_seo')
    .select('*')
    .eq('slug', citySlug)
    .single();

  if (!seoConfig) return null;

  let clinics = [];
  
  // Búsqueda simple por texto (para este ejemplo combinatorio)
  const cityName = seoConfig.nombre_visible.split(':')[0].trim(); 
  const { data } = await supabase.rpc('get_service_points', { p_limit: 10, p_search_text: cityName });
  clinics = data || [];

  return { seoConfig, clinics };
}

// --- 4. COMPONENTE VISUAL ---
export default async function TreatmentCityPage({ params }: { params: { tratamiento: string, city: string } }) {
  const treatment = TREATMENT_DATA[params.tratamiento];
  const cityData = await getLocalData(params.city);

  if (!treatment || !cityData) notFound();

  const { seoConfig, clinics } = cityData;
  const cityName = seoConfig.nombre_visible;

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray">
      <CookieBanner />
      <Header />
      
      <main className="pt-[110px]">
        
        {/* HERO HÍBRIDO: TRATAMIENTO + CIUDAD */}
        <section className="bg-dkv-gray-border/30 py-16 md:py-24 border-b border-dkv-gray-border relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <span className="inline-block py-1 px-3 bg-white border border-dkv-gray-border text-dkv-green font-bold text-xs uppercase tracking-wider rounded-full mb-4">
              {treatment.fullTitle}
            </span>
            <h1 className="text-3xl md:text-5xl font-lemon text-dkv-green-dark leading-tight mb-6">
              {treatment.title} en <span className="text-dkv-green">{cityName}</span>
            </h1>
            <p className="text-xl text-dkv-gray max-w-2xl font-fsme leading-relaxed">
              Accede a los mejores especialistas en <strong>{treatment.title.toLowerCase()}</strong> en {cityName} con los precios oficiales de DKV Dentisalud Élite.
            </p>
          </div>
        </section>

        {/* CONTENIDO PRINCIPAL */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              
              {/* COLUMNA PRINCIPAL: LISTADO DE CLÍNICAS */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-lemon text-dkv-green-dark mb-8">
                  Clínicas para {treatment.title} en {cityName}
                </h2>
                
                <div className="space-y-4">
                  {clinics.map((clinic: any, idx: number) => (
                    <div key={idx} className="bg-white border border-dkv-gray-border rounded-xl p-6 hover:border-dkv-green transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h3 className="font-bold text-dkv-green-dark text-lg font-lemon">{clinic.sp_name}</h3>
                        <div className="text-sm text-dkv-gray mt-1 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-dkv-green" />
                          {clinic.address}, {clinic.town}
                        </div>
                        <div className="mt-3 flex gap-2">
                           <span className="text-[10px] bg-dkv-green/10 text-dkv-green-dark px-2 py-1 rounded font-bold uppercase">
                             {treatment.title}
                           </span>
                           <span className="text-[10px] bg-dkv-gray-border text-dkv-gray px-2 py-1 rounded font-bold uppercase">
                             Concertado
                           </span>
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-xs text-dkv-gray mb-1">Precio DKV</p>
                        <p className="text-2xl font-bold text-dkv-green font-lemon">
                          {formatPrice(treatment.priceExample.price)}
                        </p>
                        <p className="text-[10px] text-dkv-gray-disabled line-through">
                          Mercado: ~{formatPrice(treatment.priceExample.price * 1.5)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {clinics.length === 0 && (
                   <div className="p-8 bg-dkv-gray-light rounded-xl text-center">
                      <p>No hemos encontrado clínicas específicas en esta zona, pero tienes cobertura nacional.</p>
                   </div>
                )}
              </div>

              {/* COLUMNA LATERAL: FORMULARIO STICKY */}
              <div className="lg:col-span-1">
                <div className="bg-dkv-gray-border/50 p-6 rounded-2xl border border-dkv-gray-border sticky top-32">
                  <h3 className="text-lg font-lemon text-dkv-green-dark mb-2">
                    Estudio Gratuito
                  </h3>
                  <p className="text-sm text-dkv-gray mb-6">
                    Te confirmamos qué clínicas en <strong>{cityName}</strong> tienen disponibilidad para tu tratamiento hoy.
                  </p>
                  <LeadForm />
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <FooterLegal />
    </div>
  );
}