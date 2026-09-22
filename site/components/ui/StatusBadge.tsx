import { ORDER_STATUSES, type OrderStatus } from "@/lib/orderStatus";

const COLORS: Record<OrderStatus, string> = {
  new: "bg-blue-100 text-blue-800",
  design_sent: "bg-amber-100 text-amber-800",
  approved: "bg-purple-100 text-purple-800",
  printing: "bg-orange-100 text-orange-800",
  shipped: "bg-teal-100 text-teal-800",
  active: "bg-green-100 text-green-800",
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  const label = ORDER_STATUSES.find((s) => s.value === status)?.label ?? status;
  return (
    <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${COLORS[status]}`}>
      {label}
    </span>
  );
}
