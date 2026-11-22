import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Fades/slides children in once they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const PETALS = Array.from({ length: 14 }, (_, i) => ({
  left: (i * 37 + 7) % 100,
  duration: 16 + ((i * 7) % 11),
  delay: -((i * 2.9) % 20),
  scale: 0.6 + ((i * 13) % 7) / 10,
  drift: ((i % 2 ? 1 : -1) * (30 + ((i * 11) % 60))) as number,
  spin: 360 + ((i * 97) % 360),
}));

const SPARKLES = Array.from({ length: 12 }, (_, i) => ({
  left: (i * 53 + 11) % 96,
  top: (i * 29 + 17) % 92,
  duration: 3 + ((i * 3) % 4),
  delay: (i * 0.7) % 5,
  scale: 0.5 + ((i * 7) % 6) / 10,
}));

/** Gently falling jasmine petals and golden sparkles across the page. */
export function FloatingPetals() {
  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden="true">
      {PETALS.map((p, i) => (
        <span
          key={`p${i}`}
          className="petal"
          style={
            {
              left: `${p.left}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              scale: `${p.scale}`,
              "--drift": `${p.drift}px`,
              "--spin": `${p.spin}deg`,
            } as CSSProperties
          }
        />
      ))}
      {SPARKLES.map((s, i) => (
        <span
          key={`s${i}`}
          className="sparkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            scale: `${s.scale}`,
          }}
        />
      ))}
    </div>
  );
}
