"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function ProjectsScene({ tier }: { tier: 0 | 1 | 2 | 3 }) {
  const mesh = useRef<THREE.Mesh>(null);
  const { invalidate } = useThree();
  const scale = tier >= 2 ? 1.2 : 0.9;

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = clock.getElapsedTime() * 0.12;
    mesh.current.rotation.y = clock.getElapsedTime() * 0.18;
    invalidate();
  });

  return (
    <mesh ref={mesh} scale={scale}>
      <icosahedronGeometry args={[1.4, tier >= 3 ? 1 : 0]} />
      <meshStandardMaterial color="#00f5ff" wireframe opacity={0.35} transparent />
    </mesh>
  );
}
