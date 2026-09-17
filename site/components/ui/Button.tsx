import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "gold" | "inverse";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-200 select-none whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-paper hover:bg-accent-2 hover:-translate-y-px active:translate-y-0 shadow-[0_1px_0_rgb(0_0_0/0.2)]",
  secondary:
    "bg-white text-ink border border-line-strong hover:border-ink hover:-translate-y-px active:translate-y-0",
  ghost: "text-ink hover:bg-paper-2",
  gold: "bg-gold text-ink hover:bg-gold-2 hover:-translate-y-px active:translate-y-0",
  inverse:
    "bg-paper text-ink hover:bg-white hover:-translate-y-px active:translate-y-0",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-13 px-7 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type LinkProps = CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;
type ButtonProps = CommonProps & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

export function Button(props: LinkProps | ButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);
  if ("href" in props && props.href) {
    const rest = omit(props as LinkProps, ["href", "variant", "size", "className", "children"]);
    return (
      <Link href={props.href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  const rest = omit(props as ButtonProps, ["variant", "size", "className", "children"]);
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

function omit<T extends object>(obj: T, keys: string[]) {
  const out: Record<string, unknown> = {};
  for (const k of Object.keys(obj)) if (!keys.includes(k)) out[k] = (obj as Record<string, unknown>)[k];
  return out;
}
