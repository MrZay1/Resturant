"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, User, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LINKS } from "@/lib/brand";
import { cn } from "@/lib/cn";

/** Grouped under the "How it works" dropdown, keeping the top-level bar short. */
const dropdownItems = [
  { href: LINKS.howItWorks, label: "How it works" },
  { href: LINKS.report, label: "Sample report" },
  { href: LINKS.pricing, label: "Pricing" },
  { href: LINKS.faq, label: "FAQ" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" aria-label="Home" className="shrink-0">
          <Logo inverse />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          <div ref={menuRef} className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              className="flex items-center gap-1 rounded-full px-3 py-2 text-[15px] text-paper/75 transition-colors hover:text-paper"
            >
              How it works
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", menuOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full mt-2 w-56 overflow-hidden rounded-xl2 border border-white/10 bg-ink-2 p-1.5 shadow-lift"
                >
                  {dropdownItems.map((it) => (
                    <Link
                      key={it.href}
                      href={it.href}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-[14px] text-paper/80 transition-colors hover:bg-white/5 hover:text-paper"
                    >
                      {it.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
            {dropdownItems.map((it) => (
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
