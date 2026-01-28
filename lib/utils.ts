import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases condicionales (clsx) y resuelve conflictos de Tailwind (tailwind-merge).
 * Ejemplo: cn("px-2 py-1 bg-red-500", className) -> si className tiene "bg-blue-500", gana el blue.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formateador de moneda para precios (Euro español)
 * Uso: formatPrice(1250.5) -> "1.250,50 €"
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

/**
 * Retardo simulado para efectos de carga (útil para demos y transiciones)
 * Uso: await sleep(2000); // Espera 2 segundos
 */
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));