"use client";

import React from 'react';
import { ChevronDown } from 'lucide-react';

export const ScrollButton = () => {
  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault(); // Evitamos el salto brusco del ancla nativa
    const targetId = 'mapa-clinicas';
    const elem = document.getElementById(targetId);
    
    if (elem) {
      // Cálculo manual para un aterrizaje suave y preciso
      const headerOffset = 60; // Altura del header fijo
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes shadow-breathe {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.3;
            filter: blur(2px);
          }
          50% { 
            transform: scale(1.5); 
            opacity: 0.1;
            filter: blur(6px);
          }
        }
        .animate-float-btn { animation: float 3s ease-in-out infinite; }
        .animate-shadow-breathe { animation: shadow-breathe 3s ease-in-out infinite; }
      `}</style>

      <a 
        href="#mapa-clinicas" 
        onClick={handleScroll}
        className="group flex flex-col items-center gap-3 cursor-pointer pt-4" // pt-4 para separar un poco del texto superior si lo hubiera
        aria-label="Ir al mapa"
      >
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-dkv-gray/60 group-hover:text-dkv-green transition-colors duration-300">
            Ver Mapa
        </span>

        <div className="relative flex justify-center items-center w-20 h-20">
            {/* Círculo que flota */}
            <div className="absolute z-20 w-14 h-14 bg-dkv-green rounded-full flex items-center justify-center shadow-lg border-2 border-white group-hover:bg-dkv-green-hover transition-colors duration-300 animate-float-btn">
                <ChevronDown className="w-6 h-6 text-white" />
            </div>
            
            {/* Sombra de suelo */}
            <div className="absolute bottom-1 z-10 w-10 h-3 bg-black rounded-[100%] animate-shadow-breathe"></div>
        </div>
      </a>
    </>
  );
};