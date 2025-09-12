import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.*.*", 
        port: "", 
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "",
        pathname: "/**",
      },
    ],
    unoptimized: process.env.NODE_ENV === "development",
  },

 
  webpack: (config) => {

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "pdfjs-dist/build/pdf": "pdfjs-dist/legacy/build/pdf.js",
    };

    return config;
  },
};

export default nextConfig;
