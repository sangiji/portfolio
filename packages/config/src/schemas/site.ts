import { z } from "zod";

const NavItemSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const LandingValuePropSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const CtaSchema = z.object({
  heading: z.string().optional(),
  subtext: z.string().optional(),
  primaryLabel: z.string().optional(),
  secondaryLabel: z.string().optional(),
});

export const SiteConfigSchema = z.object({
  name: z.string(),
  domain: z.string(),
  tagline: z.string(),
  nav: z.array(NavItemSchema),
  social: z.record(z.string(), z.string()),
  contact: z.object({
    email: z.string().email(),
    calendly: z.string().url(),
  }),
  landing: z
    .object({
      sketchfabModelId: z.string().min(1).optional(),
      sketchfabTitle: z.string().optional(),
      valuePropsHeading: z.string().optional(),
      valueProps: z.array(LandingValuePropSchema).optional(),
      featuredHeading: z.string().optional(),
      ctaHeading: z.string().optional(),
      ctaSubtext: z.string().optional(),
    })
    .optional(),
  skillsPage: z
    .object({
      eyebrow: z.string().optional(),
      title: z.string().optional(),
      intro: z.string().optional(),
      contextHeading: z.string().optional(),
      contextItems: z.array(z.string()).optional(),
      sectionHeading: z.string().optional(),
      cta: CtaSchema.optional(),
    })
    .optional(),
  projectsPage: z
    .object({
      eyebrow: z.string().optional(),
      title: z.string().optional(),
      intro: z.string().optional(),
      contextHeading: z.string().optional(),
      contextItems: z.array(z.string()).optional(),
      sectionHeading: z.string().optional(),
      cta: CtaSchema.optional(),
    })
    .optional(),
  skillDetailPage: z
    .object({
      eyebrow: z.string().optional(),
      valueHeading: z.string().optional(),
      relatedHeading: z.string().optional(),
      emptyRelatedText: z.string().optional(),
      contextLine: z.string().optional(),
      cta: CtaSchema.optional(),
    })
    .optional(),
  projectDetailPage: z
    .object({
      eyebrow: z.string().optional(),
      stackHeading: z.string().optional(),
      contextHeading: z.string().optional(),
      contextLine: z.string().optional(),
      cta: CtaSchema.optional(),
    })
    .optional(),
});

export type SiteConfig = z.infer<typeof SiteConfigSchema>;
