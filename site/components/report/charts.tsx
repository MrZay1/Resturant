"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Small, dependency-free SVG charts for the report. Colors validated for CVD:
 * series green #2a9d63, negative terracotta #d9622b, de-emphasis tint #cfe2d6.
 */
export const VIZ = {
  series: "#2a9d63",
  negative: "#d9622b",
  tint: "#cfe2d6",
  grid: "#e8e3d8",
  text: "#15130f",
  muted: "#6f6a62",
};

type Tip = { x: number; y: number; label: string; value: string } | null;

function Tooltip({ tip }: { tip: Tip }) {
  if (!tip) return null;
  return (
    <div
      className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg border border-line bg-white px-2.5 py-1.5 text-xs shadow-card"
      style={{ left: tip.x, top: tip.y - 8 }}
    >
      <div className="font-medium text-ink">{tip.label}</div>
      <div className="text-muted">{tip.value}</div>
    </div>
  );
}

/** Column chart: one series, current period emphasized. */
export function Columns({
  data,
  highlightIndex,
  suffix = "",
  className,
  ariaLabel,
}: {
  data: { label: string; value: number }[];
  highlightIndex?: number;
  suffix?: string;
  className?: string;
  ariaLabel: string;
}) {
  const format = (v: number) => `${v}${suffix}`;
  const [tip, setTip] = useState<Tip>(null);
  const W = 320;
  const H = 220;
  const padL = 36;
  const padB = 28;
  const padT = 18;
  const max = Math.max(...data.map((d) => d.value)) * 1.15;
  const slot = (W - padL) / data.length;
  const bw = Math.min(24, slot * 0.5);
  const y = (v: number) => padT + (H - padT - padB) * (1 - v / max);
  const ticks = [0, Math.round(max / 2 / 10) * 10, Math.round(max / 10) * 10].filter((t, i, a) => a.indexOf(t) === i);

  return (
    <div className={cn("relative", className)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={ariaLabel}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={padL} x2={W} y1={y(t)} y2={y(t)} stroke={VIZ.grid} strokeWidth={1} />
            <text x={padL - 8} y={y(t) + 4} textAnchor="end" fontSize={11} fill={VIZ.muted} style={{ fontVariantNumeric: "tabular-nums" }}>
              {t}
            </text>
          </g>
        ))}
        {data.map((d, i) => {
          const x = padL + slot * i + (slot - bw) / 2;
          const top = y(d.value);
          const hi = i === highlightIndex;
          return (
            <g key={d.label}>
              <rect
                x={padL + slot * i}
                y={padT}
                width={slot}
                height={H - padT - padB}
                fill="transparent"
                onMouseEnter={(e) => {
                  const r = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
                  setTip({ x: ((x + bw / 2) / W) * r.width, y: (top / H) * r.height, label: d.label, value: format(d.value) });
                }}
                onMouseLeave={() => setTip(null)}
              />
              <path
                d={`M${x},${H - padB} V${top + 4} a4,4 0 0 1 4,-4 h${bw - 8} a4,4 0 0 1 4,4 V${H - padB} Z`}
                fill={hi ? VIZ.series : VIZ.tint}
              />
              {hi && (
                <text x={x + bw / 2} y={top - 8} textAnchor="middle" fontSize={13} fontWeight={600} fill={VIZ.text}>
                  {format(d.value)}
                </text>
              )}
              <text x={x + bw / 2} y={H - 8} textAnchor="middle" fontSize={11} fill={hi ? VIZ.text : VIZ.muted}>
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
      <Tooltip tip={tip} />
    </div>
  );
}

/** Line chart: one series (e.g. average rating). */
export function Line({
  data,
  min,
  max,
  decimals = 1,
  className,
  ariaLabel,
}: {
  data: { label: string; value: number }[];
  min: number;
  max: number;
  decimals?: number;
  className?: string;
  ariaLabel: string;
}) {
  const format = (v: number) => v.toFixed(decimals);
  const [tip, setTip] = useState<Tip>(null);
  const W = 320;
  const H = 220;
  const padL = 36;
  const padB = 28;
  const padT = 18;
  const padR = 40;
  const slot = (W - padL - padR) / (data.length - 1);
  const x = (i: number) => padL + slot * i;
  const y = (v: number) => padT + (H - padT - padB) * (1 - (v - min) / (max - min));
  const path = data.map((d, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(d.value)}`).join(" ");
  const area = `${path} L${x(data.length - 1)},${H - padB} L${x(0)},${H - padB} Z`;
  const ticks = [min, (min + max) / 2, max];
  const last = data[data.length - 1];
  return (
    <div className={cn("relative", className)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={ariaLabel}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} stroke={VIZ.grid} strokeWidth={1} />
            <text x={padL - 8} y={y(t) + 4} textAnchor="end" fontSize={11} fill={VIZ.muted} style={{ fontVariantNumeric: "tabular-nums" }}>
              {t.toFixed(1)}
            </text>
          </g>
        ))}
        <path d={area} fill={VIZ.series} opacity={0.1} />
        <path d={path} fill="none" stroke={VIZ.series} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        {data.map((d, i) => (
          <g key={d.label}>
            <circle cx={x(i)} cy={y(d.value)} r={i === data.length - 1 ? 5 : 4} fill={VIZ.series} stroke="#fff" strokeWidth={2} />
            <circle
              cx={x(i)}
              cy={y(d.value)}
              r={14}
              fill="transparent"
              onMouseEnter={(e) => {
                const r = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
                setTip({ x: (x(i) / W) * r.width, y: (y(d.value) / H) * r.height, label: d.label, value: format(d.value) });
              }}
              onMouseLeave={() => setTip(null)}
            />
            <text x={x(i)} y={H - 8} textAnchor="middle" fontSize={11} fill={VIZ.muted}>
              {d.label}
            </text>
          </g>
        ))}
        <text x={x(data.length - 1) + 10} y={y(last.value) + 4} fontSize={13} fontWeight={600} fill={VIZ.text}>
          {format(last.value)}
        </text>
      </svg>
      <Tooltip tip={tip} />
    </div>
  );
}

/** Horizontal bars: one series with value labels at the tip. */
export function Bars({
  data,
  suffix = "",
  className,
  ariaLabel,
}: {
  data: { label: string; value: number; note?: string; color?: string }[];
  suffix?: string;
  className?: string;
  ariaLabel: string;
}) {
  const format = (v: number) => `${v}${suffix}`;
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className={cn("space-y-2.5", className)} role="img" aria-label={ariaLabel}>
      {data.map((d) => (
        <div key={d.label} className="grid grid-cols-[110px_1fr_auto] items-center gap-3 text-sm">
          <div className="truncate text-ink-2">{d.label}</div>
          <div className="h-3 rounded-r-[4px] bg-transparent">
            <div
              className="h-3 rounded-r-[4px]"
              style={{ width: `${(d.value / max) * 100}%`, background: d.color ?? VIZ.series }}
              title={`${d.label}: ${format(d.value)}`}
            />
          </div>
          <div className="w-16 text-right text-ink" style={{ fontVariantNumeric: "tabular-nums" }}>
            {format(d.value)}
            {d.note && <span className="ml-1 text-xs text-muted">{d.note}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Two-series stacked horizontal bars (positive / negative) with legend. */
export function StackedBars({
  data,
  className,
  ariaLabel,
}: {
  data: { label: string; positive: number; negative: number }[];
  className?: string;
  ariaLabel: string;
}) {
  const max = Math.max(...data.map((d) => d.positive + d.negative));
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-4 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: VIZ.series }} />Positive</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: VIZ.negative }} />Negative or mixed</span>
      </div>
      <div className="space-y-2.5" role="img" aria-label={ariaLabel}>
        {data.map((d) => {
          const total = d.positive + d.negative;
          return (
            <div key={d.label} className="grid grid-cols-[130px_1fr_auto] items-center gap-3 text-sm">
              <div className="truncate text-ink-2">{d.label}</div>
              <div className="flex h-3 gap-[2px]">
                <div className="h-3 rounded-l-[4px]" style={{ width: `${(d.positive / max) * 100}%`, background: VIZ.series }} title={`${d.label}: ${d.positive} positive`} />
                {d.negative > 0 && (
                  <div className="h-3 rounded-r-[4px]" style={{ width: `${(d.negative / max) * 100}%`, background: VIZ.negative }} title={`${d.label}: ${d.negative} negative`} />
                )}
              </div>
              <div className="w-20 text-right text-ink" style={{ fontVariantNumeric: "tabular-nums" }}>
                {total} <span className="text-xs text-muted">({Math.round((d.positive / total) * 100)}%)</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
