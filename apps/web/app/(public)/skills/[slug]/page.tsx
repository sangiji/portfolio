import { notFound } from "next/navigation";
import Link from "next/link";
import { getSiteConfig } from "@cenaei/config";
import { Reveal } from "@cenaei/ui";
import { withDb } from "@/lib/db";
import { prisma } from "@/lib/db";

export default async function SkillDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const site = getSiteConfig();
  const content = site.skillDetailPage;
  const { slug } = await params;
  const skill = await withDb(
    () =>
      prisma.skill.findFirst({
        where: { slug, published: true },
        include: { usedIn: true },
      }),
    null,
  );

  if (!skill) notFound();

  const cardClass =
    "rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:bg-white/10";
  const ctaHeading =
    content?.cta?.heading ?? "Need this expertise on your roadmap?";
  const ctaSubtext =
    content?.cta?.subtext ??
    "I can apply it directly to your stack and delivery goals.";
  const ctaPrimaryLabel = content?.cta?.primaryLabel ?? "Contact";
  const ctaSecondaryLabel = content?.cta?.secondaryLabel ?? "Schedule";

  return (
    <article className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <section className="space-y-5">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-widest text-[var(--primary)]">
            {content?.eyebrow ?? "Deep Dive"}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {skill.name}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-(--muted)">
            {skill.pitch}
          </p>
          <p className="mt-3 text-sm text-(--muted)">
            {content?.contextLine ??
              "Applied with product context, measurable outcomes, and production responsibility."}
          </p>
        </Reveal>
      </section>

      <section className="space-y-5">
        <Reveal>
          <h2 className="text-xl font-medium text-foreground sm:text-2xl">
            {content?.valueHeading ?? "Business value"}
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <div className={cardClass}>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
              {skill.businessValue}
            </p>
          </div>
        </Reveal>
      </section>

      <section className="space-y-5">
        <Reveal>
          <h2 className="text-xl font-medium text-foreground sm:text-2xl">
            {content?.relatedHeading ?? "Used in projects"}
          </h2>
        </Reveal>
        {skill.usedIn.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skill.usedIn.map((tag, i) => (
              <li key={tag.id}>
                <Reveal delay={0.06 + i * 0.04}>
                  <div className={`${cardClass} h-full`}>
                    <span className="font-medium text-foreground">
                      {tag.name}
                    </span>
                    <p className="mt-2 text-sm text-(--muted)">
                      Technology tag applied across relevant project work.
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <Reveal delay={0.06}>
            <div className={cardClass}>
              <p className="text-sm text-(--muted)">
                {content?.emptyRelatedText ??
                  "Related projects will be linked here."}
              </p>
            </div>
          </Reveal>
        )}
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
