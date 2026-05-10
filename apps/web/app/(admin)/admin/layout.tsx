import Link from "next/link";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-10 min-h-full bg-background">
      <header className="border-b border-white/10 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link href="/admin" className="font-semibold text-foreground">
            CMS
          </Link>
          <nav className="flex flex-wrap gap-3 text-sm text-(--muted)">
            <Link href="/admin/projects" className="hover:text-foreground">
              Projects
            </Link>
            <Link href="/admin/skills" className="hover:text-foreground">
              Skills
            </Link>
            <Link href="/admin/blog" className="hover:text-foreground">
              Blog
            </Link>
            <Link href="/admin/pricing" className="hover:text-foreground">
              Pricing
            </Link>
            <Link href="/admin/leads" className="hover:text-foreground">
              Leads
            </Link>
            <Link href="/" className="hover:text-(--primary)">
              Site
            </Link>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
    </div>
  );
}
