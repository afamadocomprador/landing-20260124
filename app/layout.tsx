import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
// Importamos el Header migrado
import Header from "@/components/layout/Header";

// Configuración de Fuentes Corporativas (Mismo setup V2, mapeado a V1)
const lemonMilk = localFont({
  src: "./fonts/LemonMilkPro-Bold.woff2",
  variable: "--font-lemon-milk",
  weight: "700",
  display: "swap",
});

const fsMe = localFont({
  src: "./fonts/FSMe-Regular.woff2",
  variable: "--font-fs-me",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DKV Dentisalud Élite | Bernardo Sobrecasas",
  description: "Seguro dental DKV con precios pactados. Implantes a 550€ y menores incluidos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/* 1. GOOGLE CONSENT MODE v2 (CRÍTICO - LEGALIDAD) */}
        <Script id="google-consent-mode" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Configuración por defecto: TODO DENEGADO (Cumplimiento AEPD)
            gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
                'wait_for_update': 500
            });
            
            // Marca de tiempo inicial
            gtag('js', new Date());
          `}
        </Script>
      </head>
      
      {/* CAMBIO CRÍTICO: Usamos 'font-fsme' en lugar de 'font-body' para coincidir con tailwind.config.ts */}
      <body className={`${lemonMilk.variable} ${fsMe.variable} font-fsme antialiased bg-white`}>
        
        {/* Header V1 Inyectado */}
        <Header />

        {/* Ajuste de padding-top para compensar el header fijo (110px iniciales) */}
        <main className="pt-[110px] min-h-screen">
          {children}
        </main>
        
      </body>
    </html>
  );
}