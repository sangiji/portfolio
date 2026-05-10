import { prisma } from "@cenaei/db";

export async function GET() {
  const skills = await prisma.skill.findMany({ orderBy: { order: "asc" } });
  return Response.json(skills);
}
