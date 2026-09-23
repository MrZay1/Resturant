import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrder, listNotes, type Order } from "@/lib/orders";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { OrderStatusSelect } from "@/components/admin/OrderStatusSelect";
import { NoteForm } from "@/components/admin/NoteForm";
import { ShipToSelect } from "@/components/admin/ShipToSelect";
import { SupplierRefForm } from "@/components/admin/SupplierRefForm";
import { MarkShippedButton } from "@/components/admin/MarkShippedButton";
import { TEMPLATE_META, type CardTemplate } from "@/components/card/cardSpec";
import { BRAND } from "@/lib/brand";

export const dynamic = "force-dynamic";

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</div>
      <div className="mt-0.5 text-ink">{value || <span className="text-muted">—</span>}</div>
    </div>
  );
}

function isTemplate(v: string): v is CardTemplate {
  return v in TEMPLATE_META;
}

function slugify(name: string) {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "restaurant"
  );
}

/**
 * Builds the same /print/card URL scripts/export-cards.mjs uses, filled in
 * from this order's real design and contact details - exact size, 3mm bleed,
 * a real QR code. Opens in a new tab; Print > Save as PDF from there is the
 * print-ready file for the supplier.
 */
function printCardUrl(order: Order, side: "front" | "back" | "both") {
  const params = new URLSearchParams({
    template: isTemplate(order.template) ? order.template : "classic",
    side,
    name: order.restaurant_name || "Your Restaurant",
    headline: order.headline || "Tap to review us on Google",
    subline: order.subline || "Hold your phone here",
    color: order.brand_color || "#1f4d3a",
    url: `${BRAND.shortLinkHost}/r/${slugify(order.restaurant_name)}`,
    stars: order.show_stars ? "1" : "0",
  });
  if (order.logo_url) params.set("logo", order.logo_url);
  return `/print/card?${params.toString()}`;
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
            <h2 className="mb-4 font-display text-lg text-ink">Print &amp; fulfillment</h2>
            <a
              href={printCardUrl(order, "both")}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-line-strong bg-paper px-3 py-2 text-center text-sm font-medium hover:border-ink"
            >
              Open print file (front &amp; back)
            </a>
            <p className="mt-2 text-xs text-muted">
              Opens a two-page file at exact print size with 3mm bleed and a real QR code &mdash;
              front on page one, back on page two. Print → Save as PDF from there for the file to
              drop into the supplier&apos;s upload form. The QR only works once
              &quot;{slugify(order.restaurant_name)}&quot; is registered to this order&apos;s review
              link in the redirect list.
            </p>

            <div className="mt-5 border-t border-line pt-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">Ship to</div>
              <div className="mt-2">
                <ShipToSelect orderId={order.id} current={order.ship_to} />
              </div>
            </div>

            <div className="mt-5 border-t border-line pt-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">Supplier order #</div>
              <div className="mt-2">
                <SupplierRefForm orderId={order.id} current={order.supplier_order_ref} />
              </div>
            </div>

            <div className="mt-5 border-t border-line pt-4">
              <MarkShippedButton orderId={order.id} shippedAt={order.shipped_at} />
            </div>
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
