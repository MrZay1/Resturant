// Split out from lib/orders.ts on purpose: this file has zero server-only
// imports (no `postgres`), so client components can safely import it without
// pulling a database driver into the browser bundle.
export type OrderStatus = "new" | "design_sent" | "approved" | "printing" | "shipped" | "active";

export const ORDER_STATUSES: { value: OrderStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "design_sent", label: "Design sent" },
  { value: "approved", label: "Approved" },
  { value: "printing", label: "Printing" },
  { value: "shipped", label: "Shipped" },
  { value: "active", label: "Active" },
];
