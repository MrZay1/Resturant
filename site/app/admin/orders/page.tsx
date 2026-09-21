import Link from "next/link";
import { listOrders, type OrderStatus } from "@/lib/orders";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { ORDER_STATUSES } from "@/lib/orders";

export const dynamic = "force-dynamic";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q, status } = await searchParams;
  const orders = await listOrders({
    search: q?.trim() || undefined,
    status: (status as OrderStatus) || undefined,
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl text-ink">Orders</h1>
        <span className="text-sm text-muted">{orders.length} total</span>
      </div>

      <form className="mb-6 flex flex-wrap gap-3" method="get">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search by restaurant name…"
          className="w-64 rounded-lg border border-line-strong bg-white px-3 py-2 text-sm outline-none focus:border-accent"
        />
        <select
          name="status"
          defaultValue={status}
          className="rounded-lg border border-line-strong bg-white px-3 py-2 text-sm outline-none focus:border-accent"
        >
          <option value="">All statuses</option>
          {ORDER_STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <button className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-accent-2">
          Filter
        </button>
        {(q || status) && (
          <Link href="/admin/orders" className="self-center text-sm text-muted underline">
            Clear
          </Link>
        )}
      </form>

      {orders.length === 0 ? (
        <div className="rounded-xl2 border border-dashed border-line-strong bg-white p-10 text-center text-muted">
          No orders yet. They will show up here automatically as Stripe checkouts complete.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl2 border border-line bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-paper-2 text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">Restaurant</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Cards</th>
                <th className="px-4 py-3">Report</th>
                <th className="px-4 py-3">Paid</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Placed</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-line last:border-0 hover:bg-paper-2">
                  <td className="px-4 py-3">
                    <Link href={`/admin/orders/${o.id}`} className="font-medium text-ink hover:underline">
                      {o.restaurant_name || "(no name)"}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted">{o.contact_name || o.contact_email}</td>
                  <td className="px-4 py-3">{o.cards}</td>
                  <td className="px-4 py-3">{o.has_report ? "Yes" : "No"}</td>
                  <td className="px-4 py-3">${Number(o.amount_total).toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={o.status} />
                  </td>
                  <td className="px-4 py-3 text-muted">{new Date(o.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
