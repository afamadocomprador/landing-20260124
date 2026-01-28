"use client";

import React, { useState, useEffect } from 'react';
import { Settings, X, ShieldCheck } from 'lucide-react';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  
  // Estado de las preferencias (Marketing desactivado por defecto - Opt-in estricto RGPD)
  const [preferences, setPreferences] = useState({
    technical: true, // Siempre true (Interés Legítimo / Exentas)
    marketing: false 
  });

  useEffect(() => {
    // Comprobar si ya existe consentimiento guardado
    const consent = localStorage.getItem('dkv_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const saveConsent = (status: 'all' | 'rejected' | 'custom') => {
    let finalPreferences = { technical: true, marketing: false };

    if (status === 'all') {
      finalPreferences = { technical: true, marketing: true };
    } else if (status === 'rejected') {
      finalPreferences = { technical: true, marketing: false };
    } else {
      finalPreferences = preferences;
    }

    // 1. Persistencia Local
    localStorage.setItem('dkv_cookie_consent', 'true');
    localStorage.setItem('dkv_cookie_prefs', JSON.stringify(finalPreferences));

    // 2. Lógica de Desbloqueo (Consent Mode v2)
    if (typeof window !== 'undefined') {
      const gtmStatus = finalPreferences.marketing ? 'granted' : 'denied';
      
      // Actualizamos los permisos en Google (GTM/GA4)
      (window as any).gtag?.('consent', 'update', {
        'ad_storage': gtmStatus,
        'ad_user_data': gtmStatus,
        'ad_personalization': gtmStatus,
        'analytics_storage': gtmStatus 
      });
      
      // Disparamos el evento clave para que GTM sepa que hubo una actualización
      (window as any).dataLayer?.push({'event': 'consent_update'});
    }

    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    // ESTILO V1: Fuente FS Me global para el banner
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 font-fsme">
      <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-md shadow-2xl rounded-xl border border-dkv-gray-border overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
        
        {/* --- VISTA PRINCIPAL (Resumida) --- */}
        {!showConfig ? (
          <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-start lg:items-center">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2 text-dkv-green font-bold uppercase tracking-widest text-xs font-lemon">
                <ShieldCheck className="w-4 h-4" />
                <span>Privacidad y Transparencia</span>
              </div>
              {/* Titular en Lemon Milk + Verde Oscuro */}
              <h3 className="text-xl font-lemon font-bold text-dkv-green-dark">
                Tu privacidad es nuestra prioridad
              </h3>
              {/* Texto legal en Gris Corporativo */}
              <p className="text-sm text-dkv-gray leading-relaxed text-justify md:text-left font-fsme">
                Utilizamos cookies propias y de terceros para fines analíticos y para mostrarte 
                publicidad personalizada en base a un perfil elaborado a partir de tus hábitos 
                de navegación. Puedes aceptar todas las cookies pulsando 
                <span className="font-bold text-dkv-green-dark mx-1">"Aceptar Todas"</span>, 
                rechazarlas o configurarlas a tu gusto.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
              {/* Botón Configurar: Outline Gris */}
              <button 
                onClick={() => setShowConfig(true)}
                className="px-6 py-3 border border-dkv-gray/30 text-dkv-gray font-bold rounded-lg hover:bg-dkv-gray-light transition-all text-sm flex items-center justify-center gap-2 font-fsme"
              >
                <Settings className="w-4 h-4" />
                Configurar
              </button>
              
              {/* Botón Rechazar: Outline Verde Oscuro (Estilo secundario) */}
              <button 
                onClick={() => saveConsent('rejected')}
                className="px-6 py-3 border border-dkv-green-dark text-dkv-green-dark font-bold rounded-lg hover:bg-dkv-green-dark/5 transition-all text-sm font-fsme"
              >
                Rechazar
              </button>
              
              {/* Botón Aceptar: Sólido Verde DKV (Estilo primario) */}
              <button 
                onClick={() => saveConsent('all')}
                className="px-8 py-3 bg-dkv-green text-white font-bold rounded-lg hover:bg-dkv-green-hover transition-all text-sm shadow-lg shadow-dkv-green/20 font-lemon tracking-wide"
              >
                ACEPTAR TODAS
              </button>
            </div>
          </div>
        ) : (
          
          /* --- VISTA DE CONFIGURACIÓN (Detallada) --- */
          <div className="p-6 md:p-8 bg-dkv-gray-light/50">
            <div className="flex justify-between items-center mb-6 border-b border-dkv-gray-border pb-4">
              <h3 className="font-lemon font-bold text-dkv-green-dark text-xl">Configuración de Privacidad</h3>
              <button onClick={() => setShowConfig(false)} className="text-dkv-gray hover:text-dkv-green-dark transition-colors p-2 rounded-full hover:bg-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 mb-8">
              {/* Opción 1: Cookies Técnicas (Bloqueada/Obligatoria) */}
              <div className="flex items-center justify-between p-4 bg-white border border-dkv-gray-border rounded-xl shadow-sm opacity-70 cursor-not-allowed">
                <div>
                  <p className="font-bold text-dkv-green-dark text-sm flex items-center gap-2 font-lemon">
                    Cookies Técnicas 
                    <span className="text-[10px] bg-dkv-gray text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-fsme">Necesarias</span>
                  </p>
                  <p className="text-xs text-dkv-gray mt-1">Permiten el funcionamiento básico de la web. No se pueden desactivar.</p>
                </div>
                {/* Toggle Bloqueado (Verde pálido) */}
                <div className="w-12 h-6 bg-dkv-green/30 rounded-full relative">
                   <div className="absolute right-1 top-1 bg-dkv-green w-4 h-4 rounded-full shadow-sm"></div>
                </div>
              </div>

              {/* Opción 2: Marketing (Configurable) */}
              <div className="flex items-center justify-between p-4 bg-white border border-dkv-gray-border rounded-xl shadow-sm hover:border-dkv-green/30 transition-colors">
                <div>
                  <p className="font-bold text-dkv-green-dark text-sm font-lemon">Publicidad y Análisis</p>
                  <p className="text-xs text-dkv-gray mt-1">Permiten medir el rendimiento y mostrar ofertas personalizadas.</p>
                </div>
                {/* Toggle Interactivo */}
                <label className="relative flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                  />
                  {/* Fondo del toggle: Gris si off, Verde DKV si on */}
                  <div className="w-12 h-6 bg-dkv-gray/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-dkv-green shadow-inner"></div>
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-2 border-t border-dkv-gray-border mt-6 items-center">
              <button 
                onClick={() => saveConsent('all')}
                className="text-sm font-bold text-dkv-green-dark underline hover:text-dkv-green mr-auto sm:self-center order-2 sm:order-1 font-fsme"
              >
                Prefiero Aceptar Todas
              </button>
              <button 
                onClick={() => saveConsent('custom')}
                className="w-full sm:w-auto px-8 py-3 bg-dkv-green-dark text-white rounded-lg font-bold hover:bg-black transition-colors text-sm shadow-md font-lemon order-1 sm:order-2"
              >
                GUARDAR MI SELECCIÓN
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieBanner;