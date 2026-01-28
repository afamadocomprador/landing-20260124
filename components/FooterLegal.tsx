"use client";

import React from 'react';

const FooterLegal = () => {
  return (
    <footer>
      {/* FRANJA SUPERIOR: MENÚ Y DATOS DE CONTACTO 
          Estilo V1: Fondo Gris Corporativo (#6A625A) y Fuente FS Me
      */}
      <div className="bg-dkv-gray text-white py-12 font-fsme">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 text-sm font-light">
             
             {/* Columna 1: Enlaces Corporativos */}
             <div>
               {/* Titulares en LEMON MILK (Estilo V1) */}
               <h4 className="font-bold mb-6 text-lg uppercase tracking-wide font-lemon">DKV SEGUROS</h4>
               <ul className="space-y-3 opacity-90">
                 <li><a href="#" className="hover:underline hover:text-white/80 transition-colors">Seguros de Salud</a></li>
                 <li><a href="#" className="hover:underline hover:text-white/80 transition-colors">Seguros Dentales</a></li>
                 <li><a href="#" className="hover:underline hover:text-white/80 transition-colors">Cuadro Médico</a></li>
               </ul>
             </div>
             
             {/* Columna 2: Atención al Cliente */}
             <div>
               <h4 className="font-bold mb-6 text-lg uppercase tracking-wide font-lemon">ATENCIÓN AL CLIENTE</h4>
               <ul className="space-y-3 opacity-90">
                 <li>Teléfono: <a href="tel:900000000" className="hover:underline">900 000 000</a></li>
                 <li>Email: <a href="mailto:atencion@dkv.es" className="hover:underline">atencion@dkv.es</a></li>
               </ul>
             </div>

             {/* Columna 3: Identificación del Mediador (Requisito Legal) */}
             <div>
               <h4 className="font-bold mb-6 text-lg uppercase tracking-wide font-lemon">AGENTE EXCLUSIVO</h4>
               <div className="flex items-start gap-4">
                  {/* Caja DKV con borde sutil */}
                  <div className="border border-white/30 px-3 py-1.5 rounded text-xs font-bold tracking-widest font-lemon">DKV</div>
                  <div>
                    <p className="font-bold text-base">Bernardo Sobrecasas Gallizo</p>
                    <p className="text-xs opacity-70 mt-1">Agente de Seguros Exclusivo</p>
                    <p className="text-xs opacity-70">Nº Registro DGSFP: C016125451380V</p>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* FRANJA INFERIOR: LEGAL Y COPYRIGHT 
          Estilo V1: Fondo Gris Claro (#F0EFED) y Texto Gris Oscuro (#6A625A)
      */}
      <div className="bg-dkv-gray-border py-8 border-t border-dkv-gray/10 text-dkv-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Bloque de texto legal extenso */}
          <div className="text-[10px] leading-relaxed mb-6 text-justify md:text-left opacity-80 space-y-2 font-fsme">
            <p>
              <strong>INFORMACIÓN LEGAL:</strong> Esta web está gestionada por Bernardo Sobrecasas Gallizo, Agente de Seguros Exclusivo de DKV Seguros y Reaseguros S.A.E. Tiene concertado seguro de Responsabilidad Civil profesional conforme a la legislación vigente.
            </p>
            <p>
              <strong>ASEGURADORA:</strong> DKV Seguros y Reaseguros, S.A.E. (Sociedad Unipersonal). Inscrita en el R.M. de Zaragoza, tomo 1.711, folio 214, hoja Z-15.152. NIF A-50004209. Sede social: Torre DKV, Avda. María Zambrano 31, 50018 Zaragoza.
            </p>
            <p>
              <strong>PROTECCIÓN DE DATOS:</strong> Responsable: DKV Seguros. Finalidad: Gestión de la solicitud y comercialización. Derechos: Puede ejercitar sus derechos de acceso, rectificación, supresión y otros enviando un correo a bernardo.sobrecasas@segurosdkv.es.
            </p>
            <p>
              <strong>CONDICIONES:</strong> Las primas y coberturas están sujetas a las Condiciones Generales y Particulares de la póliza DKV Dentisalud Élite. Los tratamientos con coste 0€ se refieren a los servicios incluidos en la franquicia dental sin coste adicional. Los ahorros mostrados son estimaciones basadas en precios medios de mercado 2024.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-dkv-gray/10 pt-6">
            <p className="text-[11px] font-bold text-dkv-gray uppercase tracking-wider font-fsme">
              &copy; {new Date().getFullYear()} Bernardo Sobrecasas. Todos los derechos reservados.
            </p>
            
            <div className="flex gap-6 text-[11px] font-bold text-dkv-gray font-fsme">
               <a href="#" className="hover:text-dkv-green transition-colors">Aviso Legal</a>
               <a href="#" className="hover:text-dkv-green transition-colors">Política de Privacidad</a>
               <a href="#" className="hover:text-dkv-green transition-colors">Política de Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLegal;