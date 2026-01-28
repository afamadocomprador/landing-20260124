import React from 'react';
import { CheckCircle2, Info } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils'; // Importamos utilidades para precios y clases

const PricingCards = () => {
  return (
    // ESTILO V1: Fondo gris muy suave (#F7F7F7) para separar la sección
    <section id="ventajas" className="py-20 bg-dkv-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* TITULAR: Lemon Milk + Verde Oscuro */}
          <h2 className="text-3xl md:text-4xl font-lemon font-bold text-dkv-green-dark mb-4">
            MOTOR DE PRECIOS TRANSPARENTE
          </h2>
          {/* SUBTÍTULO: FS Me + Gris Corporativo */}
          <p className="text-dkv-gray text-lg font-fsme">
            Sin sorpresas. Compara nuestro "Pack Élite" con el precio medio de mercado.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          
          {/* --- TARJETA 1: PACK IMPLANTE COMPLETO (DESTACADA) --- */}
          <div className="bg-white rounded-2xl shadow-dkv-card overflow-hidden border border-dkv-gray-border relative transform hover:-translate-y-1 transition-transform duration-300">
            {/* CABECERA: Verde Corporativo (#849700) */}
            <div className="bg-dkv-green p-5 text-center">
              <h3 className="text-white font-lemon font-bold text-xl tracking-wide">PACK IMPLANTE TOTAL</h3>
              <p className="text-white/90 text-sm font-fsme mt-1">Todo incluido (Fase Quirúrgica + Prótesis)</p>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex justify-between items-end mb-6 pb-6 border-b border-dkv-gray-border">
                <div className="text-left">
                  <p className="text-xs text-dkv-gray uppercase font-bold mb-1 font-lemon">Precio Mercado Est.*</p>
                  <p className="text-2xl text-dkv-gray-disabled line-through font-lemon">~1.850 €</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-dkv-green uppercase font-bold mb-1 font-lemon">Precio DKV Élite</p>
                  {/* PRECIO DESTACADO: Verde Oscuro (#033B37) */}
                  <p className="text-4xl text-dkv-green-dark font-lemon font-bold">1.100 €</p>
                </div>
              </div>

              <ul className="space-y-4 mb-8 font-fsme">
                <li className="flex justify-between text-sm items-center">
                  <span className="flex items-center gap-2 text-dkv-gray">
                    <CheckCircle2 className="w-5 h-5 text-dkv-green shrink-0" /> 
                    <span>TAC 3D / Dental Scan</span>
                  </span>
                  <span className="font-bold text-dkv-green-dark whitespace-nowrap">0 € (Incluido)</span>
                </li>
                <li className="flex justify-between text-sm items-center">
                  <span className="flex items-center gap-2 text-dkv-gray">
                    <CheckCircle2 className="w-5 h-5 text-dkv-green shrink-0" /> 
                    <span>Implante Titanio</span>
                  </span>
                  <span className="font-bold text-dkv-gray whitespace-nowrap">{formatPrice(550)}</span>
                </li>
                <li className="flex justify-between text-sm items-center">
                  <span className="flex items-center gap-2 text-dkv-gray">
                    <CheckCircle2 className="w-5 h-5 text-dkv-green shrink-0" /> 
                    <span>Corona Metal-Cerámica</span>
                  </span>
                  <span className="font-bold text-dkv-gray whitespace-nowrap">{formatPrice(303)}</span>
                </li>
                <li className="flex justify-between text-sm items-center">
                  <span className="flex items-center gap-2 text-dkv-gray">
                    <CheckCircle2 className="w-5 h-5 text-dkv-green shrink-0" /> 
                    <span>Aditamentos Protésicos</span>
                  </span>
                  <span className="font-bold text-dkv-gray whitespace-nowrap">{formatPrice(247)}</span>
                </li>
              </ul>

              {/* INFO BOX: Fondo verde muy claro (10% opacidad) */}
              <div className="bg-dkv-green/10 p-4 rounded-lg text-xs text-dkv-gray flex gap-3 items-start border border-dkv-green/20">
                <Info className="w-5 h-5 text-dkv-green-dark shrink-0 mt-0.5" />
                <p className="font-fsme">
                  <strong>Ahorro Estimado: 750€.</strong> El precio mostrado es una estimación compuesta. 
                  La facturación en clínica se realizará por acto médico individual según baremo de franquicia vigente.
                </p>
              </div>
            </div>
          </div>

          {/* --- TARJETA 2: VENTAJAS PREVENTIVAS --- */}
          <div className="bg-white rounded-2xl shadow-dkv-card border border-dkv-gray-border p-6 md:p-8 flex flex-col h-full">
            <h3 className="text-2xl font-lemon font-bold text-dkv-green-dark mb-8">Mantenimiento Incluido</h3>
            
            <div className="space-y-8 flex-1 font-fsme">
              <div className="flex gap-4 group">
                {/* ICONO CIRCULAR: Verde Claro fondo + Texto Verde Oscuro */}
                <div className="w-14 h-14 bg-dkv-green/10 rounded-full flex items-center justify-center text-dkv-green-dark font-bold text-xl group-hover:bg-dkv-green group-hover:text-white transition-colors duration-300 shrink-0">
                  0€
                </div>
                <div>
                  <h4 className="font-bold text-dkv-green-dark text-lg mb-1 group-hover:text-dkv-green transition-colors">Higiene Bucal Anual</h4>
                  <p className="text-sm text-dkv-gray">Limpieza completa (tartrectomía) incluida en póliza para mantener tu salud gingival.</p>
                </div>
              </div>
              
              <div className="flex gap-4 group">
                <div className="w-14 h-14 bg-dkv-green/10 rounded-full flex items-center justify-center text-dkv-green-dark font-bold text-xl group-hover:bg-dkv-green group-hover:text-white transition-colors duration-300 shrink-0">
                  0€
                </div>
                <div>
                  <h4 className="font-bold text-dkv-green-dark text-lg mb-1 group-hover:text-dkv-green transition-colors">Radiografías y TAC</h4>
                  <p className="text-sm text-dkv-gray">Ortopantomografía y TAC dental de alta precisión incluidos para diagnóstico.</p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="w-14 h-14 bg-dkv-green/10 rounded-full flex items-center justify-center text-dkv-green-dark font-bold text-xl group-hover:bg-dkv-green group-hover:text-white transition-colors duration-300 shrink-0">
                  0€
                </div>
                <div>
                  <h4 className="font-bold text-dkv-green-dark text-lg mb-1 group-hover:text-dkv-green transition-colors">Niños Gratis (-14 años)</h4>
                  <p className="text-sm text-dkv-gray">Si se incluyen con un adulto en la póliza. Fluorizaciones y selladores cubiertos.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-dkv-gray-border">
              <p className="text-[10px] text-dkv-gray/60 text-justify leading-tight font-fsme">
                *Precios de mercado estimados a título orientativo basados en tarifas medias de clínicas privadas en España (2024). 
                Condiciones sujetas a las Cláusulas Generales y Particulares de la póliza DKV Dentisalud Élite.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PricingCards;