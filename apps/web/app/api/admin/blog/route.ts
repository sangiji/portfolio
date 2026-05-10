import { prisma } from "@cenaei/db";

export async function GET() {
  const posts = await prisma.blogPost.findMany({ orderBy: { updatedAt: "desc" } });
  return Response.json(posts);
}
