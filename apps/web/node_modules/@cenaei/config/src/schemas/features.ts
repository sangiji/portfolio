import { z } from "zod";

export const FeatureSchema = z.object({
  enable3DHero: z.boolean(),
  enableBlog: z.boolean(),
  enableGamesSubdomain: z.boolean(),
  enableDemosSubdomain: z.boolean(),
  enableToolsSubdomain: z.boolean(),
  maintenanceMode: z.boolean(),
});

export type Features = z.infer<typeof FeatureSchema>;
