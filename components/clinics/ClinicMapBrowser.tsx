"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Clock, ArrowRight, ShieldCheck, Info, ChevronUp, ChevronDown, X, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; 

// Imports Estáticos
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MapController from './MapController'; 

// Interfaces
interface Professional {
  name: string;
  nif: string;
  specialties: string[];
}

interface Clinic {
  sp_id: string;
  sp_name: string;
  address: string;
  town: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  is_dkv_propio: boolean;
  promo_text?: string;
  phone?: string;
  professionals?: Professional[];
}

interface ClinicMapBrowserProps {
  clinics: Clinic[];
  defaultCenter: [number, number];
}

type MobileSheetState = 'minimized' | 'partial' | 'expanded';

export default function ClinicMapBrowser({ clinics, defaultCenter }: ClinicMapBrowserProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sheetState, setSheetState] = useState<MobileSheetState>('minimized');

  const [viewState, setViewState] = useState<{
    center?: [number, number];
    zoom?: number;
    bounds?: L.LatLngBoundsExpression;
  }>({ center: defaultCenter, zoom: 13 });

  // Refs
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const markerRefs = useRef<Record<string, any>>({}); 
  const listContainerRef = useRef<HTMLDivElement>(null); 
  const scrollListRef = useRef<HTMLDivElement>(null);
  
  const [LeafletIcon, setLeafletIcon] = useState<any>(null);

  const totalProfessionals = clinics.reduce((acc, c) => acc + (c.professionals?.length || 0), 0);

  const getAllClinicsBounds = () => {
    if (clinics.length === 0) return null;
    const points = clinics.map(c => [c.latitude, c.longitude] as [number, number]);
    return L.latLngBounds(points);
  };

  useEffect(() => {
    const bounds = getAllClinicsBounds();
    if (bounds) setViewState({ bounds }); 
  }, [clinics]);

  // Sincronización de Popup
  useEffect(() => {
    if (selectedId) {
      const marker = markerRefs.current[selectedId];
      if (marker) {
        marker.openPopup();
      }
    } else {
      Object.values(markerRefs.current).forEach((m: any) => m?.closePopup());
    }
  }, [selectedId]);

  useEffect(() => {
    (async () => {
      const L = (await import('leaflet')).default;
      const createIcon = (isSelected: boolean) => new L.DivIcon({
        className: 'custom-div-icon',
        html: `
          <div style="
            background-color: ${isSelected ? '#849700' : '#ffffff'};
            border: 2px solid #033B37;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};
            position: relative;
            z-index: ${isSelected ? 1000 : 1};
          ">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${isSelected ? '#fff' : '#033B37'}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -32] 
      });
      setLeafletIcon({ default: createIcon(false), selected: createIcon(true) });
    })();
  }, []);

  // -- LOGICA INTERACCIÓN --

  const handleInteraction = (clinic: Clinic, source: 'map' | 'list') => {
    if (selectedId === clinic.sp_id) {
        // TOGGLE OFF
        setSelectedId(null);
        if (source === 'map') {
            setSheetState('minimized');
        }
        const bounds = getAllClinicsBounds();
        if (bounds) setViewState({ bounds });
    } else {
        // TOGGLE ON
        setSelectedId(clinic.sp_id);
        
        setViewState({ 
          center: [clinic.latitude, clinic.longitude], 
          zoom: 18 
        });

        if (source === 'map') {
            setSheetState('partial');
        }

        setTimeout(() => {
            const element = itemRefs.current[clinic.sp_id];
            const container = scrollListRef.current;

            if (element && container) {
              const elementTop = element.offsetTop;
              // Ajustamos margen superior para que no quede pegado al borde
              container.scrollTo({
                top: Math.max(0, elementTop - 16),
                behavior: 'smooth'
              });
            }
        }, 300);
    }
  };

  const toggleSheet = () => {
      if (sheetState === 'minimized') setSheetState('expanded');
      else if (sheetState === 'expanded') setSheetState('minimized');
      else setSheetState('minimized');
  };

  if (!LeafletIcon) return <div className="h-96 bg-dkv-gray-border animate-pulse rounded-xl"></div>;

  return (
    <div className="relative lg:flex lg:flex-row h-[calc(100vh-140px)] lg:h-[800px] border border-dkv-gray-border rounded-xl overflow-hidden shadow-dkv-card bg-white">
      
      {/* --- MAPA --- */}
      <div className="absolute inset-0 lg:relative lg:w-2/3 lg:h-full z-0 bg-neutral-100 lg:order-2">
        <MapContainer 
          center={defaultCenter} 
          zoom={13} 
          scrollWheelZoom={false} 
          zoomControl={false}
          className="w-full h-full"
        >
          <MapController center={viewState.center} zoom={viewState.zoom} bounds={viewState.bounds} />
          <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

          {clinics.map((clinic) => (
            <Marker 
              key={clinic.sp_id} 
              position={[clinic.latitude, clinic.longitude]}
              ref={(ref) => { if (ref) markerRefs.current[clinic.sp_id] = ref; }}
              icon={selectedId === clinic.sp_id ? LeafletIcon.selected : LeafletIcon.default}
              eventHandlers={{
                click: () => handleInteraction(clinic, 'map'),
              }}
            >
              <Popup className="font-fsme" closeButton={false}>
                <div className="p-1 text-center min-w-[180px]">
                  <h3 className="text-base font-bold font-lemon text-dkv-green-dark mb-1 leading-tight">
                    {clinic.sp_name}
                  </h3>
                  <p className="text-sm text-dkv-gray leading-snug mb-2">
                    {clinic.address}, {clinic.postal_code}
                  </p>
                  <p className="text-sm font-bold text-dkv-green flex items-center justify-center gap-1 bg-dkv-green/5 py-1 rounded">
                    <Phone className="w-3 h-3" /> {clinic.phone || '900 810 076'}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* --- LISTA DE CLÍNICAS --- */}
      <div 
        ref={listContainerRef}
        className={`
            absolute bottom-0 left-0 w-full bg-white
            z-[40] lg:z-10
            transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
            rounded-t-2xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)]
            flex flex-col
            lg:static lg:w-1/3 lg:h-full lg:rounded-none lg:shadow-none lg:border-r lg:border-dkv-gray-border lg:order-1
            ${sheetState === 'minimized' ? 'h-16' : ''}
            ${sheetState === 'partial' ? 'h-[75%]' : ''}
            ${sheetState === 'expanded' ? 'h-full' : ''}
            lg:h-full
        `}
      >
        {/* CABECERA */}
        <div 
            onClick={toggleSheet}
            className="shrink-0 px-4 py-3 bg-white border-b border-dkv-gray-border sticky top-0 z-20 cursor-pointer lg:cursor-default flex justify-between items-center"
        >
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-10 h-1 bg-gray-200 rounded-full lg:hidden"></div>

          <div className="flex items-center gap-4 lg:gap-6 mt-1 lg:mt-0 w-full lg:w-auto overflow-x-auto no-scrollbar">
             <div className="flex items-center gap-1.5 text-dkv-green-dark whitespace-nowrap">
                <MapPin className="w-5 h-5 text-dkv-green shrink-0" />
                <span className="font-lemon text-sm md:text-base uppercase tracking-wide">
                    {clinics.length === 1 ? '1 Centro' : `${clinics.length} Centros`}
                </span>
             </div>

             <div className="h-4 w-px bg-dkv-gray-border hidden lg:block"></div>

             <div className="flex items-center gap-1.5 text-dkv-green-dark whitespace-nowrap">
                <Users className="w-5 h-5 text-dkv-green shrink-0" />
                <span className="font-lemon text-sm md:text-base uppercase tracking-wide">
                    {totalProfessionals === 1 ? '1 Profesional' : `${totalProfessionals} Profesionales`}
                </span>
             </div>
          </div>

          <div className="lg:hidden text-dkv-gray ml-2 shrink-0">
             {sheetState === 'minimized' ? <ChevronUp className="w-5 h-5"/> : <ChevronDown className="w-5 h-5"/>}
          </div>
        </div>

        {/* CONTENIDO SCROLLEABLE */}
        <div 
            ref={scrollListRef} 
            className="overflow-y-auto flex-1 bg-gray-50/80 scroll-smooth relative"
        >
            <div className="p-3 flex flex-col gap-3">
            {clinics.map((clinic) => (
                <div 
                key={clinic.sp_id}
                // BIEN (Las llaves indican que es una acción sin retorno)
                ref={(el) => { itemRefs.current[clinic.sp_id] = el; }}
                onClick={() => handleInteraction(clinic, 'list')}
                className={`
                    p-4 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden
                    ${
                    selectedId === clinic.sp_id 
                        ? 'bg-white border-dkv-green shadow-md ring-1 ring-dkv-green/10 z-10' 
                        : 'bg-white border-white hover:border-dkv-green/30 shadow-sm hover:shadow-md'
                    }
                `}
                >
                <div className="flex justify-between items-start mb-1">
                    {clinic.is_dkv_propio && (
                    <span className="inline-block px-2 py-0.5 bg-dkv-green text-white text-xs font-bold uppercase rounded mb-1 font-fsme shadow-sm">
                        Centro Propio
                    </span>
                    )}
                </div>
                
                <h4 className={`font-lemon text-base mb-1 leading-snug ${selectedId === clinic.sp_id ? 'text-dkv-green' : 'text-dkv-green-dark group-hover:text-dkv-green'}`}>
                    {clinic.sp_name}
                </h4>

                {clinic.promo_text && (
                    <div className="flex items-start gap-1.5 mb-2 mt-1">
                    <Info className="w-4 h-4 text-dkv-green shrink-0 mt-0.5" />
                    <p className="text-sm text-dkv-green-dark/80 italic font-fsme leading-tight">
                        {clinic.promo_text}
                    </p>
                    </div>
                )}
                
                <div className="text-sm text-dkv-gray font-fsme space-y-1 mt-2">
                    <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-dkv-gray/50" />
                    {/* CAMBIO: AÑADIDO CÓDIGO POSTAL */}
                    {clinic.address}, {clinic.postal_code} {clinic.town}
                    </p>
                    
                    <div className={`grid transition-all duration-500 ease-in-out overflow-hidden ${selectedId === clinic.sp_id ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="min-h-0 space-y-3 pt-2 border-t border-dkv-green/10">
                        <p className="flex items-center gap-2 font-bold text-dkv-green-dark text-base">
                            <Phone className="w-4 h-4" /> {clinic.phone || '900 810 076'}
                        </p>
                        
                        {clinic.professionals && clinic.professionals.length > 0 && (
                            <div className="mt-3 bg-gray-50 p-3 rounded border border-dkv-gray-border/60">
                                <p className="font-bold text-xs uppercase text-dkv-gray mb-2 tracking-wider flex items-center gap-1">
                                    <ShieldCheck className="w-4 h-4" /> Cuadro Médico:
                                </p>
                                <ul className="space-y-3">
                                    {clinic.professionals.map((prof, i) => (
                                        <li key={i} className="text-sm border-b border-gray-200 last:border-0 pb-1 last:pb-0">
                                            <span className="font-bold text-dkv-green-dark block">{prof.name}</span>
                                            {prof.specialties.length > 0 && (
                                                <span className="text-xs text-dkv-gray italic block ml-1 leading-tight">
                                                ↳ {prof.specialties.join(', ')}
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <Button size="sm" variant="contract" className="w-full mt-2 text-sm py-2 h-auto shadow-md">
                        Pedir Cita Online
                        </Button>
                    </div>
                    </div>
                </div>
                </div>
            ))}
            <div className="h-4 lg:h-0"></div>
            </div>
        </div>
      </div>

    </div>
  );

}
