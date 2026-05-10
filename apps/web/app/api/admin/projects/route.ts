import { prisma } from "@cenaei/db";

export async function GET() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
  return Response.json(projects);
}
