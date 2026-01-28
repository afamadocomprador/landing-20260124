"use client";

import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';

interface LeadFormData {
  nombre: string;
  telefono: string;
  email: string;
  cp: string;
  consentPolicy: boolean;
  consentCommercial: boolean;
}

const LeadForm = () => {
  const [formData, setFormData] = useState<LeadFormData>({
    nombre: '', telefono: '', email: '', cp: '', consentPolicy: false, consentCommercial: false
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});  
  
  const [currentUrl, setCurrentUrl] = useState('');
  const [landingSlug, setLandingSlug] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
      const pathSegments = window.location.pathname.split('/').filter(Boolean);
      setLandingSlug(pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : 'home');
    }
  }, []);

  const getUserLocation = (): Promise<{ lat: number | null, lng: number | null }> => {
    return new Promise((resolve) => {
      if (!('geolocation' in navigator)) { resolve({ lat: null, lng: null }); return; }
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => { console.warn("GPS:", err.message); resolve({ lat: null, lng: null }); },
        { timeout: 4000, enableHighAccuracy: false }
      );
    });
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (formData.nombre.trim().length < 3) newErrors.nombre = "Nombre completo requerido";
    if (!/^[6789]\d{8}$/.test(formData.telefono.replace(/\s/g, ''))) newErrors.telefono = "Móvil válido";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Email inválido";
    if (!/^\d{5}$/.test(formData.cp)) newErrors.cp = "CP de 5 dígitos";
    if (!formData.consentPolicy) newErrors.consentPolicy = "Debes aceptar la política"; 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Función auxiliar para formatear la fecha a milisegundos
  const generateTimeId = () => {
    const now = new Date();
    const pad = (n: number, width: number = 2) => n.toString().padStart(width, '0');
    
    const year = now.getFullYear();
    const month = pad(now.getMonth() + 1);
    const day = pad(now.getDate());
    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    const seconds = pad(now.getSeconds());
    const milliseconds = pad(now.getMilliseconds(), 3); // 3 dígitos para mmm

    return `${year}-${month}-${day}-${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setErrorMessage('');
    
    // 1. GENERAMOS EL ID CON FORMATO DE TIEMPO (AAAA-MM-DD-HH:MM:SS.mmm)
    const leadId = generateTimeId();

    try {
      const location = await getUserLocation();

      // 2. INSERTAR EN SUPABASE (Usando la nueva columna id_referencia)
      const { error: dbError } = await supabase
        .from('leads_dental') 
        .insert([
          {
            // CAMBIO: No insertamos en 'id' (UUID), sino en 'id_referencia' (TEXT)
            id_referencia: leadId, 
            nombre: formData.nombre,
            telefono: formData.telefono,
            email: formData.email,
            codigo_postal: formData.cp,
            localidad_landing: landingSlug,
            url_referencia: currentUrl,
            latitud: location.lat,
            longitud: location.lng,
            consentimiento_privacidad: formData.consentPolicy,
            consentimiento_comercial: formData.consentCommercial,
            estado: 'Nuevo',
            created_at: new Date().toISOString(),
          },
        ]);

      if (dbError) throw dbError;

      // 3. ENVIAR NOTIFICACIÓN (Pasamos el leadId temporal para Email/Telegram)
      try {
        await fetch('/api/lead-notification', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            leadId: leadId, // Enviamos el string AAAA-MM-DD...
            nombre: formData.nombre,
            telefono: formData.telefono,
            email: formData.email,
            cp: formData.cp,
            consentCommercial: formData.consentCommercial
          })
        });
      } catch (emailError) {
        console.warn("Fallo notificación:", emailError);
      }

      // 4. DATALAYER
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          'event': 'generate_lead',
          'ecommerce': {
            'currency': 'EUR',
            'value': 25.00,
            'items': [{ 'item_name': 'DKV Dentisalud Élite', 'item_category': 'Seguro Dental' }]
          },
          'lead_context': { 'lead_id': leadId }
        });
      }

      setStatus('success');

    } catch (error: any) {
      console.error("Error crítico:", error);
      setErrorMessage('Error al procesar la solicitud. Por favor, inténtalo de nuevo.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 shadow-dkv-card border-t-4 border-dkv-green text-center rounded-sm min-h-[400px] flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-dkv-gray-border rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-12 h-12 text-dkv-green" />
        </div>
        <h3 className="text-2xl font-lemon font-bold text-dkv-green-dark mb-2 uppercase">¡Solicitud Recibida!</h3>
        <p className="text-dkv-gray font-fsme mb-8 max-w-xs mx-auto text-sm">
          Gracias <strong>{formData.nombre}</strong>. Te contactaremos en breve.
        </p>
        <button onClick={() => { setStatus('idle'); setFormData({ nombre: '', telefono: '', email: '', cp: '', consentPolicy: false, consentCommercial: false }); }} className="text-dkv-green font-bold text-sm underline font-fsme">
          Volver al formulario
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 shadow-dkv-card border-t-4 border-dkv-green rounded-sm relative z-20">
      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-dkv-green-dark font-lemon uppercase tracking-wide">PRESUPUESTO RÁPIDO</h3>
        <p className="text-dkv-gray text-xs mt-1 font-fsme">Precios oficiales DKV 2025. Sin compromiso.</p>
      </div>
      
      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-dkv-red text-dkv-red-hover text-xs flex gap-3 font-fsme">
          <AlertCircle className="w-4 h-4 mt-0.5" /><span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
            <input type="text" className={`w-full px-4 py-3 bg-dkv-gray-light border ${errors.nombre ? 'border-dkv-red' : 'border-transparent focus:border-dkv-green'} text-dkv-green-dark text-sm outline-none font-fsme`} value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} placeholder="Nombre Completo" disabled={status === 'submitting'} />
            {errors.nombre && <p className="text-dkv-red text-[10px] mt-1 ml-1 font-fsme absolute -bottom-4">{errors.nombre}</p>}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <input type="tel" className={`w-full px-4 py-3 bg-dkv-gray-light border ${errors.telefono ? 'border-dkv-red' : 'border-transparent focus:border-dkv-green'} text-dkv-green-dark text-sm outline-none font-fsme`} value={formData.telefono} onChange={e => setFormData({...formData, telefono: e.target.value})} placeholder="Móvil" disabled={status === 'submitting'} />
          <input type="text" className={`w-full px-4 py-3 bg-dkv-gray-light border ${errors.cp ? 'border-dkv-red' : 'border-transparent focus:border-dkv-green'} text-dkv-green-dark text-sm outline-none font-fsme`} value={formData.cp} onChange={e => setFormData({...formData, cp: e.target.value})} placeholder="CP" maxLength={5} disabled={status === 'submitting'} />
        </div>

        <input type="email" className={`w-full px-4 py-3 bg-dkv-gray-light border ${errors.email ? 'border-dkv-red' : 'border-transparent focus:border-dkv-green'} text-dkv-green-dark text-sm outline-none font-fsme`} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="Email (opcional)" disabled={status === 'submitting'} />

        <div className="pt-3 space-y-3 border-t border-dkv-gray/10 mt-4">
          <label className="flex items-start gap-3 cursor-pointer group select-none">
            <div className="relative flex items-center mt-0.5">
              <input type="checkbox" className="peer sr-only" checked={formData.consentPolicy} onChange={e => setFormData({...formData, consentPolicy: e.target.checked})} disabled={status === 'submitting'} />
              <div className={`w-5 h-5 border border-dkv-gray/30 flex items-center justify-center transition-all ${errors.consentPolicy ? 'border-dkv-red bg-red-50' : 'peer-checked:bg-dkv-green peer-checked:border-dkv-green'}`}><CheckCircle2 className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100" /></div>
            </div>
            <span className={`text-[11px] leading-tight font-fsme transition-colors ${errors.consentPolicy ? 'text-dkv-red font-bold' : 'text-dkv-gray'}`}>He leído y acepto la <a href="#" className="underline hover:text-dkv-green">Política de Privacidad</a>. *</span>
          </label>
          
          <label className="flex items-start gap-3 cursor-pointer group select-none">
            <div className="relative flex items-center mt-0.5">
              <input type="checkbox" className="peer sr-only" checked={formData.consentCommercial} onChange={e => setFormData({...formData, consentCommercial: e.target.checked})} disabled={status === 'submitting'} />
              <div className="w-5 h-5 border border-dkv-gray/30 flex items-center justify-center transition-all peer-checked:bg-dkv-green peer-checked:border-dkv-green"><CheckCircle2 className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100" /></div>
            </div>
            <span className="text-[11px] text-dkv-gray/80 leading-tight font-fsme">[OPCIONAL] Deseo recibir comunicaciones comerciales.</span>
          </label>
        </div>

        <button type="submit" disabled={status === 'submitting'} className="w-full bg-dkv-green hover:bg-dkv-green-hover text-white font-bold py-4 text-lg uppercase tracking-widest transition-all mt-4 font-lemon shadow-dkv-card disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-full">
          {status === 'submitting' ? <><Loader2 className="w-5 h-5 animate-spin" />Enviando...</> : 'PEDIR PRESUPUESTO'}
        </button>
      </form>
    </div>
  );
};


export default LeadForm;
