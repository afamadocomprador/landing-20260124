import React from 'react';
import Header from '@/components/layout/Header';
import FooterLegal from '@/components/FooterLegal';
import { MapPin, Search, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Metadata para SEO
export const metadata = {
  title: 'Cuadro Médico Dental DKV | Encuentra tu dentista',
  description: 'Consulta el directorio completo de dentistas y clínicas DKV Dentisalud en toda España.',
};

export default function DentistsDirectoryPage() {
  return (
    <div className="min-h-screen bg-white font-fsme text-dkv-gray">
      <Header />
      
      <main className="pt-[110px]">
        {/* HERO BUSCADOR */}
        <section className="bg-dkv-gray-light py-16 border-b border-dkv-gray-border">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-lemon text-dkv-green-dark mb-4">
              ENCUENTRA TU DENTISTA DKV
            </h1>
            <p className="text-lg text-dkv-gray mb-8 max-w-2xl mx-auto">
              Accede a más de 1.500 clínicas y odontólogos concertados en todo el territorio nacional.
            </p>

            {/* Simulación de Barra de Búsqueda */}
            <div className="max-w-xl mx-auto relative flex items-center">
              <MapPin className="absolute left-4 w-5 h-5 text-dkv-green" />
              <input 
                type="text" 
                placeholder="Escribe tu ciudad, provincia o código postal..." 
                className="w-full pl-12 pr-4 py-4 rounded-full border border-dkv-gray/20 shadow-sm focus:outline-none focus:ring-2 focus:ring-dkv-green focus:border-transparent font-fsme placeholder:text-dkv-gray/50"
              />
              <button className="absolute right-2 bg-dkv-green text-white p-2.5 rounded-full hover:bg-dkv-green-hover transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* LISTADO DE PROVINCIAS DESTACADAS (SEO LINKS) */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-lemon text-dkv-green-dark mb-10 text-center">
              Clínicas por Provincia
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {['Madrid', 'Barcelona', 'Valencia', 'Zaragoza', 'Sevilla', 'Málaga', 'Alicante', 'Bilbao'].map((city) => (
                <a 
                  key={city}
                  // Enlace dinámico a la página [slug]
                  href={`/dentistas/${city.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center justify-between p-4 border border-dkv-gray-border rounded-lg hover:border-dkv-green hover:shadow-md transition-all group bg-white"
                >
                  <span className="font-bold text-dkv-green-dark group-hover:text-dkv-green transition-colors">
                    {city}
                  </span>
                  <ChevronRight className="w-4 h-4 text-dkv-gray/30 group-hover:text-dkv-green" />
                </a>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button className="border-dkv-gray text-dkv-gray hover:bg-dkv-gray hover:text-white px-6 py-2 rounded-full transition-colors border">
                Ver todas las provincias
              </Button>
            </div>
          </div>
        </section>
      </main>

      <FooterLegal />
    </div>
  );

}
