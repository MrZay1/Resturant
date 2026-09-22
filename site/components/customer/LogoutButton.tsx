"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await fetch("/api/customer/logout", { method: "POST" });
        router.push("/login");
        router.refresh();
      }}
      className="text-muted underline-offset-2 hover:text-ink hover:underline"
    >
      Sign out
    </button>
  );
}
