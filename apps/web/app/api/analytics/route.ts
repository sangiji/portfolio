import { prisma } from "@cenaei/db";
import { z } from "zod";

const Body = z.object({
  path: z.string().min(1).max(2000),
  referrer: z.string().max(2000).optional(),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: "Invalid body" }, { status: 400 });
  }

  const ua = req.headers.get("user-agent") ?? undefined;

  try {
    await prisma.pageView.create({
      data: {
        path: parsed.data.path,
        referrer: parsed.data.referrer,
        ua,
      },
    });
  } catch {
    return Response.json({ error: "Server error" }, { status: 500 });
  }

  return new Response(null, { status: 204 });
}
