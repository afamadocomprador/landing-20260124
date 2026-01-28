"use client";

import React from "react";

interface LocalHeroProps {
  cityName: string;
  tier?: number; // 1 (Capital), 2 (Ciudad), 3 (Pueblo)
  description?: string; // Nuevo campo para el texto contextual SEO
}

export default function LocalHero({ cityName, tier = 3, description }: LocalHeroProps) {

  // --- LÓGICA DE TITULARES (Copywriting por Tier) ---
  const renderTitle = () => {
    switch (tier) {
      case 1:
        return (
          <>
            TU DENTISTA EN <br />
            <span className="text-dkv-green capitalize">{cityName}</span>
          </>
        );
      case 2:
        return (
          <>
            TU SEGURO DENTAL EN <br />
            <span className="text-dkv-green capitalize">{cityName}</span>
          </>
        );
      case 3:
      default:
        return (
          <>
            SEGURO DENTAL DKV <br />
            PARA <span className="text-dkv-green capitalize">{cityName}</span>
          </>
        );
    }
  };

  return (
    <section className="relative pt-8 pb-6 lg:pt-20 lg:pb-24 overflow-hidden bg-white">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* --- BLOQUE TEXTO (Ahora ocupa el protagonismo) --- */}
        <div className="relative pl-6 lg:pl-10 pb-8 pr-4 max-w-4xl">
            
            {/* Decoración Hilo Conductor (Identidad DKV V1) */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-1 left-0 w-3 h-3 lg:w-4 lg:h-4 bg-white border-2 border-dkv-green-dark rounded-full z-20"></div>
              <div className="absolute top-3 left-[5px] lg:left-[7px] right-[7px] h-[calc(100%-15px)] border-l-2 border-b-2 border-dkv-green-dark rounded-bl-[30px] z-10">
                <div className="absolute -right-[9px] -bottom-[9px] w-3 h-3 lg:w-4 lg:h-4 bg-white border-2 border-dkv-green-dark rounded-full z-20"></div>
              </div>
            </div>

            <div className="relative z-20 space-y-6 pt-2 lg:pl-0">
              <span className="inline-block py-1 px-3 bg-dkv-green/10 text-dkv-green-dark font-bold text-[10px] lg:text-xs uppercase tracking-wider rounded-full font-fsme">
                {tier === 1 ? 'Directorio Élite DKV' : 'Directorio Dental DKV'}
              </span>
              
              <h1 className="text-3xl lg:text-5xl font-lemon text-dkv-green-dark leading-tight">
                {renderTitle()}
              </h1>
              
              {/* Aquí inyectamos el copy_contextual de la base de datos */}
              <p className="text-lg lg:text-xl text-dkv-gray font-fsme leading-relaxed max-w-3xl">
                {description || `Accede a las mejores clínicas de ${cityName} con precios pactados. Sin listas de espera y con la garantía de Dentisalud Élite.`}
              </p>
            </div>
        </div>

      </div>
    </section>
  );
}