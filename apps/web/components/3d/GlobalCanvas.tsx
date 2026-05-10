"use client";

import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents, Preload } from "@react-three/drei";
import { usePathname } from "next/navigation";
import { Suspense, lazy, useMemo, type LazyExoticComponent, type FC } from "react";
import * as THREE from "three";
import { getDeviceTier } from "@cenaei/3d";

type SceneProps = { tier: 0 | 1 | 2 | 3 };

const SCENE_MAP: Record<string, LazyExoticComponent<FC<SceneProps>>> = {
  "/": lazy(() => import("./scenes/HeroScene")),
  "/projects": lazy(() => import("./scenes/ProjectsScene")),
  "/skills": lazy(() => import("./scenes/SkillsScene")),
};

export function GlobalCanvas() {
  const pathname = usePathname();
  const tier = getDeviceTier();
  const lights = useMemo(() => {
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    const directional = new THREE.DirectionalLight(0xffffff, 0.9);
    directional.position.set(4, 6, 2);
    return { ambient, directional };
  }, []);

  if (tier === 0) return null;

  const Scene = SCENE_MAP[pathname as keyof typeof SCENE_MAP] ?? null;
  if (!Scene) return null;

  return (
    <Canvas
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      gl={{
        antialias: tier >= 3,
        powerPreference: "high-performance",
        alpha: true,
        stencil: false,
        depth: true,
      }}
      dpr={[1, tier >= 3 ? 2 : 1.5]}
      frameloop="always"
      performance={{ min: 0.5 }}
      onCreated={({ gl }) => {
        gl.setClearColor("#050508", 1);
      }}
    >
      <primitive object={lights.ambient} />
      <primitive object={lights.directional} />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <Suspense fallback={null}>
        <Scene tier={tier} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
}
