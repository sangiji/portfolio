import Link from "next/link";
import { getSiteConfig } from "@cenaei/config";
import { Reveal } from "@cenaei/ui";
import { withDb } from "@/lib/db";
import { prisma } from "@/lib/db";

export default async function ProjectsPage() {
  const site = getSiteConfig();
  const content = site.projectsPage;
  const projects = await withDb(
    () =>
      prisma.project.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { order: "asc" },
      }),
    [],
  );

  const cardClass =
    "rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:bg-white/10";
  const ctaHeading =
    content?.cta?.heading ?? "Want this level of build quality?";
  const ctaSubtext =
    content?.cta?.subtext ??
    "Share your scope and I will help shape and ship it.";
  const ctaPrimaryLabel = content?.cta?.primaryLabel ?? "Start a conversation";
  const ctaSecondaryLabel = content?.cta?.secondaryLabel ?? "Book a call";
  const contextItems =
    content?.contextItems && content.contextItems.length > 0
      ? content.contextItems
      : [
          "Complex integrations with clean developer experience",
          "Performance-minded frontend and resilient backend design",
          "End-to-end ownership from idea to production",
        ];

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-4 py-20 sm:px-6 sm:py-24 lg:gap-20 lg:px-8">
      <section className="space-y-6">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-widest text-[var(--primary)]">
            {content?.eyebrow ?? "Proof of Execution"}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {content?.title ?? "Projects"}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-(--muted) sm:text-base">
            {content?.intro ??
              "Selected builds that show product thinking, technical depth, and reliable delivery."}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            className={`${cardClass} grid gap-3 sm:grid-cols-2 lg:grid-cols-4`}
          >
            <div className="sm:col-span-2">
              <p className="text-sm font-medium text-foreground">
                {content?.contextHeading ?? "Delivery signals"}
              </p>
              <p className="mt-2 text-xs text-(--muted)">
                {projects.length} published project
                {projects.length === 1 ? "" : "s"}
              </p>
            </div>
            {contextItems.map((item) => (
              <p key={item} className="text-sm text-(--muted)">
                {item}
              </p>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="space-y-6">
        <Reveal>
          <h2 className="text-xl font-medium text-foreground sm:text-2xl">
            {content?.sectionHeading ?? "Featured projects"}
          </h2>
        </Reveal>
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((p) => (
            <li key={p.id}>
              <Reveal delay={0.06}>
                <Link
                  href={`/projects/${p.slug}`}
                  className={`${cardClass} block h-full`}
                >
                  <span className="text-lg font-medium text-foreground">
                    {p.title}
                  </span>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-(--muted)">
                    {p.summary}
                  </p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <Reveal>
          <div
            className={`${cardClass} flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between`}
          >
            <div className="space-y-2">
              <h2 className="text-xl font-medium text-foreground sm:text-2xl">
                {ctaHeading}
              </h2>
              <p className="max-w-xl text-sm text-(--muted)">{ctaSubtext}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm backdrop-blur transition hover:bg-white/10"
              >
                {ctaPrimaryLabel}
              </Link>
              <a
                href={site.contact.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm backdrop-blur transition hover:bg-white/10"
              >
                {ctaSecondaryLabel}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
