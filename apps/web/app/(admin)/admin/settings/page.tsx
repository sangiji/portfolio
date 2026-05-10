export default function AdminSettingsPage() {
  return (
    <p className="text-(--muted)">
      JSON config editor via{" "}
      <code className="rounded bg-white/10 px-1">
        GET/PUT /api/admin/config?file=site
      </code>
    </p>
  );
}
