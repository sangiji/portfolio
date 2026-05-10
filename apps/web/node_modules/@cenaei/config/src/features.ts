import flags from "./json/features.json";
import { FeatureSchema } from "./schemas/features";

export const features = FeatureSchema.parse(flags);
