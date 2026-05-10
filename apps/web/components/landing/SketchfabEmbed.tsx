"use client";

import { getDeviceTier } from "@cenaei/3d";
import { useEffect, useMemo, useState } from "react";

function buildEmbedSrc(modelId: string) {
  const params = new URLSearchParams({
    autospin: "1",
    autostart: "1",
    preload: "1",
    ui_theme: "dark",
  });
  return `https://sketchfab.com/models/${encodeURIComponent(modelId)}/embed?${params}`;
}

export function SketchfabEmbed({
  modelId,
  title = "3D model viewer",
}: {
  modelId: string;
  title?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [tier, setTier] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    setMounted(true);
    setTier(getDeviceTier());
  }, []);

  const src = useMemo(() => buildEmbedSrc(modelId), [modelId]);

  if (!modelId.trim()) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 aspect-video min-h-[200px] sm:min-h-[240px]">
      {!mounted ? (
        <div
          className="absolute inset-0 animate-pulse bg-white/[0.04]"
          aria-hidden
        />
      ) : tier === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-sm text-(--muted)">
          3D embed is hidden on this device to save resources.
        </div>
      ) : (
        <iframe
          title={title}
          src={src}
          allow="autoplay; fullscreen; xr-spatial-tracking"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
        />
      )}
    </div>
  );
}
