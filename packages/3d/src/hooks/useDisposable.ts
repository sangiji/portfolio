import { useEffect, useRef } from "react";
import * as THREE from "three";

/** Dispose Three.js subtree on unmount (geometries + materials). */
export function useDisposable<T extends THREE.Object3D>(factory: () => T): T {
  const ref = useRef<T | null>(null);
  if (!ref.current) {
    ref.current = factory();
  }

  useEffect(() => {
    const obj = ref.current;
    return () => {
      obj?.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material;
        if (mat) {
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat.dispose();
        }
      });
    };
  }, []);

  return ref.current;
}
