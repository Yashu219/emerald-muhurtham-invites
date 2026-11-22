import { useId } from "react";
import { cn } from "@/lib/utils";

/** Shared gold gradient defs for SVG ornaments. */
function GoldDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="var(--gold-deep)" />
        <stop offset="35%" stopColor="var(--gold)" />
        <stop offset="55%" stopColor="var(--gold-light)" />
        <stop offset="80%" stopColor="var(--gold)" />
        <stop offset="100%" stopColor="var(--gold-deep)" />
      </linearGradient>
      <radialGradient id={`${id}-halo`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="var(--flame)" stopOpacity="0.45" />
        <stop offset="45%" stopColor="var(--flame)" stopOpacity="0.12" />
        <stop offset="100%" stopColor="var(--flame)" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${id}-flame`} cx="50%" cy="70%" r="60%">
        <stop offset="0%" stopColor="var(--flame-core)" />
        <stop offset="55%" stopColor="var(--flame)" />
        <stop offset="100%" stopColor="var(--maroon)" stopOpacity="0.6" />
      </radialGradient>
    </defs>
  );
}

function flamePath(cx: number, base: number, h = 18) {
  return `M${cx} ${base} C${cx - 5} ${base - h * 0.35}, ${cx - 3.5} ${base - h * 0.7}, ${cx} ${base - h} C${cx + 3.5} ${base - h * 0.7}, ${cx + 5} ${base - h * 0.35}, ${cx} ${base} Z`;
}

/** Brass kuthu vilakku (traditional oil lamp) with flickering wicks. */
export function KuthuVilakku({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const gold = `url(#${id}-gold)`;
  const flame = `url(#${id}-flame)`;
  const wicks = [16, 31, 69, 84];
  return (
    <svg viewBox="0 0 100 230" className={className} aria-hidden="true">
      <GoldDefs id={id} />
      {/* glow */}
      <g className="animate-glow" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <circle cx="50" cy="40" r="48" fill={`url(#${id}-halo)`} />
      </g>
      {/* finial – swan (annam) bud */}
      <path d="M50 4 C45 12 44 20 50 27 C56 20 55 12 50 4Z" fill={gold} />
      <circle cx="50" cy="30" r="3.4" fill={gold} />
      <rect x="47.5" y="32" width="5" height="16" rx="2" fill={gold} />
      {/* flames */}
      {wicks.map((x, i) => (
        <path
          key={x}
          d={flamePath(x, 50 - Math.abs(50 - x) * 0.06, 17)}
          fill={flame}
          className="animate-flicker"
          style={{ animationDelay: `${i * 0.27}s` }}
        />
      ))}
      {/* bowl with five spouts */}
      <ellipse cx="50" cy="51" rx="38" ry="5" fill={gold} />
      <path d="M12 51 Q50 80 88 51 Q50 64 12 51Z" fill={gold} opacity="0.9" />
      <path d="M20 58 Q50 76 80 58" stroke="var(--gold-deep)" strokeWidth="0.8" fill="none" />
      {/* stem with knobs */}
      <rect x="46" y="66" width="8" height="120" rx="3" fill={gold} />
      {[78, 104, 132, 160].map((y, i) => (
        <g key={y}>
          <ellipse cx="50" cy={y} rx={i % 2 ? 9 : 7} ry="4.5" fill={gold} />
          <ellipse cx="50" cy={y - 1.5} rx={i % 2 ? 6 : 4.5} ry="1.4" fill="var(--gold-light)" opacity="0.7" />
        </g>
      ))}
      {/* base */}
      <path d="M38 186 L62 186 L74 204 L26 204 Z" fill={gold} />
      <ellipse cx="50" cy="206" rx="34" ry="6" fill={gold} />
      <ellipse cx="50" cy="214" rx="42" ry="7" fill={gold} />
      <ellipse cx="50" cy="212" rx="36" ry="2" fill="var(--gold-light)" opacity="0.5" />
    </svg>
  );
}

/** Dravidian gopuram (temple tower) silhouette. */
export function Gopuram({ className }: { className?: string }) {
  const tiers = [
    [30, 170, 40, 160, 200, 168],
    [44, 156, 54, 146, 168, 138],
    [57, 143, 66, 134, 138, 110],
    [69, 131, 77, 123, 110, 85],
    [80, 120, 87, 113, 85, 64],
  ];
  return (
    <svg viewBox="0 0 200 250" className={className} aria-hidden="true" fill="none" stroke="currentColor">
      <rect x="22" y="200" width="156" height="46" strokeWidth="1.2" />
      <path d="M86 246 V222 Q100 206 114 222 V246" strokeWidth="1.2" />
      {tiers.map(([bl, br, tl, tr, by, ty], i) => (
        <g key={i} strokeWidth="1">
          <path d={`M${bl} ${by} L${tl} ${ty} L${tr} ${ty} L${br} ${by} Z`} />
          <line x1={(bl! + tl!) / 2} y1={(by! + ty!) / 2} x2={(br! + tr!) / 2} y2={(by! + ty!) / 2} opacity="0.6" />
          {[0.25, 0.5, 0.75].map((t) => (
            <rect
              key={t}
              x={tl! + (tr! - tl!) * t - 3}
              y={ty! + (by! - ty!) * 0.15}
              width="6"
              height={(by! - ty!) * 0.3}
              rx="3"
              opacity="0.7"
            />
          ))}
        </g>
      ))}
      <path d="M84 64 Q84 46 100 44 Q116 46 116 64 Z" strokeWidth="1.2" />
      {[90, 100, 110].map((x) => (
        <g key={x} strokeWidth="1">
          <path d={`M${x - 3} 46 Q${x} 36 ${x + 3} 46`} />
          <line x1={x} y1="38" x2={x} y2="30" />
          <circle cx={x} cy="29" r="1.6" fill="currentColor" />
        </g>
      ))}
    </svg>
  );
}

/** Kolam-inspired divider with dots and lotus knot. */
export function KolamDivider({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <div className={cn("flex items-center justify-center gap-3 text-gold", className)} aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/70 sm:w-28" />
      <svg viewBox="0 0 120 40" className="h-8 w-24">
        <GoldDefs id={id} />
        <g fill="none" stroke={`url(#${id}-gold)`} strokeWidth="1.2">
          <path d="M60 4 L76 20 L60 36 L44 20 Z" />
          <path d="M60 10 Q70 20 60 30 Q50 20 60 10Z" />
          <circle cx="60" cy="20" r="3" />
          <path d="M44 20 Q32 8 22 20 Q32 32 44 20" />
          <path d="M76 20 Q88 8 98 20 Q88 32 76 20" />
        </g>
        {[8, 14, 106, 112, 33, 87].map((x) => (
          <circle key={x} cx={x} cy="20" r="1.5" fill="var(--gold)" />
        ))}
        <circle cx="60" cy="2" r="1.3" fill="var(--gold)" />
        <circle cx="60" cy="38" r="1.3" fill="var(--gold)" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/70 sm:w-28" />
    </div>
  );
}

/** Brass temple bell that gently swings. */
export function TempleBell({ className, delay = 0 }: { className?: string; delay?: number }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 40 90"
      className={cn("animate-bell", className)}
      style={{ animationDelay: `${delay}s` }}
      aria-hidden="true"
    >
      <GoldDefs id={id} />
      <line x1="20" y1="0" x2="20" y2="30" stroke="var(--gold)" strokeWidth="1.2" />
      {[8, 16, 24].map((y) => (
        <circle key={y} cx="20" cy={y} r="1.8" fill="var(--gold)" />
      ))}
      <circle cx="20" cy="33" r="4" fill={`url(#${id}-gold)`} />
      <path d="M20 36 C9 38 9 52 7 66 L33 66 C31 52 31 38 20 36Z" fill={`url(#${id}-gold)`} />
      <rect x="5" y="65" width="30" height="4" rx="2" fill="var(--gold-deep)" />
      <circle cx="20" cy="74" r="4" fill={`url(#${id}-gold)`} />
      <path d="M14 46 Q20 43 26 46" stroke="var(--gold-deep)" strokeWidth="0.8" fill="none" />
    </svg>
  );
}

/** Mango-leaf thoranam with marigolds, spanning its container width. */
export function MangoTorana({ className, leaves = 15 }: { className?: string; leaves?: number }) {
  const width = 600;
  const step = width / leaves;
  return (
    <svg viewBox={`0 0 ${width} 70`} preserveAspectRatio="none" className={className} aria-hidden="true">
      <path d={`M0 6 Q${width / 2} 22 ${width} 6`} stroke="var(--gold)" strokeWidth="1.6" fill="none" />
      {Array.from({ length: leaves }, (_, i) => {
        const x = step * i + step / 2;
        const sag = 6 + 16 * (1 - Math.pow((x - width / 2) / (width / 2), 2)) * 0.5;
        const len = 42 + ((i * 7) % 3) * 5;
        return (
          <g key={i} transform={`translate(${x} ${sag})`}>
            <path
              d={`M0 0 C-9 ${len * 0.3}, -7 ${len * 0.75}, 0 ${len} C7 ${len * 0.75}, 9 ${len * 0.3}, 0 0Z`}
              className={i % 2 ? "fill-leaf" : "fill-leaf-dark"}
            />
            <line x1="0" y1="2" x2="0" y2={len - 3} stroke="var(--gold-light)" strokeOpacity="0.35" strokeWidth="0.6" />
            {i % 3 === 1 && <circle cx={step / 2} cy="4" r="5.5" className="fill-marigold" />}
            {i % 3 === 1 && <circle cx={step / 2} cy="4" r="2" fill="var(--maroon)" opacity="0.6" />}
          </g>
        );
      })}
    </svg>
  );
}

/** Hanging strand of jasmine buds ending in a marigold. */
export function JasmineStrand({ length = 12, className }: { length?: number; className?: string }) {
  const h = length * 11 + 20;
  return (
    <svg viewBox={`0 0 20 ${h}`} className={className} style={{ height: h }} aria-hidden="true">
      <line x1="10" y1="0" x2="10" y2={h - 16} stroke="var(--leaf)" strokeWidth="0.8" />
      {Array.from({ length }, (_, i) => (
        <ellipse
          key={i}
          cx={10 + (i % 2 ? 2.2 : -2.2)}
          cy={6 + i * 11}
          rx="3.6"
          ry="5"
          fill="var(--jasmine)"
          stroke="var(--cream)"
          strokeWidth="0.5"
        />
      ))}
      <circle cx="10" cy={h - 9} r="7" className="fill-marigold" />
      <circle cx="10" cy={h - 9} r="2.5" fill="var(--maroon)" opacity="0.5" />
    </svg>
  );
}

/** Circular gold monogram with the couple's initials. */
export function Monogram({ left, right, className }: { left: string; right: string; className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <div className={cn("relative aspect-square", className)}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <GoldDefs id={id} />
        <circle cx="100" cy="100" r="92" fill="none" stroke={`url(#${id}-gold)`} strokeWidth="2" />
        <circle cx="100" cy="100" r="84" fill="none" stroke={`url(#${id}-gold)`} strokeWidth="0.8" />
        {Array.from({ length: 36 }, (_, i) => {
          const a = (i / 36) * Math.PI * 2;
          return (
            <circle
              key={i}
              cx={Math.round((100 + Math.cos(a) * 88) * 100) / 100}
              cy={Math.round((100 + Math.sin(a) * 88) * 100) / 100}
              r={i % 3 === 0 ? 2.2 : 1.1}
              fill="var(--gold)"
            />
          );
        })}
        {Array.from({ length: 8 }, (_, i) => (
          <path
            key={i}
            d="M100 8 Q106 16 100 24 Q94 16 100 8Z"
            fill={`url(#${id}-gold)`}
            transform={`rotate(${i * 45} 100 100)`}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center gap-1 font-display text-gold-gradient">
        <span className="text-[2.6em] leading-none">{left}</span>
        <span className="font-script text-[1.6em] leading-none">&amp;</span>
        <span className="text-[2.6em] leading-none">{right}</span>
      </div>
    </div>
  );
}

/** Small four-petal flourish used beside labels. */
export function Flourish({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-3 w-3 text-gold", className)} aria-hidden="true">
      <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10Z" fill="currentColor" />
    </svg>
  );
}
