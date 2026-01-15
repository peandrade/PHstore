// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000", // Porta do backend em desenvolvimento
        pathname: "/media/**", // Caminho das imagens
      },
      // Adicione aqui o domínio do backend em produção quando tiver
      // {
      //   protocol: "https",
      //   hostname: "phstore-backend.vercel.app",
      //   pathname: "/media/**",
      // },
    ],
    dangerouslyAllowSVG: true,
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;