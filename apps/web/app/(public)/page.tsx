import Link from "next/link";
import { getSiteConfig } from "@cenaei/config";
import { Reveal } from "@cenaei/ui";
import { SketchfabEmbed } from "@/components/landing/SketchfabEmbed";
import { prisma, withDb } from "@/lib/db";

const FALLBACK_VALUE_PROPS = [
  {
    title: "Shape the problem",
    description:
      "Clarify outcomes, constraints, and risks before touching code.",
  },
  {
    title: "Build in small slices",
    description:
      "Ship vertical increments with observability and rollback paths.",
  },
  {
    title: "Own the finish",
    description:
      "Docs, handoff, and follow-through until it is boring in production.",
  },
] as const;

const FALLBACK_EXECUTION_LOOP = [
  {
    title: "Discover",
    description:
      "Map constraints, users, and business outcomes before implementation.",
  },
  {
    title: "Design",
    description:
      "Shape architecture and delivery slices with explicit trade-offs.",
  },
  {
    title: "Ship",
    description:
      "Build production-grade increments with observability and rollback plans.",
  },
  {
    title: "Scale",
    description:
      "Harden reliability, performance, and team handoff for long-term velocity.",
  },
] as const;

export default async function HomePage() {
  const site = getSiteConfig();
  const landing = site.landing;
  const projects = await withDb(
    () =>
      prisma.project.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { order: "asc" },
        take: 6,
      }),
    [],
  );

  const valueProps =
    landing?.valueProps && landing.valueProps.length > 0
      ? landing.valueProps
      : [...FALLBACK_VALUE_PROPS];

  const valuePropsHeading = landing?.valuePropsHeading ?? "How I work";
  const featuredHeading = landing?.featuredHeading ?? "Featured work";
  const ctaHeading = landing?.ctaHeading ?? "Have something in mind?";
  const ctaSubtext =
    landing?.ctaSubtext ??
    "Tell me what you are building — or grab time on the calendar.";
  const heroBlurb =
    "I build software systems that are fast to ship, hard to break, and easy to evolve.";
  const sketchfabId = landing?.sketchfabModelId?.trim();
  const sketchfabTitle = landing?.sketchfabTitle ?? "Sketchfab 3D model";

  const pillClass =
    "rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm backdrop-blur transition hover:bg-white/10 sm:px-5 sm:py-2.5";
  const cardClass =
    "rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10";
  const sectionShellClass = "relative space-y-8 pt-10 sm:pt-12";
  const sectionDividerClass =
    "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent";
  const processHeading = "Execution loop";
  const processItems = [...FALLBACK_EXECUTION_LOOP];
  const socialLinks = Object.entries(site.social);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-20 px-4 py-20 sm:px-6 sm:py-24 lg:gap-24 lg:px-8">
      <section className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="flex min-w-0 flex-col gap-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary)] sm:text-sm">
              {site.name}
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {site.tagline}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-(--muted) sm:text-lg sm:leading-8">
              {heroBlurb}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <nav className="flex flex-wrap gap-3 sm:gap-4">
              {site.nav.map((item) => (
                <Link key={item.href} href={item.href} className={pillClass}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className={pillClass}>
                Start a project
              </Link>
              <a href={`mailto:${site.contact.email}`} className={pillClass}>
                Email me
              </a>
            </div>
          </Reveal>
        </div>

        {sketchfabId ? (
          <Reveal delay={0.12} className="min-w-0">
            <SketchfabEmbed modelId={sketchfabId} title={sketchfabTitle} />
          </Reveal>
        ) : null}
      </section>

      <section className={sectionShellClass}>
        <div className={sectionDividerClass} />
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className={`${cardClass} lg:col-span-2`}>
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
                Delivery profile
              </p>
              <p className="mt-3 text-sm leading-relaxed text-(--muted)">
                Full-stack engineering with product focus, from first scope
                session to production operations.
              </p>
            </div>
            <div className={cardClass}>
              <p className="text-xs uppercase tracking-wider text-(--muted)">
                Published projects
              </p>
              <p className="mt-3 text-3xl font-semibold text-foreground">
                {projects.length}
              </p>
            </div>
            <div className={cardClass}>
              <p className="text-xs uppercase tracking-wider text-(--muted)">
                Core pathways
              </p>
              <p className="mt-3 text-3xl font-semibold text-foreground">
                {site.nav.length}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className={sectionShellClass}>
        <div className={sectionDividerClass} />
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {valuePropsHeading}
          </h2>
        </Reveal>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {valueProps.map((item, i) => (
            <li key={`${item.title}-${i}`}>
              <Reveal delay={0.06 + i * 0.05}>
                <div className={`${cardClass} flex h-full flex-col gap-2`}>
                  <span className="text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-(--muted)">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className={sectionShellClass}>
        <div className={sectionDividerClass} />
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {processHeading}
          </h2>
        </Reveal>
        <ul className="grid gap-4 sm:grid-cols-2">
          {processItems.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={0.06 + i * 0.04}>
                <div className={`${cardClass} flex h-full flex-col gap-3`}>
                  <span className="text-xs font-medium uppercase tracking-wider text-[var(--primary)]">
                    Step {i + 1}
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-(--muted)">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className={sectionShellClass}>
        <div className={sectionDividerClass} />
        <Reveal className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {featuredHeading}
          </h2>
          <Link href="/projects" className={`${pillClass} whitespace-nowrap`}>
            View all
          </Link>
        </Reveal>
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.length === 0 ? (
            <li className="text-(--muted) sm:col-span-2 xl:col-span-3">
              Projects will appear here from the CMS.
            </li>
          ) : (
            projects.map((p, i) => (
              <li key={p.id} className="min-w-0">
                <Reveal delay={0.05 + i * 0.04}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className={`${cardClass} flex h-full min-h-[8.5rem] flex-col`}
                  >
                    <span className="text-lg font-semibold tracking-tight text-foreground">
                      {p.title}
                    </span>
                    <p className="mt-2 line-clamp-3 text-sm text-(--muted)">
                      {p.summary}
                    </p>
                  </Link>
                </Reveal>
              </li>
            ))
          )}
        </ul>
      </section>

      <section className={sectionShellClass}>
        <div className={sectionDividerClass} />
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            On the web
          </h2>
        </Reveal>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {socialLinks.map(([network, href], i) => (
            <li key={network}>
              <Reveal delay={0.05 + i * 0.04}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cardClass} block h-full`}
                >
                  <span className="text-xs uppercase tracking-wider text-[var(--primary)]">
                    {network}
                  </span>
                  <p className="mt-2 text-sm text-(--muted)">
                    Follow updates and recent build logs.
                  </p>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className={sectionShellClass}>
        <div className={sectionDividerClass} />
        <Reveal>
          <div
            className={`${cardClass} flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between`}
          >
            <div className="min-w-0 space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {ctaHeading}
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-(--muted)">
                {ctaSubtext}
              </p>
            </div>
            <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/contact" className={pillClass}>
                Contact
              </Link>
              <a href={`mailto:${site.contact.email}`} className={pillClass}>
                Email
              </a>
              <a
                href={site.contact.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className={pillClass}
              >
                Schedule
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
