import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'al-nikaah.com',
        port: '',
        pathname: '/Content/images/**',
      },
    ],
  },
};

export default nextConfig;