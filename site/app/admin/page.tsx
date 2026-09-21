import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
import { getOrderCounts } from "@/lib/orders";
import { BRAND } from "@/lib/brand";

export const dynamic = "force-dynamic";

export default async function BackOfficeHome() {
  const session = await getAdminSession();
  const counts = await getOrderCounts();

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Welcome back{session ? `, ${session.email}` : ""}</h1>
      <p className="mt-1 text-muted">This is your {BRAND.name} back office.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/orders"
          className="rounded-xl2 border border-line bg-white p-6 shadow-card transition-transform hover:-translate-y-0.5 hover:shadow-lift"
        >
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">Orders</div>
          <div className="mt-2 font-display text-4xl text-ink">{counts.total}</div>
          <div className="mt-1 text-sm text-muted">
            {counts.needsAttention > 0
              ? `${counts.needsAttention} need${counts.needsAttention === 1 ? "s" : ""} attention`
              : "All caught up"}
          </div>
        </Link>

        <div className="rounded-xl2 border border-dashed border-line-strong bg-white/60 p-6 text-muted">
          <div className="text-xs font-semibold uppercase tracking-wide">Coming later</div>
          <div className="mt-2 text-sm">
            Restaurant pitch tools, AI reports, and print/fulfillment tracking will show up here as
            they&rsquo;re built.
          </div>
        </div>
      </div>
    </div>
  );
}
