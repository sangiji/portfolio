import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

function subdomainMap(): Record<string, string> {
  const map: Record<string, string> = {};
  if (process.env.GAMES_APP_URL) map.games = process.env.GAMES_APP_URL;
  if (process.env.DEMOS_APP_URL) map.demo = process.env.DEMOS_APP_URL;
  if (process.env.TOOLS_APP_URL) map.tools = process.env.TOOLS_APP_URL;
  return map;
}

export function proxy(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  const hostname = host.split(":")[0] ?? host;
  const parts = hostname.split(".");
  const sub = parts[0];

  const map = subdomainMap();
  if (sub && map[sub]) {
    const target = map[sub];
    const url = req.nextUrl.clone();
    url.href = `${target.replace(/\/$/, "")}${req.nextUrl.pathname}${req.nextUrl.search}`;
    return NextResponse.rewrite(url);
  }

  const path = req.nextUrl.pathname;
  if (path.startsWith("/admin") && !path.startsWith("/admin/login")) {
    const sessionCookie = getSessionCookie(req);
    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  if (path.startsWith("/api/admin")) {
    const sessionCookie = getSessionCookie(req);
    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
