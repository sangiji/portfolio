import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@cenaei/db"],
  serverExternalPackages: ["@prisma/client", "prisma"],
};

export default nextConfig;
