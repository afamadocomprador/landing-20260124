"use client";

import React from "react";
import Image from "next/image";

/**
 * MainHero: Componente visual estático para la Landing Principal (Home).
 * Estilo: Basado en V1 (DKV Corporativo "Bonito").
 */
export default function MainHero() {
  return (
    <section className="relative pt-5 pb-20 lg:pt-20 lg:pb-32 overflow-hidden bg-hero">
      <div className="container mx-auto px-4 relative z-10 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* --- BLOQUE DE TEXTO --- */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative pl-8 lg:pl-10 pb-8 pr-4">
            
            {/* Hilo conductor (Decoración CSS del borde - Identidad V1) */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {/* Punto inicio */}
              <div className="absolute top-1 left-0 w-4 h-4 bg-white border-2 border-dkv-green-dark rounded-full z-20"></div>
              {/* Línea curva */}
              <div className="absolute top-3 left-[7px] right-[7px] h-[calc(100%-15px)] border-l-2 border-b-2 border-dkv-green-dark rounded-bl-[30px] z-10">
                {/* Punto final */}
                <div className="absolute -right-[9px] -bottom-[9px] w-4 h-4 bg-white border-2 border-dkv-green-dark rounded-full z-20"></div>
              </div>
            </div>

            <div className="relative z-20 space-y-4 pt-1">
              <span className="inline-block py-1 px-3 bg-dkv-green/10 text-dkv-green-dark font-bold text-xs uppercase tracking-wider rounded-full">
                DKV Dentisalud Élite
              </span>
              
              <h1 className="text-4xl lg:text-6xl font-lemon text-dkv-green-dark leading-tight">
                Lo fácil es cuidar <br />
                <span className="text-dkv-green">tu sonrisa.</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-dkv-gray font-fsme max-w-lg">
                <strong>Acceso</strong> sin rodeos. Atención dental de <strong>Calidad</strong>. Y{" "}
                <strong>Precios Claros</strong> que entiendes desde el principio.
              </p>
            </div>
          </div>
        </div>

        {/* --- BLOQUE DE IMAGEN --- */}
        <div className="w-full lg:w-1/2 relative flex justify-center lg:block">
          
          {/* Círculo contenedor de la imagen */}
          <div className="relative w-full max-w-[280px] lg:max-w-md aspect-square mx-auto bg-dkv-green rounded-full overflow-hidden border-8 border-white shadow-2xl z-20">
            {/* NOTA: La imagen debe estar en /public/images/hero-dkv.png 
               Usa el placeholder gris hasta que generes el asset con el prompt.
            */}
            <div className="relative w-full h-full bg-neutral-100 flex items-center justify-center">
               <Image
                src="/images/hero-dkv.png"
                alt="Cliente feliz DKV Dentisalud"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                onError={(e) => {
                    // Fallback elegante si la imagen no existe aún
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                }}
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}