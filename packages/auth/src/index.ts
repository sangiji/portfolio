import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "@cenaei/db";

/** Env contract: BETTER_AUTH_SECRET, BETTER_AUTH_URL (e.g. https://cenaei.dev) */
export function createAuth(env: { secret: string; baseURL: string }) {
  return betterAuth({
    secret: env.secret,
    baseURL: env.baseURL,
    database: prismaAdapter(prisma, { provider: "postgresql" }),
    emailAndPassword: { enabled: true },
    trustedOrigins: [env.baseURL],
    plugins: [nextCookies()],
  });
}

export type AuthInstance = ReturnType<typeof createAuth>;
