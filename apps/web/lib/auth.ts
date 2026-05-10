import { createAuth } from "@cenaei/auth";

const secret =
  process.env.BETTER_AUTH_SECRET ?? "dev-only-secret-min-32-chars-long-change-me!!";
const baseURL = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";

export const auth = createAuth({ secret, baseURL });
