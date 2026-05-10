import { z } from "zod";

export const ThemeConfigSchema = z.object({
  colors: z.record(z.string(), z.string()),
  fonts: z.object({
    sans: z.string(),
    mono: z.string(),
  }),
  motion: z.object({
    durationFast: z.string(),
    durationNormal: z.string(),
    durationSlow: z.string(),
    blurGlass: z.string(),
  }),
});

export type ThemeConfig = z.infer<typeof ThemeConfigSchema>;
