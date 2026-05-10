import { prisma } from "@cenaei/db";

/** Use in server components when DB may be unavailable at build time. */
export async function withDb<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export { prisma };
