"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LINKS } from "@/lib/brand";
import { cn } from "@/lib/cn";

const items = [
  { href: LINKS.howItWorks, label: "How it works" },
  { href: LINKS.report, label: "Sample report" },
  { href: LINKS.pricing, label: "Pricing" },
  { href: LINKS.faq, label: "FAQ" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "bg-paper/85 backdrop-blur-md border-b border-line" : "bg-transparent border-b border-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" aria-label="Home" className="shrink-0">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="text-[15px] text-ink-2 transition-colors hover:text-ink"
            >
              {it.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button href={LINKS.demo} variant="ghost" size="sm">
            Book a demo
          </Button>
          <Button href={LINKS.order} size="sm">
            Order cards
          </Button>
        </div>
        <button
          className="md:hidden grid h-10 w-10 place-items-center rounded-full hover:bg-paper-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>
      {open && (
        <div className="md:hidden border-t border-line bg-paper">
          <Container className="flex flex-col gap-1 py-4">
            {items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base text-ink-2 hover:bg-paper-2"
              >
                {it.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 px-3">
              <Button href={LINKS.demo} variant="secondary" className="flex-1" onClick={() => setOpen(false)}>
                Book a demo
              </Button>
              <Button href={LINKS.order} className="flex-1" onClick={() => setOpen(false)}>
                Order cards
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
