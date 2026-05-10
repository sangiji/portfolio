import { getSiteConfig } from "@cenaei/config";

export default function ContactPage() {
  const site = getSiteConfig();

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-8 px-6 py-24">
      <h1 className="text-3xl font-semibold text-foreground">Contact</h1>
      <p className="text-(--muted)">
        Email:{" "}
        <a
          className="text-[var(--primary)] underline"
          href={`mailto:${site.contact.email}`}
        >
          {site.contact.email}
        </a>
      </p>
      <form action="/api/contact" method="post" className="flex flex-col gap-4">
        <p className="text-sm text-(--muted)">
          Use the JSON API{" "}
          <code className="rounded bg-white/10 px-1">POST /api/contact</code>{" "}
          for programmatic submissions; a full form UI can be added next.
        </p>
      </form>
    </main>
  );
}
