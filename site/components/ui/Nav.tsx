"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, User, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LINKS } from "@/lib/brand";

/** Laid out flat across the bar - no dropdown. */
const navItems = [
  { href: LINKS.howItWorks, label: "How it works" },
  { href: LINKS.report, label: "Sample report" },
  { href: LINKS.pricing, label: "Pricing" },
  { href: LINKS.faq, label: "FAQ" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" aria-label="Home" className="shrink-0">
          <Logo inverse />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navItems.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="rounded-full px-3 py-2 text-[15px] text-paper/75 transition-colors hover:text-paper"
            >
              {it.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-1.5 md:flex">
          <Link
            href={LINKS.login}
            aria-label="Restaurant login"
            title="Restaurant login"
            className="grid h-10 w-10 place-items-center rounded-full text-paper/75 transition-colors hover:bg-white/5 hover:text-paper"
          >
            <User className="h-[18px] w-[18px]" />
          </Link>
          <Button href={LINKS.demo} variant="ghost" size="sm" className="text-paper/85 hover:bg-white/5 hover:text-paper">
            Book a demo
          </Button>
          <Button href={LINKS.order} variant="inverse" size="sm">
            Order cards
          </Button>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-full text-paper hover:bg-white/5 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-white/10 bg-ink md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navItems.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base text-paper/80 hover:bg-white/5 hover:text-paper"
              >
                {it.label}
              </Link>
            ))}
            <Link
              href={LINKS.login}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-3 text-base text-paper/80 hover:bg-white/5 hover:text-paper"
            >
              <User className="h-4 w-4" /> Restaurant login
            </Link>
            <div className="mt-2 flex gap-2 px-3">
              <Button href={LINKS.demo} variant="secondary" className="flex-1" onClick={() => setOpen(false)}>
                Book a demo
              </Button>
              <Button href={LINKS.order} variant="inverse" className="flex-1" onClick={() => setOpen(false)}>
                Order cards
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
