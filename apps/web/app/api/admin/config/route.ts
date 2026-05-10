import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";

const CONFIG_ROOT = resolve(process.cwd(), "../../packages/config/src/json");

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const file = searchParams.get("file");
  if (!file || !/^[a-z-]+$/.test(file)) {
    return new Response("Invalid", { status: 400 });
  }
  try {
    const content = await readFile(`${CONFIG_ROOT}/${file}.json`, "utf-8");
    return Response.json(JSON.parse(content));
  } catch {
    return new Response("Not found", { status: 404 });
  }
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const file = searchParams.get("file");
  if (!file || !/^[a-z-]+$/.test(file)) {
    return new Response("Invalid", { status: 400 });
  }
  const body = await req.json();
  await writeFile(`${CONFIG_ROOT}/${file}.json`, JSON.stringify(body, null, 2));
  return new Response(null, { status: 204 });
}
