import { useEffect, useState } from "react";
import { wedding } from "@/config/wedding";
import { formatLongDate, getTimeLeft, type TimeLeft } from "@/lib/wedding-dates";
import { Reveal } from "./Effects";
import { SectionHeading } from "./Shared";

const target = new Date(wedding.muhurtham.start).getTime();

export function Countdown() {
  const [left, setLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const tick = () => setLeft(getTimeLeft(target, Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const units: [string, number | undefined][] = [
    ["Days", left?.days],
    ["Hours", left?.hours],
    ["Minutes", left?.minutes],
    ["Seconds", left?.seconds],
  ];

  return (
    <section className="relative bg-maroon-gradient py-20 sm:py-24">
      <div className="absolute inset-0 bg-kolam opacity-50" />
      <div className="relative mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow="Counting the auspicious moments" title="Until We Say “Yes”">
          {formatLongDate(wedding.muhurtham.start, wedding.timeZoneOffsetMinutes)}
        </SectionHeading>
        <Reveal className="mt-12">
          {left?.done ? (
            <p className="text-center font-script text-5xl text-gold-gradient sm:text-6xl">
              The auspicious day has arrived!
            </p>
          ) : (
            <div className="grid grid-cols-4 gap-2 sm:gap-6" role="timer" aria-live="off">
              {units.map(([label, value]) => (
                <div
                  key={label}
                  className="frame-gold rounded-2xl bg-emerald-deep/80 px-1 py-5 text-center sm:py-8"
                >
                  <div className="font-display text-3xl tabular-nums text-gold-gradient sm:text-6xl">
                    {value === undefined ? "--" : String(value).padStart(2, "0")}
                  </div>
                  <div className="mt-2 font-display text-[0.6rem] uppercase tracking-[0.25em] text-cream sm:text-xs">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
