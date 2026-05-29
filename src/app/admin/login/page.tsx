import { signIn, auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; error?: string }>;
}) {
  const session = await auth();
  const params = await searchParams;
  if (session?.user?.isAdmin) {
    redirect(params.from || "/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-paper)] bg-grain px-6">
      <div className="w-full max-w-md rounded-[var(--radius-card)] border border-[var(--color-rule)]/70 bg-[var(--color-cream)] p-8 shadow-[var(--shadow-warm)]">
        <div className="font-display text-2xl font-semibold text-[var(--color-ink)]">
          OC Times Admin
        </div>
        <p className="mt-2 font-body text-sm text-[var(--color-ink-soft)]">
          Sign in with your Google account. Only allowlisted band members can get in.
        </p>

        {params.error && (
          <div className="mt-5 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
            {params.error === "AccessDenied"
              ? "That email isn't on the admin list. Ask a current admin to add you."
              : `Sign-in error: ${params.error}`}
          </div>
        )}

        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: params.from || "/admin" });
          }}
          className="mt-6"
        >
          <button type="submit" className="btn-primary w-full justify-center">
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
}
