import React from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import FooterLegal from '@/components/FooterLegal';
import LeadForm from '@/components/LeadForm';
import CookieBanner from '@/components/CookieBanner';
import { CheckCircle2, FileText, Banknote } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

// --- DATOS SIMULADOS (MOCK DB) ---
// En el futuro, esto podría ser una tabla 'tratamientos' en Supabase
const TREATMENT_DATA: Record<string, any> = {
  'ortodoncia': {
    title: 'Ortodoncia Avanzada',
    description: 'Corrige la posición de tus dientes y mejora tu mordida. Desde brackets tradicionales hasta invisibles.',
    benefits: ['Estudio inicial gratuito', 'Revisiones mensuales incluidas', 'Opción invisible disponible'],
    priceExample: { concept: 'Ortodoncia Brackets (ambas arcadas)', price: 2350, marketPrice: 3500 },
    seoDesc: 'Tratamiento de ortodoncia DKV. Brackets metálicos, estéticos e invisibles con precios cerrados.',
  },
  'implantes-dentales': {
    title: 'Implantes Dentales',
    description: 'La solución definitiva ante la pérdida dental. Recupera la funcionalidad y estética completa.',
    benefits: ['Implante de Titanio de alta gama', 'Corona incluida en packs', 'Garantía de material'],
    priceExample: { concept: 'Implante Completo + Corona', price: 1100, marketPrice: 1850 },
    seoDesc: 'Implantes dentales completos desde 550€. Calidad garantizada y precios DKV.',
  },
  'estetica-dental': {
    title: 'Estética Dental',
    description: 'Diseñamos tu sonrisa ideal mediante blanqueamientos y carillas de alta calidad.',
    benefits: ['Blanqueamiento LED', 'Carillas de Porcelana', 'Diseño digital de sonrisa'],
    priceExample: { concept: 'Blanqueamiento Dental LED', price: 180, marketPrice: 350 },
    seoDesc: 'Mejora tu sonrisa con DKV. Blanqueamientos y carillas a precios exclusivos.',
  },
  'endodoncia': {
    title: 'Endodoncia',
    description: 'Salva tus dientes dañados. Tratamiento de conductos sin dolor para evitar la extracción.',
    benefits: ['Tecnología rotatoria', 'Anestesia local profunda', 'Reconstrucción posterior'],
    priceExample: { concept: 'Endodoncia Unirradicular', price: 95, marketPrice: 150 },
    seoDesc: 'Endodoncia sin dolor. Precios cerrados para salvar tu diente natural.',
  },
  'odontopediatria': {
    title: 'Odontopediatría',
    description: 'Cuidado especial para los más pequeños. Revisiones, flúor y selladores gratuitos en póliza.',
    benefits: ['Fluorizaciones Gratuitas', 'Selladores de fisuras', 'Educación en higiene'],
    priceExample: { concept: 'Empaste (Obturación) Infantil', price: 35, marketPrice: 60 },
    seoDesc: 'Dentista para niños DKV. Tratamientos gratuitos hasta los 14 años incluidos en póliza familiar.',
  },
  'periodoncia': {
    title: 'Periodoncia',
    description: 'Salud de tus encías. Tratamiento de gingivitis y periodontitis para mantener tus dientes firmes.',
    benefits: ['Estudio periodontal', 'Mantenimiento de encías', 'Cirugía regenerativa'],
    priceExample: { concept: 'Curetaje por cuadrante', price: 65, marketPrice: 100 },
    seoDesc: 'Tratamiento de encías y periodontitis. Recupera la salud de tu boca.',
  }
};

// --- 1. GENERACIÓN ESTÁTICA (SSG) ---
export async function generateStaticParams() {
  // CAMBIO: Devolvemos el parámetro 'tratamiento' en lugar de 'slug'
  return Object.keys(TREATMENT_DATA).map((key) => ({ tratamiento: key }));
}

// --- 2. METADATOS ---
// CAMBIO: Recibimos params.tratamiento
export async function generateMetadata({ params }: { params: { tratamiento: string } }) {
  const data = TREATMENT_DATA[params.tratamiento];
  if (!data) return { title: 'Tratamiento no encontrado' };
  
  return {
    title: `${data.title} | Precios DKV Dentisalud`,
    description: data.seoDesc,
  };
}

// --- 3. COMPONENTE VISUAL ---
// CAMBIO: Recibimos params.tratamiento
export default function TreatmentPage({ params }: { params: { tratamiento: string } }) {
  const data = TREATMENT_DATA[params.tratamiento];
  
  // Si el tratamiento no existe en nuestra "DB", devolvemos 404
  if (!data) notFound();

  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray">
      <CookieBanner />
      <Header />
      
      <main className="pt-[110px]">
        
        {/* HERO TRATAMIENTO */}
        <section className="bg-dkv-gray-border/30 py-16 md:py-24 border-b border-dkv-gray-border relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <span className="text-dkv-green font-bold text-sm uppercase tracking-widest mb-2 block">
              Tratamiento Especializado
            </span>
            <h1 className="text-4xl md:text-6xl font-lemon text-dkv-green-dark mb-6">
              {data.title}
            </h1>
            <p className="text-xl text-dkv-gray max-w-2xl font-fsme leading-relaxed">
              {data.description}
            </p>
          </div>
          {/* Decoración de fondo */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-dkv-green/5 skew-x-12 -z-0 hidden lg:block"></div>
        </section>

        {/* CONTENIDO PRINCIPAL */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              
              {/* Columna Izquierda: Información */}
              <div>
                <h2 className="text-2xl font-lemon text-dkv-green-dark mb-6">¿Qué incluye DKV?</h2>
                <ul className="space-y-4 mb-10">
                  {data.benefits.map((benefit: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-dkv-gray-border shadow-sm">
                      <CheckCircle2 className="w-6 h-6 text-dkv-green shrink-0" />
                      <span className="text-dkv-green-dark font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* Ejemplo de Precio (Mini Pricing Card) */}
                <div className="bg-white rounded-xl shadow-dkv-card border border-dkv-green overflow-hidden">
                  <div className="bg-dkv-green p-4 text-white text-center font-lemon uppercase tracking-wide">
                    Ejemplo de Ahorro
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-dkv-gray text-sm">Precio Mercado</span>
                      <span className="text-dkv-gray-disabled line-through decoration-dkv-red decoration-2 font-bold text-lg">
                        {formatPrice(data.priceExample.marketPrice)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-t border-dashed border-dkv-gray/20 pt-4 mt-2">
                      <span className="text-dkv-green-dark font-bold">{data.priceExample.concept}</span>
                      <span className="text-3xl font-lemon text-dkv-green font-bold">
                        {formatPrice(data.priceExample.price)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-dkv-gray/60 mt-4 italic">
                  *Precios orientativos sujetos a las condiciones de póliza 2025.
                </p>
              </div>

              {/* Columna Derecha: Formulario Contextual */}
              <div className="bg-dkv-gray-border/50 p-8 rounded-2xl border border-dkv-gray-border sticky top-32">
                <h3 className="text-xl font-lemon text-dkv-green-dark mb-2">
                  Presupuesto para {data.title}
                </h3>
                <p className="text-sm text-dkv-gray mb-6">
                  Rellena tus datos y recibe una valoración gratuita.
                </p>
                {/* Formulario reusado */}
                <LeadForm />
              </div>

            </div>
          </div>
        </section>

        {/* SECCIÓN CROSS-LINKING (PREPARACIÓN PARA EL FUTURO) */}
        {/* Aquí es donde mezclaremos "Ortodoncia en Palencia" */}
        <section className="py-16 bg-white border-t border-dkv-gray-border">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-lemon text-dkv-green-dark mb-8">
              Encuentra especialistas en {data.title} cerca de ti
            </h2>
            
            <div className="flex flex-wrap justify-center gap-3">
              {['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza'].map((city) => (
                <a 
                  key={city}
                  href={`/dentistas/${city.toLowerCase()}`} // En el futuro: /tratamientos/[tratamiento]/[city]
                  className="px-4 py-2 border border-dkv-gray/20 rounded-full text-dkv-gray hover:border-dkv-green hover:text-dkv-green transition-colors text-sm"
                >
                  {data.title} en <strong>{city}</strong>
                </a>
              ))}
            </div>
          </div>
        </section>

      </main>

      <FooterLegal />
    </div>
  );
}