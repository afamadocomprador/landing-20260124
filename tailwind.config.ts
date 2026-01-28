import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // =====================================================================
        // SISTEMA V1 (OFICIAL DKV) - La única fuente de la verdad
        // Referencia: Manual de Identidad Corporativa DKV
        // =====================================================================
        dkv: {
          green: "#849700",       // Verde Claro Digital (Fondos, CTAs)
          "green-hover": "#43752B", // Verde Hover
          "green-dark": "#033B37",  // Verde Oscuro Digital (Textos)
          
          gray: "#6A625A",        // Gris Corporativo (Texto base)
          "gray-light": "#F7F7F7", // Gris Fondo Claro
          "gray-border": "#F0EFED", // Gris Separadores
          "gray-disabled": "#A6A190", // Gris Deshabilitado
          
          red: "#ED0039",         // Rojo Botón (Contratación/Urgencia)
          "red-hover": "#892737", // Rojo Hover
          white: "#FFFFFF",
        },

        // =====================================================================
        // SISTEMA V2 (LEGADO / DEPRECADO) - Solo referencia histórica
        // =====================================================================
        /* primary: "#849700",   
        secondary: "#033B37", 
        neutral: "#6A625A",   
        hero: "#FFFFFF",      
        "neutral-light": "#F0EFED", 
        */
      },
      fontFamily: {
        // =====================================================================
        // TIPOGRAFÍAS ACTIVAS (HÍBRIDO OPTIMIZADO)
        // Usamos nombres V1 pero con la tecnología de carga V2 (Next.js)
        // =====================================================================
        lemon: ["var(--font-lemon-milk)", "sans-serif"], // Titulares
        fsme: ["var(--font-fs-me)", "sans-serif"],       // Cuerpo de texto

        // =====================================================================
        // TIPOGRAFÍAS V2 (LEGADO / DEPRECADO) - Nombres semánticos antiguos
        // =====================================================================
        /* display: ["var(--font-lemon-milk)", "sans-serif"], 
        body: ["var(--font-fs-me)", "sans-serif"],
        */

        // =====================================================================
        // TIPOGRAFÍAS V1 (LEGADO / DEPRECADO) - Carga directa sin variables
        // Referencia histórica de cómo se hacía antes de optimizar con Next.js
        // =====================================================================
        /* lemon: ["Lemon Milk Pro", "sans-serif"],
        fsme: ["FS Me Web", "sans-serif"],
        */
      },
      letterSpacing: {
        widest: '.02em', 
      },
      boxShadow: {
        // Sombra suave específica del diseño V1
        'dkv-card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
};
export default config;