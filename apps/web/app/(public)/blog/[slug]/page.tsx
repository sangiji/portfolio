import { notFound } from "next/navigation";
import { withDb } from "@/lib/db";
import { prisma } from "@/lib/db";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await withDb(
    () =>
      prisma.blogPost.findFirst({
        where: { slug, status: "PUBLISHED" },
      }),
    null,
  );

  if (!post) notFound();

  return (
    <article className="mx-auto w-full max-w-3xl flex-1 px-6 py-24">
      <h1 className="text-3xl font-semibold text-foreground">{post.title}</h1>
      <p className="mt-4 text-(--muted)">{post.excerpt}</p>
      <p className="mt-8 text-sm text-(--muted)">
        TipTap JSON body — render pipeline TBD.
      </p>
    </article>
  );
}
