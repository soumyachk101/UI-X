/** @type {import('next').NextConfig} */
import path from "path";

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: { bodySizeLimit: "2mb" },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.join(process.cwd(), ""),
      "@/components": path.join(process.cwd(), "components"),
      "@/components/ui": path.join(process.cwd(), "components/ui"),
      "@/docs": path.join(process.cwd(), "app/docs"),
      "@/lib": path.join(process.cwd(), "lib"),
    };
    return config;
  },
};

export default nextConfig;
