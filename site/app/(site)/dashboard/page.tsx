import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { getCustomerSession } from "@/lib/customerAuth";
import { listOrdersForCustomer } from "@/lib/orders";
import { BRAND } from "@/lib/brand";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Owner dashboard",
  description: "Your card order status, your Google review link, and replacement card requests.",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  // Middleware already redirects a signed-out visitor to /login before this
  // renders; this check is the defensive fallback if it ever does not.
  const session = await getCustomerSession();
  if (!session) redirect("/login");

  const orders = await listOrdersForCustomer(session.customerId);
  const restaurantName = orders[0]?.restaurant_name;

  return (
    <>
      <Nav />
      <main className="flex-1 bg-paper pb-20">
        <Container className="pt-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Owner dashboard</Eyebrow>
              <h1 className="font-display mt-3 text-4xl leading-none sm:text-5xl">
                {restaurantName || "Welcome back"}
              </h1>
              <div className="mt-2 text-sm text-muted">Signed in as {session.email}</div>
            </div>
          </div>

          <div className="mt-8">
            {orders.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-line-strong bg-white p-10 text-center">
                <p className="text-[15px] text-ink-2">
                  We don&apos;t have an order linked to this account yet. If you just checked out,
                  this can take a minute to sync &mdash; refresh in a moment. Otherwise, email us
                  and we&apos;ll connect it by hand.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <Button href={`mailto:${BRAND.email}`} variant="secondary">
                    Email {BRAND.email}
                  </Button>
                </div>
              </div>
            ) : (
              <DashboardClient orders={orders} email={session.email} />
            )}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
