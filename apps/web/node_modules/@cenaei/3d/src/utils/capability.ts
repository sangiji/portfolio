export function getDeviceTier(): 0 | 1 | 2 | 3 {
  if (typeof window === "undefined") return 0;
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
  if (!gl) return 0;

  const renderer = (gl as WebGLRenderingContext).getExtension("WEBGL_debug_renderer_info");
  const gpu = renderer
    ? (gl as WebGLRenderingContext).getParameter(renderer.UNMASKED_RENDERER_WEBGL)
    : "";

  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  if (mem <= 1) return 1;
  if (mem <= 2) return 1;
  if (/Mali-4|Adreno 3|PowerVR/i.test(String(gpu))) return 1;
  if (mem >= 8) return 3;
  return 2;
}
