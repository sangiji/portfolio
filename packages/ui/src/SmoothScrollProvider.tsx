"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    let alive = true;
    let lenis: Lenis | undefined;
    let removeRaf: (() => void) | undefined;

    void (async () => {
      const { gsap } = await import("gsap");
      if (!alive) return;

      const instance = new Lenis({
        duration: 1.2,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
      lenis = instance;

      const raf = (time: number) => {
        instance.raf(time * 1000);
      };
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      removeRaf = () => {
        gsap.ticker.remove(raf);
      };

      if (!alive) {
        removeRaf();
        instance.destroy();
      }
    })();

    return () => {
      alive = false;
      removeRaf?.();
      lenis?.destroy();
    };
  }, [pathname]);

  return <>{children}</>;
}
