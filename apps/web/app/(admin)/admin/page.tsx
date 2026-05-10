export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
      <p className="mt-2 text-(--muted)">
        Overview and quick links — wire metrics and activity next.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ["Projects", "/admin/projects"],
          ["Skills", "/admin/skills"],
          ["Blog", "/admin/blog"],
          ["Pricing", "/admin/pricing"],
          ["Leads", "/admin/leads"],
          ["Games", "/admin/games"],
          ["Demos", "/admin/demos"],
          ["Settings", "/admin/settings"],
        ].map(([label, href]) => (
          <li key={href}>
            <a
              href={href}
              className="block rounded-xl border border-white/10 bg-white/5 p-4 text-foreground hover:bg-white/10"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
