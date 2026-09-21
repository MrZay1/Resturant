import type { ReactNode } from "react";
import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
import { BRAND } from "@/lib/brand";
import { LogoutButton } from "@/components/admin/LogoutButton";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getAdminSession();

  return (
    <div className="min-h-screen bg-paper-2">
      {session && (
        <header className="border-b border-line bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
            <Link href="/admin/orders" className="font-display text-lg text-ink">
              {BRAND.name} <span className="text-muted">/ admin</span>
            </Link>
            <div className="flex items-center gap-4 text-sm text-muted">
              <span>{session.email}</span>
              <LogoutButton />
            </div>
          </div>
        </header>
      )}
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
