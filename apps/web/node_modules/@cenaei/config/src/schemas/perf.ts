import { z } from "zod";

export const PerfConfigSchema = z.object({
  webgl: z.object({
    antialias: z.boolean(),
    pixelRatioMax: z.number(),
    maxParticles: z.number(),
    shadowMapEnabled: z.boolean(),
    targetFPS: z.number(),
    degradeToCSS: z.boolean(),
  }),
  images: z.object({
    formats: z.array(z.enum(["avif", "webp", "jpeg", "png"])),
    quality: z.number(),
    placeholderBlur: z.boolean(),
  }),
  prefetch: z.enum(["viewport", "none", "all"]),
});

export type PerfConfig = z.infer<typeof PerfConfigSchema>;
