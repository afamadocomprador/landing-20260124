import { createClient } from '@supabase/supabase-js';

// ---------------------------------------------------------------------------
// 🔧 PARCHE DE RED PARA ENTORNOS CORPORATIVOS (SOLUCIÓN FETCH FAILED)
// ---------------------------------------------------------------------------

// 1. Bypass de Certificados SSL (Solo Desarrollo)
// Esto soluciona el fallo cuando una VPN/Firewall corporativo intercepta la conexión.
if (process.env.NODE_ENV === 'development' && typeof window === 'undefined') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 2. Diagnóstico de Arranque (Solo Servidor)
if (typeof window === 'undefined') {
  console.log(`🔌 [Supabase] Iniciando cliente servidor...`);
  console.log(`   - URL: ${supabaseUrl ? '✅ Cargada' : '❌ FALTA'}`);
  console.log(`   - Modo Bypass SSL: ${process.env.NODE_TLS_REJECT_UNAUTHORIZED === '0' ? '✅ ACTIVADO' : '⏹️ Desactivado'}`);
}

if (!supabaseUrl || !supabaseKey) {
  throw new Error("❌ Error Fatal: Faltan credenciales en .env.local");
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  },
  global: {
    // 3. Interceptor de Fetch para revelar la causa exacta del error
    fetch: async (url, options) => {
      try {
        // Forzamos 'no-store' para que Next.js no guarde errores en caché
        const response = await fetch(url, { ...options, cache: 'no-store' });
        return response;
      } catch (error: any) {
        // Si falla, imprimimos el error REAL (DNS, Proxy, etc.)
        if (typeof window === 'undefined') { // Solo ensuciar log en servidor
            console.error(`💥 [RED ERROR] Falló conexión Node.js -> Supabase`);
            console.error(`   - Intento hacia: ${url.toString().substring(0, 50)}...`);
            console.error(`   - Causa Técnica:`, error?.cause || error?.code || 'Desconocida');
            console.error(`   - Mensaje:`, error?.message);
        }
        throw error;
      }
    }
  }
});