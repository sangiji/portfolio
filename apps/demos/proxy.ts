import { NextResponse, type NextRequest } from "next/server";

/**
 * Edge middleware cannot use Prisma. Full DemoToken exchange + gates belong in
 * Node route handlers or `app/[slug]/layout.tsx` (see ARCHITECTURE §9).
 * Stub: forward token param to a server route for cookie exchange when implemented.
 */
export function proxy(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
