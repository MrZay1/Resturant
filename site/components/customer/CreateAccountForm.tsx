"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

const inputCls =
  "w-full rounded-lg border border-line-strong bg-white px-3 py-2.5 text-ink outline-none focus:border-accent";

export function CreateAccountForm({ sessionId, defaultEmail }: { sessionId: string; defaultEmail: string }) {
  const router = useRouter();
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/customer/signup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ sessionId, email, password }),
    });
    setLoading(false);
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      setError(body?.error ?? "Something went wrong. Try again.");
      return;
    }
    setDone(true);
    router.refresh();
    router.push("/dashboard");
  }

  if (done) {
    return <p className="mt-6 text-sm text-accent">Account created. Taking you to your dashboard…</p>;
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputCls}
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">
          Choose a password
        </label>
        <input
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
          className={inputCls}
        />
      </div>
      {error && <p className="text-sm text-[#9a3a12]">{error}</p>}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Creating your account…" : "Create my dashboard login"}
      </Button>
    </form>
  );
}
