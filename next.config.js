/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Permite imágenes externas si las necesitas en el futuro
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;