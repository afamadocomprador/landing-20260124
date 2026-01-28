"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; 
import { Button } from "../ui/Button";

interface HeaderProps {
  onOpenCalculator?: () => void;
}

export default function Header({ onOpenCalculator }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      setShowButton(scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out border-b border-white/10 ${
        isScrolled
          ? "h-[60px] bg-dkv-green/95 backdrop-blur-sm shadow-md" 
          : "h-[110px] bg-dkv-green" 
      }`}
    >
      {/* Ajustamos padding del container para alinear con V1 */}
      <div className="container mx-auto h-full pr-4 md:pr-6 flex items-center justify-between">
        
        {/* LOGO */}
        <div className={`relative flex items-center transition-all duration-300 h-full`}>
           <Link href="/" className="block h-full w-auto">
             {/* CORRECCIÓN: Dimensiones explícitas para forzar el tamaño correcto */}
             <Image 
               src="/images/dkv-logo.png" 
               alt="DKV Agente Exclusivo" 
               width={220} 
               height={90}
               className="h-full w-auto object-contain object-left" 
               priority 
             />
           </Link>
        </div>

        {/* NAVEGACIÓN + BOTÓN */}
        <div className="flex items-center gap-4 md:gap-8">
          <nav className="hidden md:flex gap-8">
            {["Seguros", "Clínicas", "Promociones"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white font-fsme text-sm font-bold hover:text-white/80 transition-colors uppercase tracking-widest"
              >
                {item}
              </a>
            ))}
          </nav>
          
          {/* Botón con transición */}
          <div className={`transition-all duration-500 ease-out transform ${
            showButton 
              ? "opacity-100 translate-y-0 pointer-events-auto" 
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}>
            <Button 
              variant="contract"
              onClick={onOpenCalculator}
              className="shadow-lg hover:scale-105 transition-transform font-lemon tracking-wide text-xs md:text-sm h-10 px-6"
            >
              CALCULA TU PRECIO
            </Button>
          </div>

        </div>
      </div>
    </header>
  );
}