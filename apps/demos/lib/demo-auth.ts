import { prisma } from "@cenaei/db";

/** Validate DemoToken: scopes, expiry, maxUses — used by middleware / routes (Node runtime). */
export async function validateDemoToken(
  token: string,
  slug: string,
): Promise<{ expiresAt: Date | null } | null> {
  const row = await prisma.demoToken.findFirst({ where: { token } });
  if (!row) return null;
  if (row.expiresAt && row.expiresAt < new Date()) return null;
  if (row.maxUses != null && row.usedCount >= row.maxUses) return null;
  if (!row.scopes.includes(slug)) return null;
  return { expiresAt: row.expiresAt };
}

export async function getDemoBySlug(slug: string) {
  return prisma.demo.findUnique({ where: { slug } });
}
