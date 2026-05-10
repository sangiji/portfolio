import { notFound } from "next/navigation";
import Link from "next/link";
import { getSiteConfig } from "@cenaei/config";
import { Reveal } from "@cenaei/ui";
import { withDb } from "@/lib/db";
import { prisma } from "@/lib/db";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const site = getSiteConfig();
  const content = site.projectDetailPage;
  const { slug } = await params;
  const project = await withDb(
    () =>
      prisma.project.findFirst({
        where: { slug, status: "PUBLISHED" },
        include: { techStack: true },
      }),
    null,
  );

  if (!project) notFound();

  const cardClass =
    "rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:bg-white/10";
  const ctaHeading = content?.cta?.heading ?? "Planning something similar?";
  const ctaSubtext =
    content?.cta?.subtext ??
    "I can help design the right architecture and execute it end to end.";
  const ctaPrimaryLabel = content?.cta?.primaryLabel ?? "Contact";
  const ctaSecondaryLabel = content?.cta?.secondaryLabel ?? "Schedule";

  return (
    <article className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <section className="space-y-5">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-widest text-[var(--primary)]">
            {content?.eyebrow ?? "Case Study"}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-(--muted)">
            {project.summary}
          </p>
          <p className="mt-3 text-sm text-(--muted)">
            {content?.contextLine ??
              "Built for reliability, maintainability, and business impact."}
          </p>
        </Reveal>
      </section>

      <section className="space-y-5">
        <Reveal>
          <h2 className="text-xl font-medium text-foreground sm:text-2xl">
            {content?.stackHeading ?? "Tech stack"}
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <div className={cardClass}>
            {project.techStack.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {project.techStack.map((t) => (
                  <li
                    key={t.id}
                    className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-foreground"
                  >
                    {t.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-(--muted)">
                Tech stack details will appear here.
              </p>
            )}
          </div>
        </Reveal>
      </section>

      <section className="space-y-5">
        <Reveal>
          <h2 className="text-xl font-medium text-foreground sm:text-2xl">
            {content?.contextHeading ?? "Delivery context"}
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <div className={cardClass}>
            <p className="text-sm leading-relaxed text-(--muted)">
              {content?.contextLine ??
                "Built for reliability, maintainability, and business impact."}
            </p>
          </div>
        </Reveal>
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
    </article>
  );
}
