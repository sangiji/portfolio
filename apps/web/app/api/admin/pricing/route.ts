import { prisma } from "@cenaei/db";

export async function GET() {
  const tiers = await prisma.pricingTier.findMany({ orderBy: { order: "asc" } });
  return Response.json(tiers);
}
