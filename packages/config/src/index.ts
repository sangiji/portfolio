import siteJson from "./json/site.json";
import themeJson from "./json/theme.json";
import seoJson from "./json/seo.json";
import perfJson from "./json/perf.json";
import { SiteConfigSchema } from "./schemas/site";
import { ThemeConfigSchema } from "./schemas/theme";
import { SeoConfigSchema } from "./schemas/seo";
import { PerfConfigSchema } from "./schemas/perf";

export { features } from "./features";
export type { Features } from "./schemas/features";
export type { SiteConfig } from "./schemas/site";
export type { ThemeConfig } from "./schemas/theme";
export type { SeoConfig } from "./schemas/seo";
export type { PerfConfig } from "./schemas/perf";

export function getSiteConfig() {
  return SiteConfigSchema.parse(siteJson);
}

export function getThemeConfig() {
  return ThemeConfigSchema.parse(themeJson);
}

export function getSeoConfig() {
  return SeoConfigSchema.parse(seoJson);
}

export function getPerfConfig() {
  return PerfConfigSchema.parse(perfJson);
}
