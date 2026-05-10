"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function SkillsScene({ tier }: { tier: 0 | 1 | 2 | 3 }) {
  const group = useRef<THREE.Group>(null);
  const { invalidate } = useThree();
  const torusDetail = tier >= 2 ? 24 : 12;

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.x = t * 0.1;
    group.current.rotation.z = t * 0.07;
    invalidate();
  });

  return (
    <group ref={group}>
      <mesh>
        <torusKnotGeometry args={[1, 0.28, torusDetail, tier >= 3 ? 48 : 32]} />
        <meshStandardMaterial color="#22d3ee" metalness={0.4} roughness={0.35} />
      </mesh>
    </group>
  );
}
