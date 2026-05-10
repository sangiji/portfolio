import { z } from "zod";

export const SeoConfigSchema = z.object({
  defaultTitle: z.string(),
  defaultDescription: z.string(),
  ogImagePath: z.string(),
  robots: z.record(z.string(), z.string()),
});

export type SeoConfig = z.infer<typeof SeoConfigSchema>;
