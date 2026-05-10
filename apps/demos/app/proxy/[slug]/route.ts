import { NextRequest } from "next/server";
import { prisma } from "@cenaei/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const demo = await prisma.demo.findUnique({ where: { slug } });
  if (!demo?.proxyPath) {
    return new Response("Not found", { status: 404 });
  }

  const base = process.env.DEMO_PROXY_BASE;
  if (!base) {
    return new Response("DEMO_PROXY_BASE not configured", { status: 503 });
  }

  const target = `${base.replace(/\/$/, "")}${demo.proxyPath}${req.nextUrl.search}`;
  const upstream = await fetch(target, {
    headers: { "x-forwarded-host": req.headers.get("host") ?? "" },
  });

  return new Response(upstream.body, {
    status: upstream.status,
    headers: upstream.headers,
  });
}
