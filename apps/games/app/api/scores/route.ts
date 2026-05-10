import { prisma } from "@cenaei/db";
import type { Prisma } from "@cenaei/db";
import { z } from "zod";

const ScoreSchema = z.object({
  gameSlug: z.string(),
  player: z.string().min(1).max(32),
  score: z.number().int().min(0),
  meta: z.any().optional(),
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const slug = url.searchParams.get("gameSlug");
  if (!slug) {
    return Response.json({ error: "gameSlug required" }, { status: 400 });
  }
  const game = await prisma.game.findUnique({ where: { slug } });
  if (!game) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  const scores = await prisma.gameScore.findMany({
    where: { gameId: game.id },
    orderBy: { score: "desc" },
    take: 50,
  });
  return Response.json(scores);
}

export async function POST(req: Request) {
  const body = ScoreSchema.safeParse(await req.json().catch(() => null));
  if (!body.success) {
    return Response.json({ error: "Invalid" }, { status: 400 });
  }

  const game = await prisma.game.findUnique({ where: { slug: body.data.gameSlug } });
  if (!game) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const meta = body.data.meta as Prisma.InputJsonValue | undefined;

  const score = await prisma.gameScore.create({
    data: {
      gameId: game.id,
      player: body.data.player,
      score: body.data.score,
      meta: meta ?? undefined,
    },
  });

  return Response.json(score, { status: 201 });
}
