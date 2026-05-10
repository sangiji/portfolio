import { prisma } from "@cenaei/db";
import { z } from "zod";

const Body = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  company: z.string().max(200).optional(),
  message: z.string().min(1).max(8000),
  budget: z.string().max(100).optional(),
  source: z.string().max(100).optional(),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: "Invalid body" }, { status: 400 });
  }

  try {
    await prisma.lead.create({ data: parsed.data });
  } catch {
    return Response.json({ error: "Server error" }, { status: 500 });
  }

  return new Response(null, { status: 204 });
}
