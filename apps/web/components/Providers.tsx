"use client";

import dynamic from "next/dynamic";
import { features } from "@cenaei/config";
import { SmoothScrollProvider } from "@cenaei/ui";

const GlobalCanvas = dynamic(
  () => import("@/components/3d/GlobalCanvas").then((m) => m.GlobalCanvas),
  { ssr: false },
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      {features.enable3DHero ? <GlobalCanvas /> : null}
      {children}
    </SmoothScrollProvider>
  );
}
