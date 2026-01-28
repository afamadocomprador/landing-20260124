"use client";

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export const SmoothScrollArrow = () => {
  
  const scrollToMap = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // 1. Detenemos cualquier comportamiento nativo o smooth-scroll CSS
    e.preventDefault();

    const targetId = 'mapa-clinicas';
    const targetElement = document.getElementById(targetId);
    
    if (!targetElement) return;

    // 2. CONFIGURACIÓN
    const duration = 1500; // 1.5 segundos
    const headerOffset = 60; // Altura de tu header fijo
    
    const startPosition = window.scrollY;
    // Calculamos posición absoluta del elemento
    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const targetPosition = elementPosition - headerOffset;
    const distance = targetPosition - startPosition;
    
    let startTime: number | null = null;

    // 3. CURVA DE ACELERACIÓN (EASE-IN-OUT CUBIC)
    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    // 4. BUCLE DE ANIMACIÓN
    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      // CLAVE: Usamos 'instant' para que el navegador no interpusiere su propia animación
      window.scrollTo({
        top: startPosition + (distance * ease),
        behavior: 'instant'
      });

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  return (
    // Sin padding bottom extra, solo centrado y padding superior mínimo
    <div className="pt-2 flex justify-center"> 
      <a 
        href="#mapa-clinicas" 
        onClick={scrollToMap}
        className="group flex flex-col items-center gap-3 cursor-pointer"
        aria-label="Ir al mapa suavemente"
      >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-dkv-gray/60 group-hover:text-dkv-green transition-colors duration-300">
              Ver Mapa
          </span>

          <div className="relative flex justify-center items-center w-20 h-20">
              <motion.div 
                className="absolute z-20 w-14 h-14 bg-dkv-green rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.1, backgroundColor: "#43752B" }}
              >
                  <ChevronDown className="w-6 h-6 text-white" />
              </motion.div>
              
              <motion.div 
                className="absolute bottom-1 z-10 w-10 h-3 bg-black rounded-[100%]"
                animate={{ 
                  opacity: [0.3, 0.1, 0.3], 
                  scale: [1, 1.2, 1],
                  filter: ["blur(2px)", "blur(4px)", "blur(2px)"]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
          </div>
      </a>
    </div>
  );
};