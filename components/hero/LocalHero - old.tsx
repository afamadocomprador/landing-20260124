"use client";

import React from "react";
import Image from "next/image";

interface LocalHeroProps {
  cityName: string;
  tier?: number; // 1 (Capital), 2 (Ciudad), 3 (Pueblo Grande), 4 (Rural/Pequeño)
}

export default function LocalHero({ cityName, tier = 3 }: LocalHeroProps) {

  // --- 1. LÓGICA DE TITULARES (Copywriting por Tier) ---
  const renderTitle = () => {
    switch (tier) {
      case 1: // Tier 1: Grandes Capitales (Madrid, BCN...) -> Autoridad directa
        return (
          <>
            TU DENTISTA EN <br />
            <span className="text-dkv-green capitalize">{cityName}</span>
          </>
        );
      case 2: // Tier 2: Ciudades Medianas -> Enfoque Servicio Local
        return (
          <>
            TU SEGURO DENTAL EN <br />
            <span className="text-dkv-green capitalize">{cityName}</span>
          </>
        );
      case 3: // Tier 3: Pueblos Grandes -> Enfoque Cobertura/Alcance
        return (
          <>
            SEGURO DENTAL DKV <br />
            PARA <span className="text-dkv-green capitalize">{cityName}</span>
          </>
        );
      case 4: // Tier 4: Zonas Rurales -> Enfoque Disponibilidad
      default:
        return (
          <>
            COBERTURA DENTAL EN <br />
            <span className="text-dkv-green capitalize">{cityName}</span>
          </>
        );
    }
  };

  // --- 2. LÓGICA DE DESCRIPCIÓN (Argumentario de Ventas) ---
  const renderDescription = () => {
     switch (tier) {
        case 1:
            return `Accede a la red más exclusiva de clínicas en ${cityName}. Tecnología punta y los mejores especialistas con precios pactados DKV.`;
        case 2:
            return `Disfruta de la tranquilidad de DKV Dentisalud en ${cityName}. Clínicas de confianza y ahorro garantizado en todos tus tratamientos.`;
        case 3:
            return `La calidad de DKV llega a ${cityName}. Sin desplazamientos innecesarios, con todas las coberturas de nuestro seguro dental líder.`;
        case 4:
        default:
            return `Llevamos la salud dental a ${cityName}. Consulta qué centros cercanos te ofrecen servicio con las tarifas reducidas de DKV.`;
     }
  }

  return (
    <section className="relative pt-8 pb-12 lg:pt-20 lg:pb-28 overflow-hidden bg-white">
      <div className="container mx-auto px-4 relative z-10 flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-16">
        
        {/* --- BLOQUE TEXTO --- */}
        <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
          <div className="relative pl-6 lg:pl-10 pb-8 pr-4">
            
            {/* Decoración Hilo Conductor */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-1 left-0 w-3 h-3 lg:w-4 lg:h-4 bg-white border-2 border-dkv-green-dark rounded-full z-20"></div>
              <div className="absolute top-3 left-[5px] lg:left-[7px] right-[7px] h-[calc(100%-15px)] border-l-2 border-b-2 border-dkv-green-dark rounded-bl-[30px] z-10">
                <div className="absolute -right-[9px] -bottom-[9px] w-3 h-3 lg:w-4 lg:h-4 bg-white border-2 border-dkv-green-dark rounded-full z-20"></div>
              </div>
            </div>

            <div className="relative z-20 space-y-4 pt-2 lg:pl-0">
              {/* Badge superior variable */}
              <span className="inline-block py-1 px-3 bg-dkv-green/10 text-dkv-green-dark font-bold text-[10px] lg:text-xs uppercase tracking-wider rounded-full font-fsme">
                {tier === 1 ? 'Directorio Élite DKV' : 'Directorio Dental DKV'}
              </span>
              
              <h1 className="text-3xl lg:text-5xl font-lemon text-dkv-green-dark leading-tight">
                {renderTitle()}
              </h1>
              
              <p className="text-base lg:text-lg text-dkv-gray font-fsme max-w-lg leading-relaxed">
                {renderDescription()}
              </p>
            </div>
          </div>
        </div>

        {/* --- BLOQUE IMAGEN --- */}
        <div className="w-full lg:w-1/2 relative flex justify-center lg:block">
          <div className="relative w-[260px] h-[260px] lg:w-[400px] lg:h-[400px] mx-auto bg-dkv-green rounded-full overflow-hidden border-4 lg:border-8 border-white shadow-dkv-card z-20">
            <div className="relative w-full h-full bg-neutral-100 flex items-center justify-center">
               <Image
                src="/images/hero-dkv.png" 
                alt={`Dentistas DKV en ${cityName}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                }}
              />
            </div>
          </div>
          
          {/* Badge Flotante (Solo lo mostramos en Tiers importantes 1 y 2 para no saturar en pueblos) */}
          {(tier === 1 || tier === 2) && (
            <div className="absolute top-0 right-4 lg:top-10 lg:right-20 bg-white text-dkv-green-dark p-3 rounded-full font-bold font-lemon shadow-lg transform -rotate-6 text-center border border-dkv-green text-[10px] lg:text-xs z-30">
                TARIFAS<br/>2025
            </div>
          )}
        </div>

      </div>
    </section>
  );
}