import React from 'react';
// Importamos Link para la navegación interna optimizada
import Link from 'next/link'; 

// 1. IMPORTAMOS LOS COMPONENTES "BONITOS" (MIGRADOS DE V1)
import Header from '@/components/layout/Header'; 
import MainHero from '@/components/hero/MainHero'; 

// 2. COMPONENTES NATIVOS DE V2 (HEREDAN ESTÉTICA POR MAPEO MANUAL AHORA)
import PricingCards from '@/components/PricingCards';
import LeadForm from '@/components/LeadForm';
import FooterLegal from '@/components/FooterLegal';
import Archetypes from '@/components/Archetypes';
import CookieBanner from '@/components/CookieBanner';

export default function LandingPage() {
  return (
    // CAMBIO V2->V1: Sustitución de variables globales
    // text-neutral -> text-dkv-gray
    // selection:bg-primary -> selection:bg-dkv-green
    <div className="min-h-screen bg-white text-dkv-gray selection:bg-dkv-green selection:text-white">
      
      {/* Banner de Cookies (Lógica V2) */}
      <CookieBanner />
      
      {/* Header (Diseño V1) */}
      <Header />
      
      <main>
        {/* HERO SECTION: Usamos el MainHero (V1) */}
        <MainHero /> 

        {/* --- NUEVA SECCIÓN TRATAMIENTOS (V1 ORIGINAL) --- */}
        {/* Inyectada justo después del Hero como puente hacia los precios */}
        <section className="py-20 bg-white border-t border-dkv-gray-border">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-lemon text-dkv-green-dark mb-6">
              Tratamientos.
            </h2>
            <p className="text-xl text-dkv-gray font-fsme max-w-3xl mx-auto mb-10 leading-relaxed">
              Numerosos servicios dentales gratuitos y resto a precios muy inferiores a mercado.
            </p>
            
            {/* CAMBIO: Enlace a la nueva página /tratamientos */}
            <Link 
              href="/tratamientos"
              className="inline-flex items-center justify-center rounded-dkv font-fsme font-bold duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-dkv-green text-white hover:bg-dkv-green-hover focus:ring-dkv-green shadow-xl hover:scale-105 transition-transform text-lg px-8 py-6 h-auto cursor-pointer"
            >
              Ver Tratamientos y Precios
            </Link>
            
            <p className="text-sm font-medium text-dkv-green-dark mt-6">
              Aquí puedes ver los tratamientos y sus precios. <br /> Directamente y sin formularios.
            </p>
          </div>
        </section>

        {/* --- NUEVA SECCIÓN DENTISTAS (V1 ORIGINAL) --- */}
        <section className="py-20 bg-white border-t border-dkv-gray-border">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-lemon text-dkv-green-dark mb-6">
              Dentistas.
            </h2>
            <p className="text-xl text-dkv-gray font-fsme max-w-3xl mx-auto mb-10 leading-relaxed">
              Tan fácil como elegir tu dentista y pedir cita en su consulta. Seguro que tienes uno cerca de tí.
            </p>
            
            {/* CAMBIO: Enlace a la nueva página /dentistas (Sustituye al <button>) */}
            <Link 
              href="/dentistas"
              className="inline-flex items-center justify-center rounded-dkv font-fsme font-bold duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-dkv-green text-white hover:bg-dkv-green-hover focus:ring-dkv-green disabled:bg-dkv-gray-disabled shadow-xl hover:scale-105 transition-transform gap-3 text-lg px-8 py-6 h-auto"
            >
              <img 
                alt="Icono mapa" 
                loading="lazy" 
                width="28" 
                height="28" 
                decoding="async" 
                data-nimg="1" 
                className="w-7 h-7 object-contain brightness-0 invert" 
                style={{ color: "transparent" }} 
                src="/icons/location-pin.svg" 
                // CORRECCIÓN TÉCNICA: Eliminado onError={(e) => ...}
                // En componentes de Servidor no podemos pasar funciones al cliente.
                // Si el icono falla, simplemente no se mostrará, pero no romperá la página.
              />
              Ver Centros Dentales
            </Link>
            
            <p className="text-sm font-medium text-dkv-green-dark mt-6">
              Busca centros dentales en toda España. <br /> Sin registros previos.
            </p>
          </div>
        </section>

        {/* --- ZONA HÍBRIDA (COMPONENTES V2 CON ESTILO V1) --- */}
        
        {/* Sección de Ventajas / Precios */}
        <div id="ventajas">
          <PricingCards />
        </div>
        
        {/* Sección de Formulario (LeadForm) */}
        <section 
          id="presupuesto" 
          // CAMBIO V2->V1:
          // bg-neutral-light (#F0EFED) -> bg-dkv-gray-border (#F0EFED)
          // border-neutral/10 -> border-dkv-gray/10
          className="py-20 bg-dkv-gray-border border-y border-dkv-gray/10 scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                 {/* Texto persuasivo */}
                 {/* font-display -> font-lemon | text-secondary -> text-dkv-green-dark */}
                 <h2 className="text-3xl lg:text-4xl font-lemon font-bold text-dkv-green-dark uppercase leading-tight">
                   ¿Listo para empezar <br/> a ahorrar?
                 </h2>
                 {/* text-neutral -> text-dkv-gray */}
                 <p className="text-lg text-dkv-gray">
                   Déjanos tus datos y calculamos tu cuota personalizada en menos de 24h.
                 </p>
              </div>
              
              <div className="relative">
                 {/* Efecto de brillo de fondo */}
                 {/* bg-primary/5 -> bg-dkv-green/5 */}
                 <div className="absolute -inset-4 bg-dkv-green/5 rounded-xl blur-lg -z-10"></div>
                 
                 {/* Formulario funcional de V2 */}
                 <LeadForm />
              </div>
            </div>
          </div>
        </section>

        {/* Sección Sin Burocracia */}
        <section className="py-16 bg-white">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             {/* Aquí irían los iconos de V2 */}
           </div>
        </section>

        {/* Arquetipos de Cliente */}
        <Archetypes />
      </main>

      {/* Footer Legal (V2) */}
      <FooterLegal />
    </div>
  );
}