import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: [
    "@cenaei/ui",
    "@cenaei/config",
    "@cenaei/db",
    "@cenaei/auth",
    "@cenaei/3d",
  ],
  serverExternalPackages: ["@prisma/client", "prisma"],
};

export default nextConfig;
