import { withDb } from "@/lib/db";
import { prisma } from "@/lib/db";

export default async function PricingPage() {
  const tiers = await withDb(
    () =>
      prisma.pricingTier.findMany({
        where: { active: true },
        orderBy: { order: "asc" },
      }),
    [],
  );

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-24">
      <h1 className="text-3xl font-semibold text-foreground">Pricing</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {tiers.length === 0 ? (
          <p className="text-(--muted)">Tiers are managed in the admin CMS.</p>
        ) : (
          tiers.map((t) => (
            <div
              key={t.id}
              className={`rounded-2xl border p-6 backdrop-blur ${
                t.highlighted
                  ? "border-[var(--primary)] bg-(--primary)/10"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {t.badge ? (
                <span className="text-xs font-medium text-[var(--primary)]">
                  {t.badge}
                </span>
              ) : null}
              <h2 className="mt-2 text-xl font-semibold">{t.name}</h2>
              <p className="mt-2 text-2xl font-bold">
                {t.currency} {t.price.toString()}
                <span className="text-sm font-normal text-(--muted)">
                  {" "}
                  / {t.period}
                </span>
              </p>
              <p className="mt-2 text-sm text-(--muted)">{t.tagline}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
