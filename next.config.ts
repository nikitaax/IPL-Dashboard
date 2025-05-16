import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['scores.iplt20.com', 'documents.iplt20.com'],
     remotePatterns: [
      {
        protocol: "https",
        hostname: "scores.iplt20.com",
        pathname: "/ipl/teamlogos/**", // Allow IPL team logos
      },
    ],
  },
};

export default nextConfig;
