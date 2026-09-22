import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrder, listNotes } from "@/lib/orders";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { OrderStatusSelect } from "@/components/admin/OrderStatusSelect";
import { NoteForm } from "@/components/admin/NoteForm";

export const dynamic = "force-dynamic";

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</div>
      <div className="mt-0.5 text-ink">{value || <span className="text-muted">—</span>}</div>
    </div>
  );
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const orderId = Number(id);
  if (!Number.isFinite(orderId)) notFound();

  const order = await getOrder(orderId);
  if (!order) notFound();
  const notes = await listNotes(orderId);

  const shipping = [order.shipping_line1, order.shipping_line2, [order.shipping_city, order.shipping_state, order.shipping_postal_code].filter(Boolean).join(", "), order.shipping_country]
    .filter(Boolean)
    .join(", ");

  return (
    <div>
      <Link href="/admin/orders" className="text-sm text-muted hover:underline">
        ← All orders
      </Link>

      <div className="mt-3 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-ink">{order.restaurant_name || "(no name)"}</h1>
          <div className="mt-1"><StatusBadge status={order.status} /></div>
        </div>
        <OrderStatusSelect orderId={order.id} current={order.status} />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <section className="rounded-xl2 border border-line bg-white p-6">
            <h2 className="mb-4 font-display text-lg text-ink">Order</h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Cards" value={order.cards} />
              <Field label="Monthly report" value={order.has_report ? "Yes" : "No"} />
              <Field label="Paid" value={`$${Number(order.amount_total).toFixed(2)}`} />
              <Field label="Placed" value={new Date(order.created_at).toLocaleString()} />
              <Field label="Template" value={order.template} />
              <Field label="Brand colour" value={order.brand_color} />
              <Field label="Headline" value={order.headline} />
              <Field label="Small line" value={order.subline} />
            </div>
          </section>

          <section className="rounded-xl2 border border-line bg-white p-6">
            <h2 className="mb-4 font-display text-lg text-ink">Where the card points</h2>
            <Field
              label="Google review link"
              value={
                order.google_review_link ? (
                  <a href={order.google_review_link} target="_blank" className="text-accent underline">
                    {order.google_review_link}
                  </a>
                ) : (
                  `Not given — restaurant address: ${order.restaurant_address || "not given"}`
                )
              }
            />
          </section>

          <section className="rounded-xl2 border border-line bg-white p-6">
            <h2 className="mb-4 font-display text-lg text-ink">Logo</h2>
            {order.logo_url ? (
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={order.logo_url} alt="Uploaded logo" className="h-16 w-16 rounded-lg border border-line object-contain bg-paper-2" />
                <a href={order.logo_url} download={order.logo_filename ?? undefined} className="text-sm font-medium text-accent underline">
                  Download {order.logo_filename ?? "logo"}
                </a>
              </div>
            ) : (
              <p className="text-muted">No logo uploaded — type-only card.</p>
            )}
          </section>

          <section className="rounded-xl2 border border-line bg-white p-6">
            <h2 className="mb-4 font-display text-lg text-ink">Customer notes</h2>
            <p className="text-ink">{order.notes || <span className="text-muted">None</span>}</p>
          </section>

          <section className="rounded-xl2 border border-line bg-white p-6">
            <h2 className="mb-4 font-display text-lg text-ink">Your notes</h2>
            <NoteForm orderId={order.id} />
            <ul className="mt-4 space-y-3">
              {notes.map((n) => (
                <li key={n.id} className="rounded-lg bg-paper-2 p-3 text-sm">
                  <div className="text-ink">{n.body}</div>
                  <div className="mt-1 text-xs text-muted">{new Date(n.created_at).toLocaleString()}</div>
                </li>
              ))}
              {notes.length === 0 && <li className="text-sm text-muted">No notes yet.</li>}
            </ul>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-xl2 border border-line bg-white p-6">
            <h2 className="mb-4 font-display text-lg text-ink">Contact</h2>
            <Field label="Name" value={order.contact_name} />
            <div className="mt-3"><Field label="Email" value={order.contact_email} /></div>
            <div className="mt-3"><Field label="Phone" value={order.contact_phone} /></div>
          </section>

          <section className="rounded-xl2 border border-line bg-white p-6">
            <h2 className="mb-4 font-display text-lg text-ink">Shipping</h2>
            <Field label="Address" value={shipping} />
          </section>

          <section className="rounded-xl2 border border-line bg-white p-6">
            <h2 className="mb-4 font-display text-lg text-ink">Stripe</h2>
            <Field label="Session" value={order.stripe_session_id} />
            <div className="mt-3"><Field label="Subscription" value={order.stripe_subscription_id} /></div>
            <div className="mt-3"><Field label="Customer" value={order.stripe_customer_id} /></div>
          </section>
        </div>
      </div>
    </div>
  );
}
