import Link from "next/link";
import { withDb } from "@/lib/db";
import { prisma } from "@/lib/db";

export default async function BlogPage() {
  const posts = await withDb(
    () =>
      prisma.blogPost.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
      }),
    [],
  );

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 py-24">
      <h1 className="text-3xl font-semibold text-foreground">Writing</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href={`/blog/${post.slug}`}
              className="block rounded-2xl border border-white/10 p-4"
            >
              <span className="font-medium">{post.title}</span>
              <p className="mt-2 text-sm text-(--muted)">{post.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
