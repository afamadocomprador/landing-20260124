"use client";
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

interface MapControllerProps {
  center?: [number, number];
  zoom?: number;
  bounds?: L.LatLngBoundsExpression;
}

export default function MapController({ center, zoom, bounds }: MapControllerProps) {
  const map = useMap();

  // 1. MANEJO DE LÍMITES (Zoom Out / Reset / Carga Inicial)
  useEffect(() => {
    if (bounds) {
      try {
        const boundsObj = L.latLngBounds(bounds as any);
        const targetCenter = boundsObj.getCenter();
        
        // AJUSTE FINO DE PADDING [x, y] (Horizontal, Vertical)
        // Horizontal: 20px -> Muy ajustado para maximizar zoom en móvil.
        // Vertical: 50px -> Necesario para que no se corte la "cabeza" de los pines (que miden ~40px de alto).
        const paddingPoint = new L.Point(20, 50); 
        
        // Calculamos el zoom máximo posible con este padding ajustado
        const targetZoom = map.getBoundsZoom(boundsObj, false, paddingPoint);
        
        map.flyTo(targetCenter, targetZoom, {
          duration: 2, 
          easeLinearity: 0.25 
        });
      } catch (e) {
        // Fallback seguro usando fitBounds estándar
        map.fitBounds(bounds, { 
            animate: true, 
            duration: 2,
            padding: [20, 50] // Mismo padding ajustado
        });
      }
    }
  }, [bounds, map]);

  // 2. MANEJO DE SELECCIÓN (Zoom In a un punto)
  useEffect(() => {
    if (center && zoom) {
      map.flyTo(center, zoom, {
        duration: 2,
        easeLinearity: 0.25
      });
    }
  }, [center, zoom, map]);

  return null;
}