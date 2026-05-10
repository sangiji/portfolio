import { LoginForm } from "./ui";

export default function AdminLoginPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-sm flex-col justify-center px-6 py-24">
      <h1 className="text-2xl font-semibold text-foreground">Admin</h1>
      <p className="mt-2 text-sm text-(--muted)">Sign in to manage content.</p>
      <LoginForm />
    </main>
  );
}
