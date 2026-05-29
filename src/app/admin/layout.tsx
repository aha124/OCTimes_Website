import { auth, signOut } from "@/lib/auth";
import Link from "next/link";
import {
  CalendarDays,
  Users,
  Music2,
  Video,
  Settings as SettingsIcon,
  ShieldCheck,
  LogOut,
  Home,
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/tour", label: "Tour Dates", icon: CalendarDays },
  { href: "/admin/members", label: "The Guys", icon: Users },
  { href: "/admin/videos", label: "Videos", icon: Video },
  { href: "/admin/music", label: "Music", icon: Music2 },
  { href: "/admin/settings", label: "Settings", icon: SettingsIcon },
  { href: "/admin/users", label: "Users", icon: ShieldCheck },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // No session = login page (middleware bounces all other /admin routes here).
  // Render the login page bare, no sidebar chrome.
  if (!session?.user?.isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[var(--color-paper)]">
      <aside className="hidden w-64 shrink-0 border-r border-[var(--color-rule)]/70 bg-[var(--color-cream)] md:flex md:flex-col">
        <div className="border-b border-[var(--color-rule)]/70 px-6 py-5">
          <div className="font-display text-xl font-semibold text-[var(--color-ink)]">
            OC Times
          </div>
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-ink-muted)]">
            Admin
          </div>
        </div>
        <nav className="flex-1 px-3 py-4">
          {NAV.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-ink-soft)] transition hover:bg-[var(--color-sand)] hover:text-[var(--color-ink)]"
              >
                <Icon size={16} className="opacity-70" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-[var(--color-rule)]/70 px-3 py-4">
          {session?.user?.email && (
            <div className="px-3 pb-3 text-xs text-[var(--color-ink-muted)]">
              {session.user.email}
            </div>
          )}
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-ink-soft)] transition hover:bg-[var(--color-sand)] hover:text-[var(--color-ink)]"
            >
              <LogOut size={16} className="opacity-70" />
              Sign out
            </button>
          </form>
          <Link
            href="/"
            className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-ink-soft)] transition hover:bg-[var(--color-sand)] hover:text-[var(--color-ink)]"
          >
            <Home size={16} className="opacity-70" />
            View site
          </Link>
        </div>
      </aside>

      <div className="flex-1">
        <main className="mx-auto max-w-5xl px-6 py-10 sm:px-10">{children}</main>
      </div>
    </div>
  );
}
